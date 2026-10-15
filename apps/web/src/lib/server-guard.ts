import { NextRequest, NextResponse } from 'next/server'

/**
 * Kaizen Standard from OpenMedia Workbench & reverse engineered audit (F04, F07):
 * - Strict JSON payload limit to prevent memory exhaustion / DoS on serverless runtimes.
 * - Normalized error responses with standardized error codes and client-friendly messages.
 */
export const MAX_JSON_PAYLOAD_BYTES = 1024 * 1024 // 1 MB standard JSON payload
export const MAX_BATCH_PAYLOAD_BYTES = 5 * 1024 * 1024 // 5 MB for multi-scene audio / batch payloads

export type GuardedResult<T> =
  | { ok: true; data: T; response?: undefined }
  | { ok: false; response: NextResponse; data?: undefined }

export async function parseJsonGuarded<T = any>(
  req: NextRequest,
  maxBytes: number = MAX_JSON_PAYLOAD_BYTES
): Promise<GuardedResult<T>> {
  // 1. Content-Length header early check
  const contentLength = req.headers.get('content-length')
  if (contentLength && parseInt(contentLength, 10) > maxBytes) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          error: 'PAYLOAD_TOO_LARGE',
          message: `Dung lượng yêu cầu vượt quá giới hạn an toàn (${Math.round(maxBytes / 1024)}KB).`,
        },
        { status: 413 }
      ),
    }
  }

  // 2. Safe parse with byte measurement
  try {
    const raw = await req.text()
    if (new TextEncoder().encode(raw).length > maxBytes) {
      return {
        ok: false,
        response: NextResponse.json(
          {
            error: 'PAYLOAD_TOO_LARGE',
            message: `Dung lượng yêu cầu vượt quá giới hạn an toàn (${Math.round(maxBytes / 1024)}KB).`,
          },
          { status: 413 }
        ),
      }
    }
    const data = JSON.parse(raw || '{}')
    return { ok: true, data }
  } catch (err: any) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          error: 'BAD_REQUEST',
          message: 'Dữ liệu JSON không hợp lệ hoặc bị hỏng.',
        },
        { status: 400 }
      ),
    }
  }
}
