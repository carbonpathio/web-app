import config from '../config'
import { APIResponse, callApi, callApiWithToken } from './base'

export type APIGetNonceReq = {
  walletAddress: string
}

export type APIGetNonceResult = {
  nonce: string
}

export type APILoginInput = {
  walletAddress: string
  signature: string
  message: string
}

export type APILoginResult = {
  token: string
}

export const getNonce = async (data: APIGetNonceReq): Promise<APIResponse> =>
  callApi(
    `${config.urls.auth}get-nonce/`,
    'POST',
    { 'Content-Type': 'application/json' },
    JSON.stringify(data)
  )

export const login = async (data: APILoginInput): Promise<APIResponse> =>
  callApi(
    `${config.urls.auth}login/`,
    'POST',
    { Authorization: 'Web3', 'Content-Type': 'application/json' },
    JSON.stringify(data)
  )

export const logout = async (token: string): Promise<APIResponse> =>
  callApiWithToken(`${config.urls.auth}logout/`, token, 'POST')
