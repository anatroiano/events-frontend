export class ApiError extends Error {
    status: number

    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }
}

type Params = Record<string, string | number | boolean | undefined | null>

interface RequestOptions extends Omit<RequestInit, 'body'> {
    params?: Params
    body?: unknown
    baseUrl?: string
}

function buildQuery(params?: Params) {
    if (!params) return ''

    const search = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
            search.set(key, String(value))
        }
    }

    const query = search.toString()
    return query ? `?${query}` : ''
}

export async function request<T>(
    path: string,
    {params, body, baseUrl = '/api', ...init}: RequestOptions = {},
): Promise<T> {
    const res = await fetch(`${baseUrl}${path}${buildQuery(params)}`, {
        headers: {'Content-Type': 'application/json'},
        body: body !== undefined ? JSON.stringify(body) : undefined,
        ...init,
    })

    if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new ApiError(res.status, data?.message ?? 'Erro inesperado')
    }

    const text = await res.text()
    return (text ? JSON.parse(text) : undefined) as T
}