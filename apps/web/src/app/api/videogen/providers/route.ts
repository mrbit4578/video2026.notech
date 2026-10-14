import { NextResponse } from 'next/server'
import { getStoredAiKeys } from '../../../../lib/ai-vault'

export const dynamic = 'force-dynamic'

type Capability = 'chat' | 'image' | 'voice' | 'video'

interface ProviderInfo {
  id: string
  name: string
  connected: boolean
  keyHint: string | null
  capabilities: Array<Capability>
}

export async function GET() {
  try {
    const storedKeys = await getStoredAiKeys()
    const activeMap = new Map(
      storedKeys.filter((k) => k.status === 'active').map((k) => [k.provider, k.keyHint])
    )

    const hasGemini = activeMap.has('gemini') || Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY)
    const hasOpenAI = activeMap.has('openai') || Boolean(process.env.OPENAI_API_KEY)

    const providers: ProviderInfo[] = [
      {
        id: 'gemini',
        name: 'Google Gemini Pro',
        connected: hasGemini,
        keyHint: activeMap.get('gemini') || (hasGemini ? '••••env' : null),
        capabilities: ['chat', 'image', 'voice', 'video'],
      },
      {
        id: 'openai',
        name: 'ChatGPT (OpenAI)',
        connected: hasOpenAI,
        keyHint: activeMap.get('openai') || (hasOpenAI ? '••••env' : null),
        capabilities: ['chat', 'image', 'voice', 'video'],
      },
      {
        id: 'pollinations',
        name: 'Pollinations.ai (Miễn phí)',
        connected: true,
        keyHint: 'miễn phí · không cần key',
        capabilities: ['image'],
      },
      {
        id: 'edge',
        name: 'Edge TTS (Miễn phí)',
        connected: true,
        keyHint: 'miễn phí · không cần key',
        capabilities: ['voice'],
      },
      {
        id: 'utim',
        name: 'UTIM Agent',
        connected: true,
        keyHint: activeMap.get('utim') || 'miễn phí',
        capabilities: ['chat'],
      },
      {
        id: 'groq',
        name: 'Groq (LPU Siêu Tốc)',
        connected: activeMap.has('groq') || Boolean(process.env.GROQ_API_KEY),
        keyHint: activeMap.get('groq') || null,
        capabilities: ['chat'],
      },
      {
        id: 'deepseek',
        name: 'DeepSeek',
        connected: activeMap.has('deepseek') || Boolean(process.env.DEEPSEEK_API_KEY),
        keyHint: activeMap.get('deepseek') || null,
        capabilities: ['chat'],
      },
      {
        id: 'anthropic',
        name: 'Claude (Anthropic)',
        connected: activeMap.has('anthropic') || Boolean(process.env.ANTHROPIC_API_KEY),
        keyHint: activeMap.get('anthropic') || null,
        capabilities: ['chat'],
      },
      {
        id: 'xai',
        name: 'Grok (xAI)',
        connected: activeMap.has('xai') || Boolean(process.env.XAI_API_KEY),
        keyHint: activeMap.get('xai') || null,
        capabilities: ['chat', 'image'],
      },
      {
        id: 'vyceai',
        name: 'VyceAI',
        connected: activeMap.has('vyceai'),
        keyHint: activeMap.get('vyceai') || null,
        capabilities: ['chat', 'image'],
      },
    ]

    return NextResponse.json(providers)
  } catch (err: any) {
    console.error('[/api/videogen/providers] Error:', err)
    // Fallback safe defaults so frontend NEVER crashes with 500/404
    return NextResponse.json([
      {
        id: 'pollinations',
        name: 'Pollinations.ai (Miễn phí)',
        connected: true,
        keyHint: 'miễn phí',
        capabilities: ['image'],
      },
      {
        id: 'edge',
        name: 'Edge TTS (Miễn phí)',
        connected: true,
        keyHint: 'miễn phí',
        capabilities: ['voice'],
      },
      {
        id: 'utim',
        name: 'UTIM Agent',
        connected: true,
        keyHint: 'miễn phí',
        capabilities: ['chat'],
      },
      {
        id: 'gemini',
        name: 'Google Gemini',
        connected: false,
        keyHint: null,
        capabilities: ['chat', 'image', 'voice', 'video'],
      },
      {
        id: 'openai',
        name: 'OpenAI ChatGPT',
        connected: false,
        keyHint: null,
        capabilities: ['chat', 'image', 'voice', 'video'],
      },
    ])
  }
}
