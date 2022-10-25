import Script from 'next/script'
import React, { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import MarketplaceMobileHeader from '../../widgets/MarketplaceMobileHeader'
import MarketPlaceNavBar from '../../widgets/MarketplaceNavBar'
import Layout from '../Layout'

type Props = {
  activeButton: string
  setActiveButton: Dispatch<SetStateAction<string>>
  handleConnect: () => {}
  handleLogout: () => {}
}

const MarketplaceLayout: React.FC<PropsWithChildren<Props>> = ({
  children,
  activeButton,
  setActiveButton,
  handleConnect,
  handleLogout,
}) => {
  return (
    <Layout>
      <Script src="./TW-ELEMENTS-PATH/dist/js/index.min.js"></Script>

      <div className="flex flex-col h-screen w-screen md:flex-row">
        <div className="block h-[90px] w-screen md:hidden">
          <MarketplaceMobileHeader activeButton={activeButton} />
        </div>
        <div className="hidden md:h-full md:block">
          <MarketPlaceNavBar
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            handleConnect={handleConnect}
            handleLogout={handleLogout}
          />
        </div>
        <main className="flex-col flex-1 overflow-y-auto tracking-wide md:h-full">{children}</main>
        <div className="block h-[90px] w-full md:hidden">
          <MarketPlaceNavBar
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            handleConnect={handleConnect}
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </Layout>
  )
}

export default MarketplaceLayout
