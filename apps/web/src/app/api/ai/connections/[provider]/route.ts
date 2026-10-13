import { NextRequest, NextResponse } from 'next/server'
import {
  AI_VAULT_COOKIE,
  getStoredAiKeys,
  saveStoredAiKeys,
  StoredAiKey,
} from '../../../../../lib/ai-vault'

export const dynamic = 'force-dynamic'

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  try {
    const { provider } = await params
    const existing = await getStoredAiKeys()
    const updated = existing.filter((k) => k.provider !== provider)
    const cookieVal = await saveStoredAiKeys(updated)

    const res = NextResponse.json({ ok: true, removed: provider })
    res.cookies.set(AI_VAULT_COOKIE, cookieVal, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
    })
    return res
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message || 'Không thể xóa kết nối AI.' },
      { status: 500 },
    )
  }
}
