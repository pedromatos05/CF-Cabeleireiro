const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

function authHeaders(token?: string): HeadersInit {
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const api = {
  get: <T>(path: string, token?: string) =>
    request<T>(path, { headers: authHeaders(token) }),

  post: <T>(path: string, body: unknown, token?: string) =>
    request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: authHeaders(token),
    }),

  put: <T>(path: string, body: unknown, token?: string) =>
    request<T>(path, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: authHeaders(token),
    }),

  delete: <T>(path: string, token?: string) =>
    request<T>(path, { method: 'DELETE', headers: authHeaders(token) }),
}
