import { NextResponse } from 'next/server'
import { RagDocument } from '../../../../lib/types'

export const dynamic = 'force-dynamic'

const defaultDocs: RagDocument[] = [
  {
    id: 'doc_playbook_2026',
    title: 'Cẩm Nang Thực Chiến Kiếm Tiền Online & Affiliate 2026',
    sourceType: 'text',
    sourceUrl: null,
    mimeType: 'text/markdown',
    status: 'ready',
    chunkCount: 18,
    error: null,
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json(defaultDocs)
}
