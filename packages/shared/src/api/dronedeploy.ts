import config from '../config'
import { APIResponse, callApi } from './base'

export interface APIMapPlan {
  id: number
  apiId: string
  name: string
  jpegBounds: {
    east: string,
    west: string,
    north: string,
    south: string
  }
  jpegFileUrl: string
}

export interface APIPanoPlan {
    id: number
    apiId: string
    name: string
    geometry: {
        lat: number
        lng: number
    }[]
    downloadPath: string
}

export interface APIPhotoPlan {
    id: number
    apiId: string
    name: string
    geometry: {
        lat: number
        lng: number
    }[]
    downloadPath: string[]
}

export interface APIVideoPlan {
    id: number
    apiId: string
    name: string
    geometry: {
        lat: number
        lng: number
    }[]
    downloadPath: string
}

export interface APIPlans {
  mapPlans: APIMapPlan[]
  panoPlans: APIPanoPlan[]
  photoPlans: APIPhotoPlan[]
  videoPlans: APIVideoPlan[]
}

export const fetchImageLinks = async (): Promise<APIResponse> => {
  return callApi(
    `${config.urls.dronedeploy}fetch_image_links/`,
    'GET'
  )
}