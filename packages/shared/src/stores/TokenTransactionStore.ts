import { observable } from 'mobx'
import {
  getRoot,
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
import { APITokenPurchase, APITokenTransactionList } from '../api'
import { APIResponse } from '../api/base'
import TokenTransaction from '../models/TokenTransaction'
import { getError, getSuccess } from '../utils'
import RootStore from './RootStore'

@model('carbonPath/TokenTransactionStore')
export default class TokenTransactionStore extends Model({
  transactions: prop(() => objectMap<TokenTransaction>()),
}) {
  @observable
  loading = false

  @modelAction
  createOrUpdateTransaction(data: ModelCreationData<TokenTransaction>): boolean {
    const id = `${data.id}`
    if (this.transactions.has(id)) {
      this.transactions.get(id)?.update(data)
    } else {
      const transaction = new TokenTransaction(data)
      this.transactions.set(id, transaction)
      transaction.update(data)
    }
    return true
  }

  @modelFlow
  fetchMyTransactions = _async(function* (
    this: TokenTransactionStore,
    page?: number,
    limit?: number
  ) {
    this.loading = true

    const rootStore = getRoot<RootStore>(this)

    if (!rootStore || !rootStore.authStore.token) {
      this.loading = false
      return
    }

    try {
      const {
        response: { entities },
      } = yield* _await(
        api.fetchMyTransactions(rootStore.authStore.token, page, limit) as Promise<APIResponse>
      )
      const { results } = entities as APITokenTransactionList
      this.transactions.clear()
      results.map((transaction) => this.createOrUpdateTransaction(transaction))
    } catch (error: any) {
      console.warn('[DEBUG] error fetching Token Transactions', error)
      return getError(error)
    }
    this.loading = false
    return getSuccess()
  })

  @modelFlow
  purchase = _async(function* (this: TokenTransactionStore, data: APITokenPurchase) {
    this.loading = true

    const rootStore = getRoot<RootStore>(this)

    if (!rootStore || !rootStore.authStore.token) {
      this.loading = false
      return
    }

    try {
      const {
        response: { entities },
      } = yield* _await(api.purchase(rootStore.authStore.token, data) as Promise<APIResponse>)
      this.loading = false
      return getSuccess(entities as APITokenPurchase)
    } catch (error: any) {
      console.warn('[DEBUG] error fetching Wells', error)
      this.loading = false
      return getError(error)
    }
  })
}
