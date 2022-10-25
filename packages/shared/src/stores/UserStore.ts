import { observable } from 'mobx'
import { model, Model, modelAction, modelFlow, prop, _async, _await } from 'mobx-keystone'
import * as api from '../api'
import { APIUser } from '../api'
import { APIResponse } from '../api/base'
import { User } from '../models/User'
import { getError } from '../utils'

@model('carbonPath/UserStore')
export default class UserStore extends Model({
  me: prop<User | null>(null),
  balance: prop<string>(''),
}) {
  @observable
  loading = false

  @modelFlow
  fetchMe = _async(function* (this: UserStore, token: string) {
    this.loading = true
    try {
      const {
        response: { entities: userData },
      } = yield* _await(api.fetchMe(token) as Promise<APIResponse>)
      this.me = userData
    } catch (e) {
      console.debug('[DEBUG]', e)
      getError(e as unknown as Error)
    }
    this.loading = false
  })

  @modelFlow
  updateMe = _async(function* (this: UserStore, token: string, data: Partial<APIUser>) {
    this.loading = true
    try {
      const {
        response: { entities: userData },
      } = yield* _await(api.updateMe(token, data) as Promise<APIResponse>)
      this.me = userData
    } catch (e) {
      console.debug('[DEBUG]', e)
      getError(e as unknown as Error)
    }
    this.loading = false
  })

  @modelAction
  setBalance = (balance: string): void => {
    this.balance = balance
  }
}
