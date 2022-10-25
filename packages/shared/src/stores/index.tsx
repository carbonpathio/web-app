import { onSnapshot, registerRootStore } from 'mobx-keystone'
import React from 'react'
import AlertStore from './AlertStore'
import AuthenticationStore from './AuthenticationStore'
import FaqStore from './FaqStore'

import RootStore, { RootStoreConfig } from './RootStore'
import TokenTransactionStore from './TokenTransactionStore'
import UserStore from './UserStore'
import WellStore from './WellStore'

const StoreContext = React.createContext<RootStore>({} as RootStore)

const useStore = (): RootStore => React.useContext(StoreContext)
const { Provider: StoreProvider } = StoreContext

function createRootStore(config: RootStoreConfig = {}): RootStore {
  const authStore = new AuthenticationStore({})
  const alertStore = new AlertStore({})
  const faqStore = new FaqStore({})
  const tokenTransactionStore = new TokenTransactionStore({})
  const userStore = new UserStore({})
  const wellStore = new WellStore({})

  const rootStore = new RootStore({
    authStore,
    alertStore,
    faqStore,
    tokenTransactionStore,
    userStore,
    wellStore,
  })
  rootStore.config = config

  registerRootStore(rootStore)

  onSnapshot(rootStore, (newSnapshot, prevSnapshot) => {
    if (config.onSnapshot) config.onSnapshot(newSnapshot, prevSnapshot)
  })

  return rootStore
}

export { RootStore, StoreContext, StoreProvider, createRootStore, useStore }
