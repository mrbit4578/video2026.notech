import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface StoredSession {
  id: string
  title: string
  provider: string
  model?: string
  mode?: string
  createdAt: string
  updatedAt: string
  messages: Array<{
    id: string
    role: string
    content: string
    createdAt: string
    meta?: any
  }>
}

// Bộ nhớ in-memory cookie/global cho chat sessions
const globalSessions: StoredSession[] = []

export async function GET() {
  const sessions = globalSessions.map((s) => ({
    id: s.id,
    title: s.title,
    provider: s.provider,
    model: s.model,
    mode: s.mode,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
    messageCount: s.messages.length,
  }))
  return NextResponse.json(sessions)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { provider, model, mode, title } = body as {
      provider: string
      model?: string
      mode?: string
      title?: string
    }

    const now = new Date().toISOString()
    const id = `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    const newSession: StoredSession = {
      id,
      title: title || `Trò chuyện với ${provider || 'AI'}`,
      provider: provider || 'gemini',
      model,
      mode: mode || 'chat',
      createdAt: now,
      updatedAt: now,
      messages: [],
    }

    globalSessions.unshift(newSession)

    return NextResponse.json(newSession)
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || 'Lỗi tạo phiên chat.' }, { status: 500 })
  }
}

export async function DELETE() {
  const count = globalSessions.length
  globalSessions.length = 0
  return NextResponse.json({ ok: true, deletedSessions: count, deletedMessages: 0 })
}
