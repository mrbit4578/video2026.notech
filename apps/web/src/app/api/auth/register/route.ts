import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { AUTH_SESSION_COOKIE } from '../../../../lib/auth-constants'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, name } = body as { email?: string; password?: string; name?: string }

    if (!email || !email.trim()) {
      return NextResponse.json({ message: 'Vui lòng nhập email.' }, { status: 400 })
    }
    if (!password || password.length < 8) {
      return NextResponse.json({ message: 'Mật khẩu phải có ít nhất 8 ký tự.' }, { status: 400 })
    }

    const cleanEmail = email.trim().toLowerCase()
    const displayName = (name && name.trim()) || cleanEmail.split('@')[0]
    const emailHash = createHash('sha256').update(cleanEmail).digest('hex').substring(0, 10)

    const user = {
      id: `usr_${emailHash}`,
      name: displayName,
      email: cleanEmail,
    }

    const workspace = {
      id: `ws_${emailHash}`,
      name: `Workspace của ${displayName}`,
      plan: 'enterprise',
    }

    const sessionPayload = {
      user,
      workspace,
      role: 'owner',
      createdAt: new Date().toISOString(),
    }

    const encodedSession = Buffer.from(JSON.stringify(sessionPayload)).toString('base64url')

    const res = NextResponse.json({ user, workspace }, { status: 201 })

    res.cookies.set(AUTH_SESSION_COOKIE, encodedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
    })

    return res
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message || 'Có lỗi xảy ra trong quá trình đăng ký.' },
      { status: 500 },
    )
  }
}
