import config from '../config'
import base, { APIList, APIResponse, callApi, callApiWithToken } from './base'

export interface APIWellImage {
  id: number
  image: string
  description: string
}

export interface APIWell {
  id: number
  name: string
  tonnesOfCO2: number
  costPerTonne: number
  status: string

  type: string[]
  source: string[]

  adminContractAddress: string
  nftContractAddress: string
  tokenContractAddress: string
  mintTransactionHash: string
  numberOfAdvancedEavs: number
  numberOfBufferPoolEavs: number
  tokenId: string
  blockchain: string
  metadata: string
  ipfsMetadataUrl: string
  mintStatus: string
  retiredAmount: number

  field: string
  county: string
  state: string
  country: string
  location: string
  md: number
  tvd: number
  producingFormation: string
  legalDescription: string
  leaseId: number
  wellType: string
  township: string
  range: string
  shlSection: number
  bhlSection: number
  shlLatitude: number
  shlLongitude: number
  firstPerforationDepth: number
  lastPerforationDepth: number
  firstProduction: Date
  wellImageList: APIWellImage[]

  isSavedWell?: boolean
}

export type APIWellList = APIList<APIWell>

export interface APIWellMint {
  adminContractAddress: string
  nftContractAddress: string
  tokenContractAddress: string
  mintTransactionHash: string
  numberOfAdvancedEavs: number
  numberOfBufferPoolEavs: number
  tokenId: string
}

export interface APIWellTokenRetire {
  transactionHash: string
  amount: number
}

export interface APIWellStatistics {
  totalAdvancedEavs: number
  totalBufferPoolEavs: number
  totalCarbonRetired: string
}

export const fetchWell = async (id: number): Promise<APIResponse> => {
  return callApi(`${config.urls.wells}${id}/`)
}

export const fetchWells = async (page = 1, limit = config.defaultLimit): Promise<APIResponse> =>
  base.list(config.urls.wells, page, limit)

export const fetchMintedWells = async (
  page = 1,
  limit = config.defaultLimit
): Promise<APIResponse> => base.list(`${config.urls.wells}minted-wells`, page, limit)

export const fetchWellStatistics = async (): Promise<APIResponse> =>
  callApi(`${config.urls.wells}statistics/`)

export const fetchEnverusWellData = async (id: number): Promise<APIResponse> => {
  return callApi(`${config.urls.wells}${id}/fetch-enverus-well-data/`)
}

export const ipfs = async (wellId: number, token: string): Promise<APIResponse> =>
  callApiWithToken(`${config.urls.wells}${wellId}/ipfs/`, token, 'post')

export const mint = async (
  wellId: number,
  token: string,
  data: APIWellMint
): Promise<APIResponse> => {
  return callApiWithToken(
    `${config.urls.wells}${wellId}/mint/`,
    token,
    'POST',
    {
      'Content-Type': 'application/json',
    },
    JSON.stringify(data)
  )
}

export const retire = async (
  wellId: number,
  token: string,
  data: APIWellTokenRetire
): Promise<APIResponse> =>
  callApiWithToken(
    `${config.urls.wells}${wellId}/retire/`,
    token,
    'POST',
    {
      'Content-Type': 'application/json',
    },
    JSON.stringify(data)
  )

export const saveWell = async (wellId: number, token: string): Promise<APIResponse> =>
  callApiWithToken(`${config.urls.wells}${wellId}/save-well/`, token, 'post')

export const removeSavedWell = async (wellId: number, token: string): Promise<APIResponse> =>
  callApiWithToken(`${config.urls.wells}${wellId}/remove-well/`, token, 'post')

export const isSavedWell = async (wellId: number, token: string): Promise<APIResponse> => {
  return callApiWithToken(`${config.urls.wells}${wellId}/is-saved-well/`, token, 'get')
}

export const mySavedWells = async (token: string): Promise<APIResponse> => {
  return callApiWithToken(`${config.urls.wells}my-saved-wells/`, token, 'get')
}
