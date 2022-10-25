import config from '../config'
import base, { APIList, APIResponse } from './base'

export interface APIFaq {
  id: number
  question: string
  answer: string
}

export type APIFaqList = APIList<APIFaq>

export const fetchFaqs = async (page = 1, limit = config.defaultLimit): Promise<APIResponse> =>
  base.list(config.urls.faqs, page, limit)
