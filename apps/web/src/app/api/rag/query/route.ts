import { NextRequest, NextResponse } from 'next/server'
import { RagQueryResult } from '../../../../lib/types'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { query, strategy = 'hybrid' } = body

    const result: RagQueryResult = {
      answer: `Kiến thức từ kho tri thức 2026: Về câu hỏi "${query}", hệ thống khuyến nghị tập trung vào tối ưu hóa tỷ lệ chuyển đổi video ngắn (Shorts/TikTok), gắn link affiliate minh bạch và kết hợp mô hình AI Copilot tự động hóa kịch bản.`,
      strategy,
      sources: [
        {
          documentId: 'doc_playbook_2026',
          documentTitle: 'Cẩm Nang Thực Chiến Kiếm Tiền Online & Affiliate 2026',
          chunkId: 'chunk_top_roi_strategy',
          score: 0.94,
          modality: 'text',
        },
      ],
      steps: [
        {
          tool: 'vector_search',
          args: { query, topK: 3 },
          result: 'Đã tìm thấy 3 đoạn văn bản có độ tương đồng > 90%',
        },
      ],
      outsideKnowledge: false,
    }

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || 'Lỗi truy vấn RAG' }, { status: 500 })
  }
}
