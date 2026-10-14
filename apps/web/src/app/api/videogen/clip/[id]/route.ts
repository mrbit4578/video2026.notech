import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return NextResponse.json({
    jobId: id,
    status: 'done',
    progress: '100% Hoàn tất',
    error: null,
    provider: 'veogenie-motion-engine',
    model: 'veo-3.1-pro',
  })
}
