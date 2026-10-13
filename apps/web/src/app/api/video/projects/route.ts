import { NextRequest, NextResponse } from 'next/server'
import { VideoProjectSummary } from '../../../../lib/types'

export const dynamic = 'force-dynamic'

const globalProjects: VideoProjectSummary[] = [
  {
    id: 'proj_sample_01',
    title: 'Xu hướng kiếm tiền online & AI Automation 2026',
    series: 'MMO Trend',
    stage: 'script',
    riskScore: 12,
    assetCount: 3,
    claimCount: 2,
    aiEntryCount: 1,
    contentItemId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json(globalProjects)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, series, viralSourceUrl } = body

    const id = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
    const now = new Date().toISOString()
    const newProj: VideoProjectSummary = {
      id,
      title: title || 'Dự án video mới',
      series: series || 'Ngách AI',
      stage: 'intake',
      riskScore: 10,
      assetCount: 0,
      claimCount: 0,
      aiEntryCount: 0,
      contentItemId: null,
      createdAt: now,
      updatedAt: now,
    }

    globalProjects.unshift(newProj)
    return NextResponse.json(newProj)
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || 'Lỗi tạo dự án video' }, { status: 500 })
  }
}
