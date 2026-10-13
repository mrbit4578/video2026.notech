import { NextRequest, NextResponse } from 'next/server'
import { normalizeSlug } from '../../../../../lib/niche-mixer'

export const dynamic = 'force-dynamic'

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  return NextResponse.json({ ok: true, slug: normalizeSlug(slug) })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const body = await req.json()
  return NextResponse.json({
    slug: normalizeSlug(slug),
    label: slug,
    status: body.status || 'done',
    feedback: body.feedback,
    outcome: body.outcome,
  })
}
