import { NextRequest, NextResponse } from 'next/server'
import { UsedNiche, normalizeSlug } from '../../../../lib/niche-mixer'

export const dynamic = 'force-dynamic'

// Shared in-memory state for used niches
const usedNichesStore: UsedNiche[] = []

export async function GET() {
  return NextResponse.json(usedNichesStore)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { slug, label, category, score, rationale, source } = body

    const normSlug = normalizeSlug(slug || label || '')
    const existing = usedNichesStore.find((u) => u.slug === normSlug)
    if (existing) {
      return NextResponse.json(existing)
    }

    const item: UsedNiche = {
      slug: normSlug,
      label: label || slug,
      category: category || 'niche',
      status: 'used',
    }
    usedNichesStore.unshift(item)
    return NextResponse.json(item)
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || 'Lỗi lưu ngách đã dùng' }, { status: 500 })
  }
}
