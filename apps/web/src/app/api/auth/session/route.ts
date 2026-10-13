import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    user: {
      id: 'usr_pro_2026',
      name: 'Pro VIP Member',
      email: 'vip@kiemtien2026.ai',
    },
    workspace: {
      id: 'ws_vip_unlimited',
      name: 'VIP Unlimited Workspace',
      plan: 'enterprise',
    },
    role: 'owner',
  })
}
