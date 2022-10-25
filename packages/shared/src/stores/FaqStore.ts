import { observable } from 'mobx'
import {
  model,
  Model,
  modelAction,
  ModelCreationData,
  modelFlow,
  objectMap,
  prop,
  _async,
  _await,
} from 'mobx-keystone'

import * as api from '../api'
import { APIFaqList } from '../api'
import { APIResponse } from '../api/base'
import Faq from '../models/Faq'
import { getError, getSuccess } from '../utils'

@model('carbonPath/FaqStore')
export default class FaqStore extends Model({
  faqs: prop(() => objectMap<Faq>()),
}) {
  @observable
  loading = false

  @modelAction
  createOrUpdateFaq(data: ModelCreationData<Faq>) {
    const id = `${data.id}`
    if (this.faqs.has(id)) {
      this.faqs.get(id)?.update(data)
    } else {
      const condition = new Faq(data)
      this.faqs.set(id, condition)
      condition.update(data)
    }
    return true
  }

  @modelAction
  removeFaq(id: number) {
    this.faqs.delete(`${id}`)
    return true
  }

  @modelFlow
  fetchFaqs = _async(function* (this: FaqStore, page?: number, limit?: number) {
    this.loading = true
    try {
      const {
        response: { entities },
      } = yield* _await(api.fetchFaqs(page, limit) as Promise<APIResponse>)
      const { results } = entities as APIFaqList
      this.faqs.clear()
      results.map((faq) => this.createOrUpdateFaq(faq))
    } catch (error: any) {
      console.warn('[DEBUG] error fetching Faqs', error)
      return getError(error)
    }

    this.loading = false
    return getSuccess()
  })
}
