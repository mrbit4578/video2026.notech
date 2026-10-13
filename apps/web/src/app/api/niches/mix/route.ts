import { NextRequest, NextResponse } from 'next/server'
import { mixNiches, NicheCandidate } from '../../../../lib/niche-mixer'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { candidates, k = 10, lambda = 0.55, topicCap = 2 } = body

    const pool = Array.isArray(candidates) ? candidates : []
    const result = mixNiches(pool as NicheCandidate[], {
      used: [],
      options: { k, lambda, topicCap },
    })

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || 'Lỗi trộn ngách' }, { status: 500 })
  }
}
