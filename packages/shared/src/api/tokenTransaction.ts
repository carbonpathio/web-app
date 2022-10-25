import config from '../config'
import base, { APIList, APIResponse, callApiWithToken } from './base'
import { APIWell } from './wells'

export interface APITokenTransaction {
  id: number
  well: APIWell | null
  created: string
  type: 'purchase' | 'retire'
  transactionHash: string
  amount: string
}

export interface APITokenPurchase {
  transactionHash: string
  amount: number
}

export type APITokenTransactionList = APIList<APITokenTransaction>

export const fetchMyTransactions = async (
  token: string,
  page = 1,
  limit = config.defaultLimit
): Promise<APIResponse> => base.list(`${config.urls.tokens}mine/`, page, limit, undefined, token)

export const purchase = async (token: string, data: APITokenPurchase): Promise<APIResponse> =>
  callApiWithToken(
    `${config.urls.tokens}purchase/`,
    token,
    'POST',
    {
      'Content-Type': 'application/json',
    },
    JSON.stringify(data)
  )
