import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const body = await req.json()
  const messages = body.messages || []

  return NextResponse.json({
    ok: true,
    title: 'Phiên trò chuyện',
    messages: messages.map((m: any, i: number) => ({
      id: `msg_${Date.now()}_${i}`,
      role: m.role,
      createdAt: new Date().toISOString(),
    })),
  })
}
