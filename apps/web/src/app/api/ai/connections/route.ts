import { NextRequest, NextResponse } from 'next/server'
import {
  AI_VAULT_COOKIE,
  getStoredAiKeys,
  saveStoredAiKeys,
  validateProviderApiKey,
  StoredAiKey,
} from '../../../../lib/ai-vault'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const keys = await getStoredAiKeys()
  const connections = keys.map((k) => ({
    provider: k.provider,
    status: k.status,
    keyHint: k.keyHint,
    validatedAt: k.validatedAt,
    lastUsedAt: k.lastUsedAt,
  }))
  return NextResponse.json(connections)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { provider, apiKey } = body as { provider: string; apiKey: string }

    if (!provider || !apiKey) {
      return NextResponse.json(
        { message: 'Thiếu provider hoặc apiKey.' },
        { status: 400 },
      )
    }

    // Validate key với provider
    const valResult = await validateProviderApiKey(provider, apiKey)
    if (!valResult.valid) {
      return NextResponse.json(
        { message: valResult.message || `API key không hợp lệ cho ${provider}.` },
        { status: 400 },
      )
    }

    const cleanKey = apiKey.trim()
    const keyHint = `••••${cleanKey.slice(-4)}`
    const now = new Date().toISOString()

    const existing = await getStoredAiKeys()
    const updated: StoredAiKey[] = existing.filter((k) => k.provider !== provider)
    const newEntry: StoredAiKey = {
      provider,
      apiKey: cleanKey,
      status: 'active',
      keyHint,
      validatedAt: now,
      lastUsedAt: null,
    }
    updated.push(newEntry)

    const cookieVal = await saveStoredAiKeys(updated)

    const res = NextResponse.json({
      provider,
      status: 'active',
      keyHint,
      validatedAt: now,
      lastUsedAt: null,
    })

    // Set cookie lưu 365 ngày
    res.cookies.set(AI_VAULT_COOKIE, cookieVal, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
    })

    return res
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message || 'Có lỗi xảy ra khi lưu kết nối AI.' },
      { status: 500 },
    )
  }
}
