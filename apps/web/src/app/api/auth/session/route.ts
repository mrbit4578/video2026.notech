import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AUTH_SESSION_COOKIE } from '../../../../lib/auth-constants'

export const dynamic = 'force-dynamic'

const DEFAULT_GUEST_SESSION = {
  user: {
    id: 'usr_creator_2026',
    name: 'Cao Văn Huệ (Creator Pro)',
    email: 'huongcv@video2026.ai',
  },
  workspace: {
    id: 'ws_vip_unlimited',
    name: 'Workspace Trực Tuyến 2026',
    plan: 'enterprise',
  },
  role: 'owner',
}

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const raw = cookieStore.get(AUTH_SESSION_COOKIE)?.value

    if (!raw) {
      // Tự động cấp quyền phiên Creator Pro mở để người dùng thao tác không bị chặn
      return NextResponse.json(DEFAULT_GUEST_SESSION)
    }

    const decoded = Buffer.from(raw, 'base64url').toString('utf-8')
    const session = JSON.parse(decoded)

    if (!session || !session.user || !session.workspace) {
      return NextResponse.json(DEFAULT_GUEST_SESSION)
    }

    return NextResponse.json({
      user: session.user,
      workspace: session.workspace,
      role: session.role || 'owner',
    })
  } catch {
    return NextResponse.json(DEFAULT_GUEST_SESSION)
  }
}
