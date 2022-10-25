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
  getRoot,
} from 'mobx-keystone'

import * as api from '../api'
import { APIAlertList, APIAlertType, APIBoolAlert, APISubscribe } from '../api'
import { APIResponse } from '../api/base'
import Alert from '../models/Alert'
import { getError, getSuccess } from '../utils'
import RootStore from './RootStore'

@model('carbonPath/AlertStore')
export default class AlertStore extends Model({
  alerts: prop(() => objectMap<Alert>()),
}) {
  @observable
  loading = false

  @modelAction
  createOrUpdateAlert(data: ModelCreationData<Alert>) {
    const id = `${data.id}`
    if (this.alerts.has(id)) {
      this.alerts.get(id)?.update(data)
    } else {
      const condition = new Alert(data)
      this.alerts.set(id, condition)
      condition.update(data)
    }
    return true
  }

  @modelAction
  removeAlert(id: number) {
    this.alerts.delete(`${id}`)
    return true
  }

  @modelFlow
  fetchAlertsMine = _async(function* (this: AlertStore, apiToken: string, page?: number, limit?: number) {
    this.loading = true
    try {
      const {
        response: { entities },
      } = yield* _await(api.fetchAlertsMine(page, limit, apiToken) as Promise<APIResponse>)
      const { results } = entities as APIAlertList
      this.alerts.clear()
      results.map((alert) => this.createOrUpdateAlert(alert))
    } catch (error: any) {
      console.warn('[DEBUG] error fetching Alerts', error)
      return getError(error)
    }

    this.loading = false
    return getSuccess()
  })

  @modelFlow
  readAlertsMine = _async(function* (this: AlertStore, apiToken: string, page?: number, limit?: number) {
    this.loading = true
    try {
      const {
        response: { entities },
      } = yield* _await(api.readAlertsMine(page, limit, apiToken) as Promise<APIResponse>)
    } catch (error: any) {
      console.warn('[DEBUG] error marking Alerts as read', error)
      return getError(error)
    }

    this.loading = false
    return getSuccess()
  })

  @modelFlow
  clearAlertsMine = _async(function* (this: AlertStore, apiToken: string, page?: number, limit?: number) {
    this.loading = true
    try {
      const {
        response: { entities },
      } = yield* _await(api.clearAlertsMine(page, limit, apiToken) as Promise<APIResponse>)
    } catch (error: any) {
      console.warn('[DEBUG] error DELETING Alerts', error)
      return getError(error)
    }

    this.loading = false
    return getSuccess()
  })

  @modelFlow
  subscribeAlert = _async(function* (this: AlertStore, data: APISubscribe) {
    this.loading = true

    const rootStore = getRoot<RootStore>(this)

    if (!rootStore || !rootStore.authStore.token) {
      this.loading = false
      return
    }

    try {
      const {
        response: { entities },
      } = yield* _await(api.subscribeAlert(rootStore.authStore.token, data) as Promise<APIResponse>)
      this.loading = false
      return getSuccess(entities as APIAlertType[])
    } catch (error: any) {
      console.warn('[DEBUG] error subscribing to Alert', error)
      this.loading = false
      return getError(error)
    }
  })

  @modelFlow
  unsubscribeAlert = _async(function* (this: AlertStore, data: APISubscribe) {
    this.loading = true

    const rootStore = getRoot<RootStore>(this)

    if (!rootStore || !rootStore.authStore.token) {
      this.loading = false
      return
    }

    try {
      const {
        response: { entities },
      } = yield* _await(api.unsubscribeAlert(rootStore.authStore.token, data) as Promise<APIResponse>)
      this.loading = false
      return getSuccess(entities as APIAlertType[])
    } catch (error: any) {
      console.warn('[DEBUG] error unsubscribing to Alert', error)
      this.loading = false
      return getError(error)
    }
  })

  @modelFlow
  isSubscribedAlert = _async(function* (this: AlertStore, data: APISubscribe) {
    this.loading = true

    const rootStore = getRoot<RootStore>(this)

    if (!rootStore || !rootStore.authStore.token) {
      this.loading = false
      return
    }

    try {
      const {
        response: { entities },
      } = yield* _await(api.isSubscribedAlert(rootStore.authStore.token, data) as Promise<APIResponse>)
      this.loading = false
      return getSuccess(entities as APIBoolAlert)
    } catch (error: any) {
      console.warn('[DEBUG] error checking if is subscribed to Alert', error)
      this.loading = false
      return getError(error)
    }
  })
}
