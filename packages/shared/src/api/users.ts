import config from '../config'
import { APIResponse, callApiWithToken } from './base'

export type APIUser = {
  id: number
  username: string
  email: string
  walletAddress: string
  isStaff: boolean
  retiredAmount: number
}

export const fetchMe = async (token: string): Promise<APIResponse | Blob> =>
  callApiWithToken(`${config.urls.users}me/`, token)

export const updateMe = async (token: string, data: Partial<APIUser>): Promise<APIResponse | Blob> =>
  callApiWithToken(
    `${config.urls.users}me/`,
    token, 
    'PATCH',
    {
      'Content-Type': 'application/json',
    },
    JSON.stringify(data)
  )
