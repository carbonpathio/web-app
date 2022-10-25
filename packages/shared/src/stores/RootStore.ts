import { Model, model, modelFlow, prop, SnapshotOutOfModel, _async, _await } from 'mobx-keystone'

import api from '../api'
import AlertStore from './AlertStore'
import AuthenticationStore from './AuthenticationStore'
import FaqStore from './FaqStore'
import TokenTransactionStore from './TokenTransactionStore'
import UserStore from './UserStore'
import WellStore from './WellStore'
export interface RootStoreConfig {
  loadStorage?: () => Promise<SnapshotOutOfModel<RootStore> | null>
  onReset?: (rootStore: RootStore) => Promise<void>
  onSnapshot?: (
    snapshot: SnapshotOutOfModel<RootStore>,
    prevSnapshot: SnapshotOutOfModel<RootStore>
  ) => Promise<SnapshotOutOfModel<RootStore> | null>
}

@model('carbonPath/RootStore')
export default class RootStore extends Model({
  loading: prop<boolean>(true),
  alertStore: prop<AlertStore>(),
  authStore: prop<AuthenticationStore>(),
  faqStore: prop<FaqStore>(),
  tokenTransactionStore: prop<TokenTransactionStore>(),
  userStore: prop<UserStore>(),
  wellStore: prop<WellStore>(),
}) {
  config!: RootStoreConfig

  @modelFlow
  load = _async(function* (this: RootStore) {
    this.loading = true
    const storedToken = yield* _await(api.localStorage.getAuthToken())
    if (storedToken) {
      this.authStore.token = storedToken
      try {
        yield* _await(this.userStore.fetchMe(storedToken))
        yield* _await(this.wellStore.mySavedWells())
      } catch (e) {
        console.debug('Failed to fetch user')
      }
    }

    this.loading = false
  })

  @modelFlow
  reset = _async(function* (this: RootStore) {
    this.loading = true
    if (this.config.onReset) {
      yield* _await(this.config.onReset(this))
    }
    this.alertStore = new AlertStore({})
    this.tokenTransactionStore = new TokenTransactionStore({})
    this.userStore = new UserStore({})

    //Reset Saved Wells
    this.wellStore.resetSavedWell()
    this.wellStore.showSaved = false

    this.loading = false
  })
}
