import { useStore } from '@carbonpath/shared/lib/stores'
import { useCelo } from '@celo/react-celo'
import classNames from 'classnames'
import Humanize from 'humanize-plus'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAsync } from 'react-use'
import ChecklistIcon from '../../../assets/icons/ChecklistIcon'
import { MIN_SWIPE_DISTANCE } from '../../../constants/swipe'
import { MIN_DESKTOP_WIDTH } from '../../../constants/width'
import useWindowSize from '../../../hooks/useWindowSize'
import Button from '../../atoms/Button'
import MobileSliderModal from '../../atoms/MobileSliderModal'
import TableDisplay from '../../atoms/TableDisplay'

interface Props {
  className: string
  finalFiltered: object[]
  setCurrentActiveMarker: Dispatch<SetStateAction<number>>
  alertsToggle: boolean
  showAddAlert: boolean
  alertLoc: string
}

const MarketplaceSearchResults: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  finalFiltered,
  setCurrentActiveMarker,
  alertsToggle,
  showAddAlert,
  alertLoc,
}) => {
  const windowSize = useWindowSize()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [alertAddOrRemove, setAlertAddOrRemove] = useState('addAlert')
  const [activeEmail, setActiveEmail] = useState('')
  const width = useWindowSize().width
  const [resultEAVs, setResultEAVs] = useState('0')
  const [totalEAVs, setTotalEAVs] = useState('0')
  const [totalRetired, setTotalRetired] = useState('0')
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const { alertStore, userStore, authStore, wellStore } = useStore()
  const { address } = useCelo()
  const isLogin = !!address && !!authStore.token

  useEffect(() => {
    if (finalFiltered.length) {
      setSearchResults(() =>
        finalFiltered[1]['filterItems'].map((item) => {
          return {
            id: item.id,
            name: item.name,
            tonnesOfCO2: item.tokensMinted,
            location: item.location,
            retiredAmount: item.retiredAmount,
            isSavedWell: item.isSavedWell,
            action: (
              <div
                className="cursor-pointer font-lato text-sm hover:underline"
                onClick={() => {
                  setCurrentActiveMarker(item.id)
                  setShowResults(false)
                }}
              >
                {'View Now'}
              </div>
            ),
          }
        })
      )
    }
  }, [finalFiltered, setCurrentActiveMarker, wellStore.updatedWell])

  useAsync(async () => {
    if (alertLoc) {
      // Checks if is-subscribed to location_AlertType
      const checkAlert = await alertStore.isSubscribedAlert({
        name: alertLoc,
        type: 'Location',
      })
      setIsSubscribed(checkAlert.extra.result)
      if (isSubscribed) setAlertAddOrRemove('removeAlert')
      if (!isSubscribed) setAlertAddOrRemove('addAlert')
    }
  }, [showAddAlert, alertStore, isSubscribed, setIsSubscribed])

  useAsync(async () => {
    if (isLogin && alertLoc) {
      await userStore.fetchMe(authStore.token)
      setActiveEmail(userStore.me.email)
    } else setActiveEmail('')
  }, [isLogin, alertLoc, activeEmail])

  useAsync(async () => {
    const res = await wellStore.fetchWellStatistics()
    if (res.ok && res.extra) {
      const totalEavs = res.extra.totalAdvancedEavs + res.extra.totalBufferPoolEavs

      const eavList = searchResults.map((result) => result.tonnesOfCO2)

      setResultEAVs(
        Humanize.formatNumber(
          eavList.reduce((a, b) => a + b, 0),
          0
        )
      )
      setTotalEAVs(Humanize.formatNumber(totalEavs, 0))
      setTotalRetired(Humanize.formatNumber(res.extra.totalCarbonRetired, 3))
    }
  }, [showResults, searchResults])

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientY)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance < -MIN_SWIPE_DISTANCE) setIsModalOpen(false)
  }

  return (
    <div className={className}>
      {windowSize.width > MIN_DESKTOP_WIDTH ? (
        <div className="flex flex-row items-end justify-start w-full pointer-events-none">
          {showResults ? (
            <>
              <TableDisplay
                className="flex-[4] pr-4 max-h-96 pointer-events-auto"
                headerData={[
                  `Results (${searchResults.length})`,
                  'Tonnes of CO2',
                  'Retired Tokens',
                  'Location',
                ]}
                headerVarNames={['id', 'tonnesOfCO2', 'retiredAmount', 'location', 'action']}
                bodyData={searchResults}
                show={showResults}
                setShow={setShowResults}
                alertAddOrRemove={alertAddOrRemove}
                setAlertAddOrRemove={setAlertAddOrRemove}
                showAddAlert={showAddAlert}
                alertLoc={alertLoc}
                activeEmail={activeEmail}
                setActiveEmail={setActiveEmail}
              />
              <TableDisplay
                className="hidden md:flex flex-[1] max-h-96 pointer-events-auto"
                headerData={[
                  'Results (TCO2)',
                  'Total Carbon Supply',
                  // 'Total Liquidity',
                  'Total carbon retired (TCO2)',
                ]}
                headerVarNames={['name', 'tonnesOfCO2', 'location', 'status', 'action']}
                bodyData={[[resultEAVs, totalEAVs, totalRetired]]}
                type="summary"
                alertAddOrRemove={alertAddOrRemove}
                setAlertAddOrRemove={setAlertAddOrRemove}
                showAddAlert={showAddAlert}
                alertLoc={alertLoc}
                activeEmail={activeEmail}
                setActiveEmail={setActiveEmail}
              />
            </>
          ) : (
            <Button
              variant="white"
              className="pointer-events-auto flex flex-row justify-center items-center py-3 px-6"
              onClick={() => setShowResults(true)}
            >
              <ChecklistIcon className="mr-5" width={16} height={16} />
              <div className="font-lato font-bold text-carbon-path-bluestroke">{`Show all results (${searchResults.length})`}</div>
            </Button>
          )}
        </div>
      ) : (
        <>
          <MobileSliderModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            width={100}
            height={60}
            measure={'%'}
            animation={'slideUp'}
            className="flex flex-col justify-between items-center px-3 py-2 pointer-events-auto"
          >
            <div
              className="w-full flex flex-col justify-between items-center"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="border-[#9EA1AE] border-2 rounded-lg w-8" />
              <h4
                className={classNames(
                  'font-lato font-bold text-[28px] text-[#333333] leading-[40px] tracking-[0.02em] pt-6',
                  {
                    hidden:
                      width < MIN_DESKTOP_WIDTH &&
                      alertAddOrRemove !== 'addAlert' &&
                      alertAddOrRemove !== 'removeAlert',
                  }
                )}
              >{`Results (${searchResults.length})`}</h4>
            </div>
            <TableDisplay
              className="w-full"
              headerData={[
                `Results (${searchResults.length})`,
                'Tonnes of CO2',
                'Retired Tokens',
                'Location',
                '',
                '',
                '',
              ]}
              headerVarNames={['id', 'tonnesOfCO2', 'retiredAmount', 'location']}
              bodyData={searchResults}
              onExpandClick={(id: number) => {
                setCurrentActiveMarker(id)
                setIsModalOpen(false)
              }}
              alertAddOrRemove={alertAddOrRemove}
              setAlertAddOrRemove={setAlertAddOrRemove}
              showAddAlert={showAddAlert}
              alertLoc={alertLoc}
              activeEmail={activeEmail}
              setActiveEmail={setActiveEmail}
            />
          </MobileSliderModal>
          <Button
            variant="cyan"
            className={classNames(
              'mt-4 z-0 md:hidden font-montserrat font-bold text-lg w-full pointer-events-auto',
              {
                hidden: alertsToggle,
              }
            )}
            onClick={() => setIsModalOpen(true)}
          >
            SEE ALL RESULTS
          </Button>
        </>
      )}
    </div>
  )
}

export default MarketplaceSearchResults
