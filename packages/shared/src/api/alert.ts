import config from '../config'
import base, { APIList, APIResponse, callApiWithToken } from './base'

export interface APIAlertType {
  id: number
  type: string 
  name: string
}

export interface APIAlert {
  id: number
  type: number
  user: number
  message: string
  isRead: boolean
  created: string
}

export interface APISubscribe {
  id?: number
  name: string
  type: string
}

export interface APIBoolAlert {
  result: boolean
}

export type APIAlertList = APIList<APIAlert>

export const fetchAlertsMine = async (page = 1, limit = config.defaultLimit, apiToken: string): Promise<APIResponse> =>
  base.list(`${config.urls.alerts}mine/`, page, limit, undefined, apiToken)

export const readAlertsMine = async (page = 1, limit = config.defaultLimit, apiToken: string): Promise<APIResponse> =>
  base.list(`${config.urls.alerts}read/`, page, limit, undefined, apiToken, 'PATCH')

export const clearAlertsMine = async (page = 1, limit = config.defaultLimit, apiToken: string): Promise<APIResponse> =>
  base.list(`${config.urls.alerts}clear/`, page, limit, undefined, apiToken, 'DELETE')

export const subscribeAlert = async (
  token: string,
  data: APISubscribe
): Promise<APIResponse> => {
  return callApiWithToken(
    `${config.urls.alerts}subscribe/`,
    token,
    'POST',
    {
      'Content-Type': 'application/json',
    },
    JSON.stringify(data)
  )
}

export const unsubscribeAlert = async (
  token: string,
  data: APISubscribe
): Promise<APIResponse> => {
  return callApiWithToken(
    `${config.urls.alerts}unsubscribe/`,
    token,
    'POST',
    {
      'Content-Type': 'application/json',
    },
    JSON.stringify(data)
  )
}

export const isSubscribedAlert = async (
  token: string,
  data: APISubscribe
): Promise<APIResponse> => {
  return callApiWithToken(
    `${config.urls.alerts}is-subscribed/`,
    token,
    'POST',
    {
      'Content-Type': 'application/json',
    },
    JSON.stringify(data)
  )
}
