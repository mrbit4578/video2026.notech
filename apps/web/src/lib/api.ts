/**
 * API client cho hệ thống Kiemtien2026 / VeoGenie.
 * - Hỗ trợ cả Serverless Next.js API Routes (Vercel) và Backend NestJS độc lập.
 * - Base URL ưu tiên NEXT_PUBLIC_API_URL, mặc định trỏ về /api (Next.js serverless).
 * - Dùng `credentials: 'include'` để gửi session cookie của backend/serverless.
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

export class ApiError extends Error {
  /** HTTP status; 0 = không kết nối được tới server (network error) */
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function parseJsonSafe(text: string): any {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export function resolveApiUrl(path: string): string {
  const base = (process.env.NEXT_PUBLIC_API_URL || '/api').replace(/\/+$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  // Nếu base kết thúc bằng /api và cleanPath cũng bắt đầu bằng /api/ -> tránh duplicate /api/api/
  if (base.endsWith('/api') && cleanPath.startsWith('/api/')) {
    return `${base.slice(0, -4)}${cleanPath}`
  }
  return `${base}${cleanPath}`
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

async function request<T>(
  path: string,
  method: HttpMethod = 'GET',
  body?: unknown,
  /** true → body là FormData, không set Content-Type để browser tự thêm boundary */
  asForm?: boolean,
  timeoutMs: number = 60000,
): Promise<T> {
  const url = resolveApiUrl(path)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  let res: Response
  try {
    res = await fetch(url, {
      method,
      // Quan trọng: gửi session cookie để backend/serverless nhận diện
      credentials: 'include',
      headers: asForm ? undefined : { 'Content-Type': 'application/json' },
      body:
        body !== undefined
          ? asForm
            ? (body as BodyInit)
            : JSON.stringify(body)
          : undefined,
      signal: controller.signal,
    })
  } catch (fetchErr: any) {
    if (fetchErr?.name === 'AbortError') {
      throw new ApiError(
        408,
        `Hết thời gian chờ phản hồi từ máy chủ (${Math.round(timeoutMs / 1000)}s). Vui lòng thử lại.`,
      )
    }
    throw new ApiError(
      0,
      'Không kết nối được tới API. Kiểm tra mạng hoặc cấu hình hệ thống.',
    )
  } finally {
    clearTimeout(timer)
  }

  if (res.status === 401) {
    throw new ApiError(401, 'Phiên làm việc hết hạn hoặc cần đăng nhập.')
  }

  const text = await res.text()
  const data = text ? parseJsonSafe(text) : null

  if (!res.ok) {
    const raw = (data && (data.message ?? data.error)) || `API lỗi ${res.status}`
    const message = Array.isArray(raw) ? raw.join(', ') : String(raw)
    throw new ApiError(res.status, message)
  }

  return data as T
}

export const api = {
  get: <T>(path: string, timeoutMs?: number) => request<T>(path, 'GET', undefined, false, timeoutMs),
  post: <T>(path: string, body?: unknown, timeoutMs?: number) => request<T>(path, 'POST', body, false, timeoutMs),
  put: <T>(path: string, body?: unknown, timeoutMs?: number) => request<T>(path, 'PUT', body, false, timeoutMs),
  patch: <T>(path: string, body?: unknown, timeoutMs?: number) => request<T>(path, 'PATCH', body, false, timeoutMs),
  del: <T>(path: string, timeoutMs?: number) => request<T>(path, 'DELETE', undefined, false, timeoutMs),

  /** Upload multipart FormData */
  uploadFile: <T>(path: string, formData: FormData, timeoutMs?: number) =>
    request<T>(path, 'POST', formData, true, timeoutMs),

  /** URL OAuth cho provider */
  oauthStartUrl: (provider: string) => resolveApiUrl(`/auth/${provider}/start`),
}

