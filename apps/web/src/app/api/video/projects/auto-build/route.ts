import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { content, providerId, model } = body

    const projectId = `proj_${Date.now()}`
    return NextResponse.json({
      projectId,
      title: content ? content.slice(0, 50) + '…' : 'Dự án video mới',
      riskScore: 12,
      decision: 'approved',
      provider: providerId || 'gemini',
      model: model || 'gemini-2.5-flash',
    })
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || 'Lỗi auto-build' }, { status: 500 })
  }
}
