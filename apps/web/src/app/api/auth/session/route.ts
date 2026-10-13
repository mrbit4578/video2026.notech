import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AUTH_SESSION_COOKIE } from '../../../../lib/auth-constants'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const raw = cookieStore.get(AUTH_SESSION_COOKIE)?.value

    if (!raw) {
      return NextResponse.json({ message: 'Chưa đăng nhập.' }, { status: 401 })
    }

    const decoded = Buffer.from(raw, 'base64url').toString('utf-8')
    const session = JSON.parse(decoded)

    if (!session || !session.user || !session.workspace) {
      return NextResponse.json({ message: 'Phiên làm việc không hợp lệ.' }, { status: 401 })
    }

    return NextResponse.json({
      user: session.user,
      workspace: session.workspace,
      role: session.role || 'owner',
    })
  } catch {
    return NextResponse.json({ message: 'Lỗi xác thực phiên làm việc.' }, { status: 401 })
  }
}
