"use server"

const API_URL = process.env.API_URL

export async function apiFetch<T>(
    input: string,
    options: RequestInit = {}
): Promise<T> {
    const reqHeaders = new Headers(options.headers)

    reqHeaders.set("Content-Type", "application/json")

    const url = `${API_URL}${input}`

    console.log(url)

    const res = await fetch(
        url,
        {
            ...options,
            headers: reqHeaders
        }
    )

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(`API Error: ${res.status} ${msg}`);
    }

    return res.json() as Promise<T>
}

const STRAPI_URL = process.env.STRAPI_URL

const STRAPI_TOKEN = process.env.STRAPI_TOKEN

export async function strapiFetch<T>(
    input: string,
    options: RequestInit = {}
): Promise<T> {
    const reqHeaders = new Headers(options.headers)

    reqHeaders.set("Content-Type", "application/json")
    reqHeaders.set("Authorization", `Bearer ${STRAPI_TOKEN}`)

    const url = `${STRAPI_URL}${input}`

    console.log(url)

    const res = await fetch(
        url,
        {
            ...options,
            headers: reqHeaders
        }
    )

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(`API Error: ${res.status} ${msg}`)
    }

    return res.json() as Promise<T>
}