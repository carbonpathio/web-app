import { Alfajores, CeloProvider, SupportedProviders } from '@celo/react-celo'
import '@celo/react-celo/lib/styles.css'
import { AppProps } from 'next/app'
import Script from 'next/script'
import '../../styles/globals.css'

import config from '@carbonpath/shared/lib/config'
import { createRootStore, StoreProvider } from '@carbonpath/shared/lib/stores'
import { useEffect, useRef } from 'react'
import storage, { storageKeySnapshot } from '../utils/storage'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const rootStoreRef = useRef(
    createRootStore({
      loadStorage() {
        return storage.getItem(storageKeySnapshot)
      },

      onReset() {
        return storage.clear()
      },

      onSnapshot(snapshot) {
        return storage.setItem(storageKeySnapshot, snapshot)
      },
    })
  )
  const rootStore = rootStoreRef.current

  useEffect(() => {
    storage.ready(() => {
      rootStore.load()
    })
  }, [rootStore])

  return (
    <CeloProvider
      dapp={{
        icon: 'public/favicon.ico',
        name: 'Carbon Path',
        description: 'Carbon Path App',
        url: `${config.urls.web}`,
      }}
      defaultNetwork={'Alfajores'}
      networks={[Alfajores]}
      connectModal={{
        providersOptions: {
          // This option hides specific wallets from the default list
          hideFromDefaults: [
            SupportedProviders.CeloExtensionWallet,
            SupportedProviders.CeloTerminal,
            SupportedProviders.CeloWallet,
            SupportedProviders.CeloDance,
            SupportedProviders.Injected,
            SupportedProviders.Ledger,
            // SupportedProviders.MetaMask,
            SupportedProviders.PrivateKey,
            // SupportedProviders.WalletConnect,
            SupportedProviders.Steakwallet,
            SupportedProviders.CoinbaseWallet,
          ],
        },
      }}
    >
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${config.google.measurementId}`}
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${config.google.measurementId}', {
          page_path: window.location.pathname,
          });
      `}
      </Script>

      <StoreProvider value={rootStore}>
        <Component {...pageProps} />
      </StoreProvider>
    </CeloProvider>
  )
}

export default MyApp
