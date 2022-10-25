import { observable } from 'mobx'
import { getRoot, model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone'
import * as api from '../api'
import {
  APIGetNonceReq,
  APIGetNonceResult,
  APILoginInput,
  APILoginResult,
} from '../api/authentication'
import { removeAuthToken, setAuthToken } from '../api/localStorage'
import { getError, getSuccess } from '../utils'
import RootStore from './RootStore'

@model('carbonPath/AuthenticationStore')
export default class AuthenticationStore extends Model({
  token: prop<string | null>(null),
}) {
  @observable
  loading = false

  @modelFlow
  getNonce = _async(function* (this: AuthenticationStore, data: APIGetNonceReq) {
    this.loading = true

    let entities: APIGetNonceResult
    try {
      ;({
        response: { entities },
      } = yield* _await(api.getNonce(data)))
    } catch (error) {
      console.warn('[DEBUG] Wallet Login error', error)
      return getError(error as Error)
    }
    this.loading = false
    return getSuccess(entities)
  })

  @modelFlow
  login = _async(function* (this: AuthenticationStore, data: APILoginInput) {
    this.loading = true
    const rootStore = getRoot<RootStore>(this)

    let entities: APILoginResult
    try {
      ;({
        response: { entities },
      } = yield* _await(api.login(data)))

      const { token } = entities
      this.token = token
      yield* _await(setAuthToken(token))
      yield* _await(rootStore.userStore.fetchMe(token))
    } catch (error) {
      console.warn('[DEBUG] Wallet Login error', error)
      return getError(error as Error)
    }

    this.loading = false
  })

  @modelFlow
  logout = _async(function* (this: AuthenticationStore) {
    const rootStore = getRoot<RootStore>(this)

    if (!this.token) {
      _await(removeAuthToken())
      return
    }

    try {
      yield* _await(api.logout(this.token as string))
    } catch (error) {
      console.debug('[DEBUG] Logout Error', error)
    }
    this.token = ''
    _await(removeAuthToken())
    rootStore.reset()
  })
}
