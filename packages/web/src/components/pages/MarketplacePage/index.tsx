import config from '@carbonpath/shared/lib/config'
import Well from '@carbonpath/shared/lib/models/Well'
import { useStore } from '@carbonpath/shared/lib/stores'
import { MiniContractKit } from '@celo/contractkit/lib/mini-kit'
import { useCelo } from '@celo/react-celo'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { MapRef } from 'react-map-gl'
import { useAsync } from 'react-use'
import BuyIcon from '../../../assets/icons/BuyIcon'
import { MIN_DESKTOP_WIDTH } from '../../../constants/width'
import useWindowSize from '../../../hooks/useWindowSize'
import { getTokenBalance } from '../../../utils/contractkit/token'
import Button from '../../atoms/Button'
import CollapsibleDisplay from '../../atoms/CollapsibleDisplay'
import MarketplaceLayout from '../../layout/MarketplaceLayout'
import MarketplaceMap from '../../widgets/MarketplaceMap'
import MarketplaceQuickBuy from '../../widgets/MarketplaceQuickBuy'
import BuyPage from './BuyPage'
import ExplorePage from './ExplorePage'
import ImpactPage from './ImpactPage'
import OffsetPage from './OffsetPage'
import RetirePage from './RetirePage'

const MarketplacePage: React.FC = () => {
  const { authStore, userStore, wellStore } = useStore()
  const windowSize = useWindowSize()
  const [activeButton, setActiveButton] = useState('explore')
  const mapRef = useRef<MapRef>(undefined)
  const [mapReady, setMapReady] = useState(false)
  const [currentActiveMarker, setCurrentActiveMarker] = useState(-1)
  const { performActions, connect, destroy, address } = useCelo()
  const router = useRouter()
  const [isLogging, setIsLogging] = useState(false)
  const isProd = config.appConfig === 'prod'

  const [filterData, setFilterData] = useState([])
  const [filterDropdownData, setFilterDropdownData] = useState([])
  const [finalFiltered, setFinalFiltered] = useState([...filterData])
  const [wells, setWells] = useState([])
  const isLogin = !!address && !!authStore.token

  const [buyState, setBuyState] = useState('input') // input, processing, success, error
  const [buyOverride, setBuyOverride] = useState(false)
  const [retireFromMarker, setRetireFromMarker] = useState<Well>()

  const handleMapReady = () => {
    setMapReady(true)
  }
  const handleConnect = async () => {
    try {
      setIsLogging(true)
      await connect()
    } catch (e) {
      await destroy()
      await authStore.logout()
      setIsLogging(false)
      console.debug(e)
    }
  }

  const handleLogout = async () => {
    try {
      await destroy()
      await authStore.logout()
    } catch (e) {
      console.log(e)
    }
  }

  const containsObject = (arr, obj) => {
    let ret = false
    for (let i = 0; i < arr.length; i++) {
      if (_.isEqual(arr[i], obj)) {
        ret = true
        break
      }
    }
    return ret
  }

  useEffect(() => {
    ;(async () => {
      await wellStore.fetchMintedWells()
      const newWells: any = []
      wellStore.wells.forEach((newWell) => {
        newWells.push(newWell)
      })
      setWells(newWells)
    })()
  }, [wellStore, wellStore.updatedWell])

  useAsync(async () => {
    if (!!address && !isLogin) {
      try {
        await performActions(async (kit: MiniContractKit) => {
          const address = kit.connection.defaultAccount
          const res = await authStore.getNonce({ walletAddress: address })
          if (res.ok) {
            const nonce = res.extra.nonce as string
            const hashed = kit.connection.web3.utils.fromUtf8(
              `I'm verifying my CarbonPath Login Nonce: ${nonce}`
            )
            const {
              connection: { defaultAccount: walletToken },
            } = kit
            let signature: string
            try {
              signature = await kit.connection.web3.eth.personal.sign(hashed, walletToken, '')
              await authStore.login({
                walletAddress: address,
                signature: signature,
                message: `I'm verifying my CarbonPath Login Nonce: ${nonce}`,
              })
            } catch (error) {
              console.debug('[DEBUG]', error)
              throw new Error(JSON.stringify({ details: 'Signature verification failed' }))
            }
            await wellStore.mySavedWells()
          }
        })
      } catch (e) {
        await destroy()
        await authStore.logout()
        setIsLogging(false)
        console.debug(e)
      }
      setIsLogging(false)
    }
  }, [address, isLogin, performActions])

  useEffect(() => {
    let location = []
    let well = []
    let type = []
    let source = []

    wells.map((item, index) => {
      if (!containsObject(well, item)) {
        well.push(item)
      }

      if (item['location']) {
        let wellLocation = { name: item['location'] }
        if (!containsObject(location, wellLocation)) {
          location.push(wellLocation)
        }
      }

      if (item['type']) {
        item['type'].forEach((typeItem) => {
          if (type.indexOf(typeItem) === -1) {
            type.push(typeItem)
          }
        })
      }

      if (item['source']) {
        item['source'].forEach((sourceItem) => {
          if (source.indexOf(sourceItem) === -1) {
            source.push(sourceItem)
          }
        })
      }
    })
    const filters = [
      { filterName: 'locations', filterItems: location },
      { filterName: 'wells', filterItems: well },
    ]
    const filterDropdowns = [
      { filterName: 'type', filterItems: type },
      { filterName: 'source', filterItems: source },
    ]
    setFilterData(filters)
    setFilterDropdownData(filterDropdowns)
  }, [wells])

  const handleBalance = async () => {
    try {
      const tokenBalance = await getTokenBalance(performActions)
      userStore.setBalance(tokenBalance)
    } catch (e) {
      console.log(e)
    }
  }

  useAsync(async () => {
    if (isProd) {
      router.push('/')
      return
    }
    if (!isLogin) {
      return
    }

    await handleBalance()
  }, [address, authStore.token, isProd, router])

  if (isProd) {
    return null
  }
  return (
    <MarketplaceLayout
      activeButton={activeButton}
      setActiveButton={setActiveButton}
      handleConnect={handleConnect}
      handleLogout={handleLogout}
    >
      <div className="relative h-full md:h-screen">
        <MarketplaceMap
          mapRef={mapRef}
          onMapReady={handleMapReady}
          currentActiveMarker={currentActiveMarker}
          setCurrentActiveMarker={setCurrentActiveMarker}
          finalFiltered={finalFiltered}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          setRetireFromMarker={setRetireFromMarker}
        />
        {!!isLogin ? (
          <>
            <div
              onClick={() => {
                if (windowSize.width < MIN_DESKTOP_WIDTH) handleLogout()
              }}
              className="absolute top-10 w-5/6 mx-[10%] mb-8 px-6 py-4 rounded-xl flex items-center bg-carbon-path-lightgray font-lato font-bold text-[16px] leading-5 text-carbon-path-bluestroke md:right-3 md:max-w-[280px] md:mx-0"
            >
              <span className="mr-1">Available tokens:</span>
              <span className="font-[500]">{userStore.balance}</span>
            </div>
            <div className="hidden md:block">
              <div className="absolute flex flex-col top-[6.5rem] right-3 z-10 w-auto bg-transparent rounded-xl font-lato font-bold text-[16px] leading-5 tracking-normal md:w-[280px]">
                <CollapsibleDisplay
                  headerData="Quick Buy"
                  headerClassName="py-4 font-lato font-bold text-[16px] leading-5 tracking-normal"
                  icon={<BuyIcon width={48} height={48} />}
                  className="accordion-mp"
                  buyAffect={true}
                  buyOpen={buyOverride}
                  setBuyOpen={setBuyOverride}
                >
                  <div className="rounded-b-xl py-6 px-5 bg-white text-[#333333]">
                    <MarketplaceQuickBuy
                      buyState={buyState}
                      setBuyState={setBuyState}
                      setActiveButton={setActiveButton}
                    />
                  </div>
                </CollapsibleDisplay>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute top-10 w-full px-10 md:right-3 md:block md:w-auto md:mx-0">
            <Button onClick={handleConnect} className="w-full" variant="cyan">
              <span className="font-montserrat uppercase font-bold text-carbon-path-bluestroke">
                {isLogging ? 'Logging In...' : 'Connect Wallet'}
              </span>
            </Button>
          </div>
        )}

        {
          {
            explore: (
              <ExplorePage
                mapRef={mapRef}
                mapReady={mapReady}
                setCurrentActiveMarker={setCurrentActiveMarker}
                filterData={filterData}
                filterDropdownData={filterDropdownData}
                finalFiltered={finalFiltered}
                setFinalFiltered={setFinalFiltered}
              />
            ),
            retire: (
              <RetirePage
                setActiveButton={setActiveButton}
                mapRef={mapRef}
                mapReady={mapReady}
                setCurrentActiveMarker={setCurrentActiveMarker}
                retireFromMarker={retireFromMarker}
                setRetireFromMarker={setRetireFromMarker}
              />
            ),
            offset: <OffsetPage />,
            impact: (
              <ImpactPage setActiveButton={setActiveButton} setBuyOverride={setBuyOverride} />
            ),
            buy: (
              <BuyPage
                signOut={handleLogout}
                signIn={handleConnect}
                buyState={buyState}
                setBuyState={setBuyState}
                setActiveButton={setActiveButton}
              />
            ),
          }[activeButton]
        }
      </div>
    </MarketplaceLayout>
  )
}
export default observer(MarketplacePage)
