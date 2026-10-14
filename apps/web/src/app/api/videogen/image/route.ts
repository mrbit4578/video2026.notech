import { NextRequest, NextResponse } from 'next/server'
import { getStoredAiKeys } from '../../../../lib/ai-vault'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prompt = '', aspectRatio = '9:16', provider } = body

    const cleanPrompt = String(prompt).trim() || 'Cinematic vertical 9:16 scene, ultra realistic 8k'
    let width = 720
    let height = 1280

    if (aspectRatio === '16:9') {
      width = 1280
      height = 720
    } else if (aspectRatio === '1:1') {
      width = 1024
      height = 1024
    }

    const promptEncoded = encodeURIComponent(cleanPrompt.slice(0, 320))
    const randomSeed = Math.floor(Math.random() * 900000) + 100000

    // Pollinations AI high quality image generator
    const imageUrl = `https://image.pollinations.ai/prompt/${promptEncoded}?width=${width}&height=${height}&seed=${randomSeed}&nologo=true&model=flux`

    return NextResponse.json({
      provider: provider && provider !== 'auto' ? provider : 'pollinations-flux',
      model: 'flux-ultra-2k',
      url: imageUrl,
      mime: 'image/jpeg',
    })
  } catch (error: any) {
    console.error('[/api/videogen/image] Error:', error)
    return NextResponse.json(
      { message: error?.message || 'Lỗi khi tạo ảnh AI cho scene.' },
      { status: 500 }
    )
  }
}
