import { fetchDedupe as fetch } from 'fetch-dedupe'

import config from '../config'

function offlineResponse(): string {
  console.debug('[DEBUG]', 'You are offline.')
  return 'You are offline'
}

export type TokenType = string
export type HeadersWithAuthorization = HeadersInit & {
  Authorization?: string
}
export type APIResponse = {
  response: {
    // eslint-disable-next-line
    entities?: any
  }
}

export function getFullUrl(endpoint: string): string {
  if (endpoint.indexOf('https://') >= 0 || endpoint.indexOf('http://') >= 0) {
    return endpoint
  }

  return endpoint.indexOf(config.urls.api) === -1 ? `${config.urls.api}${endpoint}` : endpoint
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export async function callApi(
  endpoint: string,
  method = 'GET',
  headers: HeadersWithAuthorization = {},
  body: BodyInit = '',
  errorStringify = true,
  searchParams?: APISearchParams
): Promise<APIResponse> {
  const fullUrl = getFullUrl(endpoint)

  const params: RequestInit = {
    method,
    credentials: 'include',
    headers,
  }

  const url = new URL(fullUrl)

  if (searchParams) {
    Object.keys(searchParams).forEach((key) =>
      url.searchParams.append(key, searchParams[key] as string)
    )
  }

  if (method === 'PATCH' || method === 'POST' || method === 'PUT' || method === 'DELETE') {
    params.body = body
  }

  const response = await fetch(url, params)

  if (response.status < 100 || response.status >= 500) {
    throw new Error(offlineResponse())
  }

  if (response.status === 204) {
    return { response: {} }
  }

  const contentType = response.headers.get('content-type')
  if (contentType && contentType.indexOf('application/json') !== -1) {
    const json = response.data

    if (!response.ok) {
      if (errorStringify) throw new Error(JSON.stringify(json))
      throw json
    }

    return {
      response: {
        entities: json,
      },
    }
  }
  // For non-JSON type responses, just return the data.
  return response.data
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function callApiWithToken(
  endpoint: string,
  token: TokenType,
  method = 'GET',
  headers: HeadersWithAuthorization = {},
  body: BodyInit = '',
  errorStringify = true,
  searchParams?: APISearchParams
) {
  const tokenHeaders: HeadersWithAuthorization = { ...headers }
  if (token) {
    tokenHeaders.Authorization = `Bearer ${token}`
  }
  return callApi(endpoint, method, tokenHeaders, body, errorStringify, searchParams)
}

// Convenience methods

export type APIDetail<T> = T

export interface APIList<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface APISearchParams {
  [k: string]: string | string[] | number | boolean | undefined
}

async function list<S extends APISearchParams = APISearchParams>(
  url: string,
  page = 1,
  limit = 0,
  searchParams?: S,
  apiToken?: string,
  method = 'GET'
) {
  const actualLimit = limit === -1 ? Number.MAX_SAFE_INTEGER : limit || config.defaultLimit
  const offset = (page - 1) * actualLimit

  const params: {
    [k: string]: string | string[] | number | boolean | undefined
  } = {
    limit: actualLimit,
    offset,
    ...searchParams,
  }

  if (apiToken) {
    return callApiWithToken(url, apiToken, method, { Authorization: '' }, '', true, params)
  }

  return callApi(url, 'GET', {}, '', true, params)
}

export default {
  list,
}
