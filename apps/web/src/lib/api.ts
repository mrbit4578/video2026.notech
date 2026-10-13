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
): Promise<T> {
  const url = resolveApiUrl(path)
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
    })
  } catch {
    throw new ApiError(
      0,
      'Không kết nối được tới API. Kiểm tra mạng hoặc cấu hình hệ thống.',
    )
  }

  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      const onAuthPage = currentPath.startsWith('/login') || currentPath.startsWith('/register')
      if (!onAuthPage) {
        window.location.href = '/login'
      }
    }
    throw new ApiError(401, 'Phiên làm việc hết hạn. Hãy đăng nhập lại.')
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
  get: <T>(path: string) => request<T>(path, 'GET'),
  post: <T>(path: string, body?: unknown) => request<T>(path, 'POST', body),
  put: <T>(path: string, body?: unknown) => request<T>(path, 'PUT', body),
  patch: <T>(path: string, body?: unknown) => request<T>(path, 'PATCH', body),
  del: <T>(path: string) => request<T>(path, 'DELETE'),

  /** Upload multipart FormData */
  uploadFile: <T>(path: string, formData: FormData) =>
    request<T>(path, 'POST', formData, true),

  /** URL OAuth cho provider */
  oauthStartUrl: (provider: string) => resolveApiUrl(`/auth/${provider}/start`),
}
