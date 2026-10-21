export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type QueryParams = Record<string, string | number | boolean | undefined | null>

interface RequestOptions extends Omit<RequestInit, 'body'> {
  params?: QueryParams
  body?: unknown
  baseUrl?: string
}

function buildQuery(params?: QueryParams) {
  const search = new URLSearchParams()

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined && value !== null) search.set(key, String(value))
  }

  const query = search.toString()
  return query ? `?${query}` : ''
}

export async function createApiError(response: Response) {
  const data: unknown = await response.json().catch(() => null)
  if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
    return new ApiError(response.status, data.message)
  }

  return new ApiError(response.status, 'Erro inesperado')
}

export async function request<T>(
  path: string,
  {params, body, baseUrl = '/api', headers, ...init}: RequestOptions = {},
): Promise<T> {
  const requestHeaders = new Headers(headers)

  if (!requestHeaders.has('Content-Type')) requestHeaders.set('Content-Type', 'application/json')

  const response = await fetch(`${baseUrl}${path}${buildQuery(params)}`, {
    ...init,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) throw await createApiError(response)

  const text = await response.text()
  return (text ? JSON.parse(text) : undefined) as T
}
