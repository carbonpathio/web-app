import { useStore } from '@carbonpath/shared/lib/stores'
import { useCelo } from '@celo/react-celo'
import classNames from 'classnames'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { useAsync } from 'react-use'
import BellIcon from '../../../assets/icons/BellIcon'
import BellWithNotifIcon from '../../../assets/icons/BellWithNotifIcon'
import { MIN_SWIPE_DISTANCE } from '../../../constants/swipe'
import { MIN_DESKTOP_WIDTH } from '../../../constants/width'
import useWindowSize from '../../../hooks/useWindowSize'
import Button from '../../atoms/Button'
import MobileSliderModal from '../../atoms/MobileSliderModal'
import AlertNotification from './AlertNotification'
type Props = {
  className?: string
  alertsToggle: boolean
  setAlertsToggle: Dispatch<SetStateAction<boolean>>
  alertOpen: boolean
  setAlertOpen: Dispatch<SetStateAction<boolean>>
}

const MarketplaceAlerts: React.FC<Props> = ({
  className: extraClassName,
  alertsToggle, // For Alert PopUp/Modal to open/close
  setAlertsToggle,
  alertOpen, // For counterchecking clicks
  setAlertOpen,
}) => {
  const [alertUnread, setAlertUnread] = useState(false)
  const [outsideClick, setOutsideClick] = useState(false)
  const [alertsList, setAlertsList] = useState([])
  const [loadingAlert, setLoadingAlert] = useState(false)

  const { authStore, alertStore } = useStore()
  const { address } = useCelo()
  const isLogin = !!address && !!authStore.token

  // Get own alerts
  useAsync(async () => {
    if (authStore.token) {
      setLoadingAlert(true)
      await alertStore.fetchAlertsMine(authStore.token)
      const newAlerts: any = []
      alertStore.alerts.forEach((newAlert) => {
        newAlerts.push(newAlert.$)
      })
      setAlertsList(newAlerts.reverse())
      setLoadingAlert(false)
    }
  }, [alertStore, authStore.token])

  // Check any unread alert notifications
  useEffect(() => {
    if (alertsList.some((alert) => alert.isRead === false)) setAlertUnread(true)
    else setAlertUnread(false)
  }, [alertsList])

  // Close Alerts PopUp
  useEffect(() => {
    const readAlerts = async () => {
      if (authStore.token) {
        await alertStore.readAlertsMine(authStore.token)
      }
      const allReadState = alertsList.map((alert) => {
        if (!alert.isRead) return { ...alert, isRead: true }
        else return alert
      })
      setAlertsList(allReadState)
    }

    if (alertOpen && outsideClick) {
      setAlertOpen(false)
      setAlertsToggle(false)
      readAlerts()
    }
    setOutsideClick(false)
  }, [
    outsideClick,
    alertOpen,
    setAlertOpen,
    setAlertsToggle,
    alertsList,
    alertStore,
    authStore.token,
  ])

  useEffect(() => {
    if (!isLogin) {
      setAlertsList([])
    }
  }, [isLogin])

  const handleOutsideClick = () => {
    setOutsideClick(true)
    setAlertOpen(true)
  }

  const markAlertsRead = async () => {
    if (authStore.token) {
      await alertStore.readAlertsMine(authStore.token)
    }
    const allReadState = alertsList.map((alert) => {
      if (!alert.isRead) return { ...alert, isRead: true }
      else return alert
    })
    setAlertsList(allReadState)
  }

  const handleAlertsToggle = () => {
    // open Alerts PopUp
    if (!alertOpen) setAlertsToggle((prev) => !prev)
    setAlertUnread(false)
  }

  const clearAllAlerts = async () => {
    setAlertsList([])

    if (authStore.token) {
      await alertStore.clearAlertsMine(authStore.token)
    }
  }

  //swipe down detection
  const windowSize = useWindowSize()
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientY)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance < -MIN_SWIPE_DISTANCE) {
      setAlertsToggle(false)
      markAlertsRead()
    }
  }

  const onModalClose = (modalClose) => {
    setAlertsToggle(modalClose)
    markAlertsRead()
  }

  return (
    <>
      <Button
        variant="white"
        className={classNames('rounded-xl self-start w-fit h-fit', {
          'bg-[#385877]': alertsToggle,
        })}
        onClick={handleAlertsToggle}
        square
      >
        {isLogin && alertUnread ? (
          <BellWithNotifIcon />
        ) : (
          <BellIcon className={classNames({ 'stroke-white': alertsToggle })} />
        )}
      </Button>

      <div className={classNames('relative', { hidden: !alertsToggle })}>
        {windowSize.width > MIN_DESKTOP_WIDTH ? (
          <div className="hidden md:block md:absolute md:top-[34px] md:-left-[52px]">
            <OutsideClickHandler onOutsideClick={handleOutsideClick} disabled={!alertsToggle}>
              <div
                className={classNames(
                  'flex flex-col justify-start bg-white rounded-xl py-6 w-[328px] ',
                  extraClassName
                )}
              >
                <div className="flex flex-row justify-between px-6 font-lato font-bold pb-6 tracking-normal">
                  <span className="text-[28px] leading-7 text-[#333333] align-middle">Alerts</span>
                  {!!alertsList && !!alertsList.length && (
                    <span
                      onClick={clearAllAlerts}
                      className="text-base text-carbon-path-bluestroke align-middle my-auto underline underline-offset-4 cursor-pointer"
                    >
                      Clear all
                    </span>
                  )}
                </div>

                <div
                  className={classNames('flex flex-col gap-y-4 pl-6 max-h-[40vh]', {
                    'overflow-y-auto alert-scrollbar': !loadingAlert,
                    'pt-4': !!alertsList && !!alertsList.length,
                  })}
                >
                  {loadingAlert ? (
                    <div className="flex justify-center items-center">
                      <div
                        className="alert-spinner animate-spin inline-block w-9 h-9"
                        role="status"
                      >
                        <div className="w-6 h-6 top-[6px] left-[6px]">
                          <span className="visually-hidden">Loading Alert...</span>
                        </div>
                      </div>
                    </div>
                  ) : alertsList.length > 0 ? (
                    alertsList.map((alert, index) => (
                      <AlertNotification
                        isRead={alert.isRead}
                        notifBody={alert.message}
                        notifDate={alert.created}
                        key={`alert${index}`}
                      />
                    ))
                  ) : (
                    <div className="font-lato font-[500] text-[16px] text-[#606060] leading-5">
                      No new alerts
                    </div>
                  )}
                </div>
              </div>
            </OutsideClickHandler>
          </div>
        ) : (
          <>
            <MobileSliderModal
              isModalOpen={alertsToggle}
              setIsModalOpen={onModalClose}
              width={100}
              height={50}
              measure={'%'}
              animation={'slideUp'}
              className="flex flex-col justify-between items-center px-3 py-2 pointer-events-auto"
            >
              <div
                className="w-full flex flex-col justify-between items-start"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div className="flex flex-row justify-between w-full pt-4 px-6 font-lato font-bold pb-[40px] tracking-normal">
                  <span className="text-[28px] leading-7 text-[#333333] align-middle">Alerts</span>
                  <span
                    onClick={clearAllAlerts}
                    className="text-base text-carbon-path-bluestroke align-middle my-auto underline underline-offset-4 cursor-pointer"
                  >
                    Clear all
                  </span>
                </div>

                <div
                  className={classNames(
                    'flex flex-col justify-between items-center gap-y-4 pl-6 max-h-[30vh] w-full ',
                    {
                      'overflow-y-auto alert-scrollbar': !loadingAlert,
                    }
                  )}
                >
                  {alertsList.length > 0 ? (
                    alertsList.map((alert, index) => (
                      <AlertNotification
                        isRead={alert.isRead}
                        notifBody={alert.message}
                        notifDate={alert.created}
                        key={`alert${index}`}
                      />
                    ))
                  ) : (
                    <div className="py-4 pr-6 font-bold">No active alerts.</div>
                  )}
                </div>
              </div>
            </MobileSliderModal>
          </>
        )}
      </div>
    </>
  )
}

export default MarketplaceAlerts
