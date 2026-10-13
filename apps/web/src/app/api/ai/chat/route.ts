import { NextRequest, NextResponse } from 'next/server'
import {
  AI_VAULT_COOKIE,
  getStoredAiKeys,
  saveStoredAiKeys,
  callAiProviderChat,
} from '../../../../lib/ai-vault'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { provider, messages, model, maxTokens } = body as {
      provider: string
      messages: Array<{ role: string; content: string }>
      model?: string
      maxTokens?: number
    }

    if (!provider || !messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { message: 'Thiếu provider hoặc messages hợp lệ.' },
        { status: 400 },
      )
    }

    const keys = await getStoredAiKeys()
    const targetKey = keys.find((k) => k.provider === provider && k.status === 'active')

    // Nếu không có key của provider này, thử tìm bất kỳ key nào đang active để fallback
    const fallbackKey = keys.find((k) => k.status === 'active')

    if (!targetKey && !fallbackKey) {
      return NextResponse.json(
        {
          message: `Chưa kết nối API key cho ${provider}. Hãy vào Cài đặt → AI Pro để kết nối key trước khi trò chuyện.`,
        },
        { status: 400 },
      )
    }

    const keyToUse = targetKey || fallbackKey!
    const isFallback = !targetKey && !!fallbackKey

    try {
      const chatRes = await callAiProviderChat(
        keyToUse.provider,
        keyToUse.apiKey,
        messages,
        model,
        maxTokens,
      )

      // Cập nhật lastUsedAt
      keyToUse.lastUsedAt = new Date().toISOString()
      const cookieVal = await saveStoredAiKeys(keys)

      const response = NextResponse.json({
        content: chatRes.content,
        model: chatRes.model,
        provider: chatRes.provider,
        usage: null,
        ...(isFallback
          ? {
              fallback: {
                from: provider,
                to: keyToUse.provider,
                reason: `Chưa có key ${provider}, đã dùng key ${keyToUse.provider} sẵn có`,
              },
            }
          : {}),
      })

      response.cookies.set(AI_VAULT_COOKIE, cookieVal, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 365 * 24 * 60 * 60,
      })

      return response
    } catch (apiErr: any) {
      // Nếu provider chính bị lỗi nhưng có provider khác active -> thử fallback
      if (targetKey && fallbackKey && fallbackKey.provider !== targetKey.provider) {
        try {
          const fallbackRes = await callAiProviderChat(
            fallbackKey.provider,
            fallbackKey.apiKey,
            messages,
            undefined,
            maxTokens,
          )
          return NextResponse.json({
            content: fallbackRes.content,
            model: fallbackRes.model,
            provider: fallbackRes.provider,
            usage: null,
            fallback: {
              from: provider,
              to: fallbackKey.provider,
              reason: apiErr?.message || 'Lỗi mạng khi gọi provider chính',
            },
          })
        } catch {
          // Thử fallback không được thì ném lỗi gốc
        }
      }

      return NextResponse.json(
        { message: apiErr?.message || `Lỗi khi gọi API AI ${provider}.` },
        { status: 500 },
      )
    }
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message || 'Có lỗi xảy ra trong quá trình xử lý chat AI.' },
      { status: 500 },
    )
  }
}
