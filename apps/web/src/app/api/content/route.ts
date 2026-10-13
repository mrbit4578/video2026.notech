import { NextRequest, NextResponse } from 'next/server'
import { ApiContentItem } from '../../../lib/types'

export const dynamic = 'force-dynamic'

const defaultContent: ApiContentItem[] = [
  {
    id: 'cnt_01',
    workspaceId: 'ws_vip_unlimited',
    caption: 'Tự động hóa kênh affiliate video ngắn với AI Copilot 2026 #KiemTien2026',
    assetUrl: '/samples/sample_ai_agent.mp4',
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    status: 'approved',
    approvalStatus: 'approved',
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json(defaultContent)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const item: ApiContentItem = {
      id: `cnt_${Date.now()}`,
      workspaceId: 'ws_vip_unlimited',
      caption: body.caption || '',
      assetUrl: body.assetUrl || null,
      scheduledAt: body.scheduledAt || null,
      status: 'draft',
      approvalStatus: 'pending',
      createdAt: new Date().toISOString(),
    }
    defaultContent.unshift(item)
    return NextResponse.json(item)
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || 'Lỗi tạo bài viết' }, { status: 500 })
  }
}
