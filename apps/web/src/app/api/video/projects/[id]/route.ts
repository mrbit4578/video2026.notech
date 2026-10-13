import { NextRequest, NextResponse } from 'next/server'
import { VideoProjectDetail } from '../../../../../lib/types'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const now = new Date().toISOString()
  const detail: VideoProjectDetail = {
    id,
    title: 'Dự án Video Faceless AI',
    series: 'Ngách AI',
    stage: 'script',
    riskScore: 12,
    assetCount: 1,
    claimCount: 1,
    aiEntryCount: 1,
    contentItemId: null,
    viralSourceUrl: null,
    sourceNote: 'Nguồn phân tích tự động từ AI Pro & WeKnora Knowledge Graph',
    angle: 'Góc nhìn người thực chiến 2026',
    briefJson: null,
    script: 'Kịch bản video đã được khởi tạo sẵn sàng cho bước dựng.',
    caption: 'Kiếm tiền online tự động 2026 cùng AI Copilot #KiemTien2026 #Affiliate',
    publishNotes: null,
    riskBreakdown: JSON.stringify({ c: 1, p: 2, l: 1, a: 1, m: 1, h: 1 }),
    gatesJson: JSON.stringify({ G1: { pass: true }, G2: { pass: true } }),
    assets: [
      {
        id: 'asset_1',
        projectId: id,
        name: 'Video b-roll mẫu 01',
        assetType: 'video',
        sourceUrl: '/samples/sample_ai_agent.mp4',
        owner: 'Creative Commons',
        rightsBasis: 'CC0',
        scope: 'commercial',
        proof: null,
        status: 'cleared',
        createdAt: now,
      },
    ],
    claims: [
      {
        id: 'claim_1',
        projectId: id,
        claimText: 'Tỷ lệ hoa hồng SaaS dao động từ 30% đến 50%',
        claimType: 'factual',
        riskLevel: 'low',
        primarySource: 'AccessTrade Ecosystem Report 2026',
        secondarySource: null,
        evidenceExcerpt: null,
        sceneRef: '00:10-00:25',
        scriptCode: '[C1]',
        confidence: 'high',
        status: 'open',
        createdAt: now,
      },
    ],
    aiEntries: [
      {
        id: 'ai_1',
        projectId: id,
        assetName: 'Kịch bản tổng quan',
        tool: 'Gemini 2.5 Flash',
        inputSource: 'Prompt mẫu',
        outputUse: 'Voiceover',
        category: 'A1',
        realPerson: false,
        labelRequired: false,
        labelApplied: true,
        consentStatus: 'cleared',
        createdAt: now,
      },
    ],
    createdAt: now,
    updatedAt: now,
  }
  return NextResponse.json(detail)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const body = await req.json()
  return NextResponse.json({ id, ...body, updatedAt: new Date().toISOString() })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  return NextResponse.json({ ok: true, id })
}
