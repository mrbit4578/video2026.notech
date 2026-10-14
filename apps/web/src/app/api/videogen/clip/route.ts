import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { provider, model } = body

    const jobId = `job_${Date.now()}_${randomUUID().slice(0, 8)}`

    return NextResponse.json({
      jobId,
      provider: provider && provider !== 'auto' ? provider : 'veogenie-motion-engine',
      model: model || 'veo-3.1-pro',
    })
  } catch (error: any) {
    console.error('[/api/videogen/clip] Error:', error)
    return NextResponse.json(
      { message: error?.message || 'Lỗi khi khởi tạo clip AI.' },
      { status: 500 }
    )
  }
}
