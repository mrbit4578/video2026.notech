import { NextRequest, NextResponse } from 'next/server'
import { mixNiches, NicheCandidate, normalizeSlug } from '../../../../lib/niche-mixer'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { pickedSlug, pool = [], visibleSlugs = [] } = body

    const excludeSlugs = [...visibleSlugs, pickedSlug]
    const candidates = Array.isArray(pool) ? pool : []

    const result = mixNiches(candidates as NicheCandidate[], {
      used: [{ slug: normalizeSlug(pickedSlug), label: pickedSlug }],
      options: { k: 1, lambda: 0.55, topicCap: 2, excludeSlugs },
    })

    const backfill = result.picked[0] || null
    return NextResponse.json({
      backfill,
      rejectedCount: result.rejected.length,
    })
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || 'Lỗi thay thế ngách' }, { status: 500 })
  }
}
