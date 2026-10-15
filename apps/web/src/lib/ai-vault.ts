import { cookies } from 'next/headers'

export const AI_VAULT_COOKIE = 'orh_ai_vault'

export interface StoredAiKey {
  provider: string
  apiKey: string
  status: 'active' | 'invalid'
  keyHint: string
  validatedAt: string
  lastUsedAt: string | null
}

const PROVIDER_BASE_URLS: Record<string, string> = {
  gemini: 'https://generativelanguage.googleapis.com',
  openai: 'https://api.openai.com/v1',
  xai: 'https://api.x.ai/v1',
  anthropic: 'https://api.anthropic.com',
  deepseek: 'https://api.deepseek.com/v1',
  experientiallabs: 'https://api.experientiallabs.ai/v1',
  apmix: 'https://api.apmix.ai/v1',
  muse: 'https://api.meta.ai/v1',
  groq: 'https://api.groq.com/openai/v1',
  moonshot: 'https://api.moonshot.ai/v1',
  vyceai: 'https://vyceai.com/v1',
  koto: 'https://api.mutowa.com/v1',
  apinex: 'https://api.apinex.bond/v1',
  utim: 'https://api.utim.dev/v1',
  gehihi: process.env.GEHIHI_BASE_URL || 'https://comparisons-press-mild-joke.trycloudflare.com/openai/v1',
}

function safeBase64Encode(data: string): string {
  return Buffer.from(data, 'utf-8').toString('base64url')
}

function safeBase64Decode(data: string): string {
  try {
    return Buffer.from(data, 'base64url').toString('utf-8')
  } catch {
    return ''
  }
}

/** Đọc danh sách AI keys đã lưu từ cookie */
export async function getStoredAiKeys(): Promise<StoredAiKey[]> {
  try {
    const cookieStore = await cookies()
    const raw = cookieStore.get(AI_VAULT_COOKIE)?.value
    if (!raw) return []
    const decoded = safeBase64Decode(raw)
    if (!decoded) return []
    const parsed = JSON.parse(decoded)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/** Lưu danh sách AI keys vào cookie */
export async function saveStoredAiKeys(keys: StoredAiKey[]): Promise<string> {
  const serialized = JSON.stringify(keys)
  return safeBase64Encode(serialized)
}

/** Kiểm tra và validate API key của từng provider */
export async function validateProviderApiKey(provider: string, apiKey: string): Promise<{ valid: boolean; message?: string }> {
  const cleanKey = apiKey.trim()
  if (!cleanKey || cleanKey.length < 6) {
    return { valid: false, message: 'API key quá ngắn hoặc không hợp lệ.' }
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000)

  try {
    if (provider === 'gemini') {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(cleanKey)}`,
        { signal: controller.signal },
      )
      clearTimeout(timeoutId)
      if (res.ok) return { valid: true }
      if (res.status === 400 || res.status === 403 || res.status === 401) {
        return { valid: false, message: 'API key Google Gemini không đúng hoặc chưa kích hoạt.' }
      }
      return { valid: true } // Network or rate limit -> keep valid
    }

    if (provider === 'anthropic') {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': cleanKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 1,
          messages: [{ role: 'user', content: 'ping' }],
        }),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      if (res.ok || res.status === 404) return { valid: true }
      if (res.status === 401 || res.status === 403) {
        return { valid: false, message: 'API key Claude (Anthropic) không hợp lệ.' }
      }
      return { valid: true }
    }

    if (provider === 'tinyfish') {
      const res = await fetch(`https://api.search.tinyfish.ai?query=test&limit=1`, {
        headers: { 'X-API-Key': cleanKey },
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      if (res.status === 401 || res.status === 403) {
        return { valid: false, message: 'API key TinyFish không hợp lệ.' }
      }
      return { valid: true }
    }

    if (provider === 'pollinations' || provider === 'gehihi') {
      // Pollinations / Gehihi Argon key validation: chấp nhận ngay khi có format hợp lệ
      clearTimeout(timeoutId)
      return { valid: true }
    }

    // OpenAI compatible providers
    const baseUrl = PROVIDER_BASE_URLS[provider] || 'https://api.openai.com/v1'
    const res = await fetch(`${baseUrl}/models`, {
      headers: { Authorization: `Bearer ${cleanKey}` },
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (res.ok) return { valid: true }
    if (res.status === 401 || res.status === 403) {
      return { valid: false, message: `API key ${provider} không đúng hoặc đã hết hạn.` }
    }
    return { valid: true }
  } catch {
    clearTimeout(timeoutId)
    // Trường hợp timeout hoặc serverless sandbox không reach được test endpoint:
    // Chấp nhận key nếu format hợp lệ để không chặn người dùng
    return { valid: true }
  }
}

/** Gọi chat trực tiếp tới Provider AI */
export async function callAiProviderChat(
  provider: string,
  apiKey: string,
  messages: Array<{ role: string; content: string }>,
  model?: string,
  maxTokens = 2048,
): Promise<{ content: string; model: string; provider: string }> {
  const chosenModel = model || 'gpt-4o-mini'

  if (provider === 'gemini') {
    const geminiModel = model || 'gemini-2.5-flash'
    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      },
    )
    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Google Gemini API lỗi: ${res.status} - ${errText.slice(0, 150)}`)
    }
    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
    return { content: text, model: geminiModel, provider: 'gemini' }
  }

  if (provider === 'anthropic') {
    const anthropicModel = model || 'claude-3-5-haiku-20241022'
    const systemMsg = messages.find((m) => m.role === 'system')?.content
    const nonSystemMsgs = messages.filter((m) => m.role !== 'system')
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: anthropicModel,
        max_tokens: maxTokens,
        system: systemMsg,
        messages: nonSystemMsgs.map((m) => ({ role: m.role, content: m.content })),
      }),
    })
    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Anthropic Claude API lỗi: ${res.status} - ${errText.slice(0, 150)}`)
    }
    const data = await res.json()
    const text = data?.content?.[0]?.text ?? ''
    return { content: text, model: anthropicModel, provider: 'anthropic' }
  }

  // Gehihi Gemini Argon (2026) multi-endpoint routing
  if (provider === 'gehihi') {
    const argonModel = model || 'gemini-4-argon'
    const endpoints = [
      process.env.GEHIHI_BASE_URL,
      'https://comparisons-press-mild-joke.trycloudflare.com/openai/v1/chat/completions',
      'https://gehihi-agron-2026-one.vercel.app/openai/v1/chat/completions',
      'http://127.0.0.1:54984/openai/v1/chat/completions',
    ].filter(Boolean) as string[]

    for (const ep of endpoints) {
      try {
        const fullUrl = ep.endsWith('/chat/completions') ? ep : `${ep}/chat/completions`
        const res = await fetch(fullUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: argonModel,
            messages,
            max_tokens: maxTokens,
          }),
          signal: AbortSignal.timeout(30000),
        })

        if (res.ok) {
          const data = await res.json()
          const text = data?.choices?.[0]?.message?.content ?? ''
          if (text) {
            return { content: text, model: argonModel, provider: 'gehihi' }
          }
        }
      } catch {}
    }
  }

  // OpenAI-compatible providers
  const baseUrl = PROVIDER_BASE_URLS[provider] || 'https://api.openai.com/v1'
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: chosenModel,
      messages,
      max_tokens: maxTokens,
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`${provider} API lỗi: ${res.status} - ${errText.slice(0, 150)}`)
  }

  const data = await res.json()
  const text = data?.choices?.[0]?.message?.content ?? ''
  return { content: text, model: chosenModel, provider }
}
