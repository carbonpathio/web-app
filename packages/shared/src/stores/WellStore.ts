import { action, observable } from 'mobx'
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
import { APIWellList, APIWellMint, APIWellTokenRetire } from '../api'
import { APIResponse } from '../api/base'
import { APIIpfsAssetData } from '../api/ipfs'
import Well from '../models/Well'
import { getError, getSuccess } from '../utils'
import RootStore from './RootStore'

@model('carbonPath/WellStore')
export default class WellStore extends Model({
  wells: prop(() => objectMap<Well>()),
}) {
  @observable
  loading = false

  @observable
  updatedWell = false

  @observable
  showSaved = false

  @action
  triggerUpdatedWell(): void {
    this.updatedWell = !this.updatedWell
  }

  @action
  toggleShowSavedWells(): void {
    this.showSaved = !this.showSaved
  }

  @modelAction
  createOrUpdateWell(data: ModelCreationData<Well>): void {
    const id = `${data.id}`
    if (this.wells.has(id)) {
      this.wells.get(id)?.update(data)
    } else {
      const condition = new Well(data)
      this.wells.set(id, condition)
      condition.update(data)
    }
  }

  @modelAction
  removeWell(id: number): void {
    this.wells.delete(`${id}`)
  }

  @modelAction
  resetSavedWell(): void {
    Array.from(this.wells.keys()).forEach((key) => {
      const well = this.wells.get(key)
      if (well) {
        well.update({ ...well.$, isSavedWell: false })
      }
    })
  }

  @modelFlow
  fetchWell = _async(function* (this: WellStore, wellId: number) {
    this.loading = true

    try {
      const {
        response: { entities },
      } = yield* _await(api.fetchWell(wellId) as Promise<APIResponse>)

      this.createOrUpdateWell(entities)
      this.triggerUpdatedWell()
      this.loading = false
      return getSuccess(entities)
    } catch (error: any) {
      console.warn('[DEBUG] error fetching Wells', error)
      this.loading = false
      return getError(error)
    }
  })

  @modelFlow
  fetchWells = _async(function* (this: WellStore, page?: number, limit?: number) {
    this.loading = true
    try {
      const {
        response: { entities },
      } = yield* _await(api.fetchWells(page, limit) as Promise<APIResponse>)
      const { results } = entities as APIWellList
      this.wells.clear()
      results.map((well) => this.createOrUpdateWell(well))
    } catch (error: any) {
      console.warn('[DEBUG] error fetching Wells', error)
      this.loading = false
      return getError(error)
    }

    this.loading = false
    return getSuccess()
  })

  @modelFlow
  fetchMintedWells = _async(function* (this: WellStore, page?: number, limit?: number) {
    this.loading = true
    try {
      const {
        response: { entities },
      } = yield* _await(api.fetchMintedWells(page, limit) as Promise<APIResponse>)
      const { results } = entities as APIWellList
      // this.wells.clear()
      results.map((well) => this.createOrUpdateWell(well))
    } catch (error: any) {
      console.warn('[DEBUG] error fetching Wells', error)
      this.loading = false
      return getError(error)
    }

    this.loading = false
    return getSuccess()
  })

  @modelFlow
  fetchWellStatistics = _async(function* (this: WellStore) {
    this.loading = true
    try {
      const {
        response: { entities },
      } = yield* _await(api.fetchWellStatistics() as Promise<APIResponse>)

      this.loading = false
      return getSuccess(entities)
    } catch (error: any) {
      console.warn('[DEBUG] error fetching Wells', error)
      this.loading = false
      return getError(error)
    }
  })

  @modelFlow
  ipfs = _async(function* (this: WellStore, wellId: number) {
    this.loading = true

    const rootStore = getRoot<RootStore>(this)

    if (!rootStore || !rootStore.authStore.token) {
      this.loading = false
      return
    }

    try {
      const {
        response: { entities },
      } = yield* _await(api.ipfs(wellId, rootStore.authStore.token) as Promise<APIResponse>)
      this.loading = false
      return getSuccess(entities as APIIpfsAssetData)
    } catch (error: any) {
      console.warn('[DEBUG] error fetching Wells', error)
      this.loading = false
      return getError(error)
    }
  })

  @modelFlow
  mint = _async(function* (this: WellStore, wellId: number, data: APIWellMint) {
    this.loading = true

    const rootStore = getRoot<RootStore>(this)

    if (!rootStore || !rootStore.authStore.token) {
      this.loading = false
      return
    }

    try {
      const {
        response: { entities },
      } = yield* _await(api.mint(wellId, rootStore.authStore.token, data) as Promise<APIResponse>)
      this.loading = false
      return getSuccess(entities as APIWellMint)
    } catch (error: any) {
      console.warn('[DEBUG] error fetching Wells', error)
      this.loading = false
      return getError(error)
    }
  })

  @modelFlow
  retire = _async(function* (this: WellStore, wellId: number, data: APIWellTokenRetire) {
    this.loading = true

    const rootStore = getRoot<RootStore>(this)

    if (!rootStore || !rootStore.authStore.token) {
      this.loading = false
      return
    }

    try {
      const {
        response: { entities },
      } = yield* _await(api.retire(wellId, rootStore.authStore.token, data) as Promise<APIResponse>)
      this.loading = false
      return getSuccess(entities as APIWellTokenRetire)
    } catch (error: any) {
      console.warn('[DEBUG] error fetching Wells', error)
      this.loading = false
      return getError(error)
    }
  })

  @modelFlow
  saveWell = _async(function* (this: WellStore, wellId: number) {
    this.loading = true

    const rootStore = getRoot<RootStore>(this)

    if (!rootStore || !rootStore.authStore.token) {
      this.loading = false
      return
    }

    try {
      const {
        response: { entities },
      } = yield* _await(api.saveWell(wellId, rootStore.authStore.token) as Promise<APIResponse>)

      this.createOrUpdateWell(entities)
      this.triggerUpdatedWell()
      return getSuccess(entities)
    } catch (error: any) {
      console.warn('[DEBUG] error adding to Saved Wells', error)
      this.loading = false
      return getError(error)
    }
  })

  @modelFlow
  removeSavedWell = _async(function* (this: WellStore, wellId: number) {
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
        api.removeSavedWell(wellId, rootStore.authStore.token) as Promise<APIResponse>
      )
      this.createOrUpdateWell(entities)
      this.triggerUpdatedWell()
      this.loading = false
      return getSuccess(entities)
    } catch (error: any) {
      console.warn('[DEBUG] error removing Saved Well', error)
      this.loading = false
      return getError(error)
    }
  })

  @modelFlow
  isSavedWell = _async(function* (this: WellStore, wellId: number) {
    this.loading = true

    const rootStore = getRoot<RootStore>(this)

    if (!rootStore || !rootStore.authStore.token) {
      this.loading = false
      return
    }

    try {
      const {
        response: { entities },
      } = yield* _await(api.isSavedWell(wellId, rootStore.authStore.token) as Promise<APIResponse>)
      this.loading = false

      return getSuccess(entities)
    } catch (error: any) {
      console.warn('[DEBUG] error checking if Saved Well', error)
      this.loading = false
      return getError(error)
    }
  })
  @modelFlow
  mySavedWells = _async(function* (this: WellStore) {
    this.loading = true

    const rootStore = getRoot<RootStore>(this)

    if (!rootStore || !rootStore.authStore.token) {
      this.loading = false
      return
    }

    try {
      const {
        response: { entities },
      } = yield* _await(api.mySavedWells(rootStore.authStore.token) as Promise<APIResponse>)
      this.loading = false
      const { results } = entities as APIWellList
      this.triggerUpdatedWell()
      results.map((well) => this.createOrUpdateWell(well))
      return getSuccess(entities)
    } catch (error: any) {
      console.warn('[DEBUG] error getting Saved Wells', error)
      this.loading = false
      return getError(error)
    }
  })
}
