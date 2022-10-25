import { useStore } from '@carbonpath/shared/lib/stores'
import { useCelo } from '@celo/react-celo'
import classNames from 'classnames'
import * as emailValidator from 'email-validator'
import { observer } from 'mobx-react-lite'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAsync } from 'react-use'
import BellFilledIcon from '../../../assets/icons/BellFilledIcon'
import BellIcon from '../../../assets/icons/BellIcon'
import BookmarkIcon from '../../../assets/icons/BookmarkIcon'
import ChevronDownIcon from '../../../assets/icons/ChevronDownIcon'
import ChevronUpIcon from '../../../assets/icons/ChevronUpIcon'
import CloseIcon from '../../../assets/icons/CloseIcon'
import RightArrowIcon from '../../../assets/icons/RightArrowIcon'
import { MIN_DESKTOP_WIDTH } from '../../../constants/width'
import useWindowSize from '../../../hooks/useWindowSize'
import Button from '../Button'
type Props = {
  headerData: any[]
  headerVarNames?: string[]
  bodyData: object[]
  type?: string
  className: string
  show?: boolean
  setShow?: Dispatch<SetStateAction<boolean>>
  onExpandClick?: (id: number) => void
  alertAddOrRemove?: string
  setAlertAddOrRemove?: Dispatch<SetStateAction<string>>
  showAddAlert?: boolean
  alertLoc?: string
  activeEmail?: string
  setActiveEmail?: Dispatch<SetStateAction<string>>
  noFav?: boolean
  isEmptyTxn?: boolean
}

const TableDisplay: React.FC<Props> = ({
  className,
  headerData,
  headerVarNames = [],
  bodyData,
  type = 'normal',
  show = true,
  setShow,
  onExpandClick,
  alertAddOrRemove,
  setAlertAddOrRemove,
  showAddAlert = false,
  alertLoc,
  activeEmail,
  setActiveEmail,
  noFav = false,
  isEmptyTxn = false,
}) => {
  const [alertEmail, setAlertEmail] = useState('')
  const { wellStore, userStore, authStore, alertStore } = useStore()
  const { address } = useCelo()
  const isLogin = !!address && !!authStore.token

  // inputEmail -> acceptedEmail
  const handleSubmitAlertEmail = async () => {
    if (emailValidator.validate(alertEmail)) {
      await userStore.updateMe(authStore.token, { email: alertEmail })
      setActiveEmail(alertEmail)
      await alertStore.subscribeAlert({
        name: alertLoc,
        type: 'Location',
      })
      setAlertAddOrRemove('acceptedEmail')
    } else {
      if (alertEmail.length === 0 && activeEmail) {
        await alertStore.subscribeAlert({
          name: alertLoc,
          type: 'Location',
        })
        setAlertAddOrRemove('acceptedEmail')
      } else {
        setAlertAddOrRemove('inputEmail')
      }
    }
  }

  // removeAlert -> addAlert
  const handleRemoveAlert = async () => {
    await alertStore.unsubscribeAlert({
      name: alertLoc,
      type: 'Location',
    })
    setAlertAddOrRemove('addAlert')
  }

  useAsync(async () => {
    if (type === 'normal') {
      await wellStore.mySavedWells()
    }
  }, [wellStore])

  const handleFavoriteToggle = async (favID) => {
    if (favID >= 0) {
      const checkSavedWell = await wellStore.isSavedWell(favID)
      if (!checkSavedWell.extra.result) {
        await wellStore.saveWell(favID)
      } else {
        await wellStore.removeSavedWell(favID)
      }
    }
  }

  useEffect(() => {
    if (bodyData.some((a) => Object.keys(a).length > headerData.length) && !setShow) {
      throw 'Body data length exceeds Header data length.'
    }
  }, [bodyData, headerData.length, setShow])

  const width = useWindowSize().width

  return (
    <div className={className}>
      <div
        className={classNames({
          'px-4 md:px-0 ': width >= MIN_DESKTOP_WIDTH,
        })}
      >
        <div
          className={classNames('mt-2', {
            'md:bg-white md:pb-4 md:rounded-2xl': type !== 'summary',
          })}
        >
          <h2
            className={classNames('mb-0', {
              hidden: width < MIN_DESKTOP_WIDTH,
            })}
          >
            <div
              className={classNames(
                'flex bg-carbon-path-bluegrey justify-between items-start w-full py-4 px-8 shadow-sm md:text-base text-white font-bold font-lato text-left rounded-t-2xl transition focus:outline-none',
                {
                  'accordion-button-summary flex-col': type === 'summary',
                  'flex-row': type !== 'summary',
                }
              )}
            >
              {headerData.map(
                (item, index) =>
                  item !== 'wellID' && (
                    <div
                      key={'table-head-' + String(index)}
                      className={classNames({ 'w-[20%]': type !== 'summary' })}
                    >
                      {typeof item === 'string' ? (
                        <p className="font-lato text-left font-normal text-sm">{item}</p>
                      ) : (
                        item
                      )}
                      {type === 'summary' ? (
                        typeof bodyData[0][index] === 'string' ? (
                          <p className="font-lato font-bold text-left text-2xl pb-4 pt-1">
                            {bodyData[0][index]}
                          </p>
                        ) : (
                          bodyData[0][index]
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                  )
              )}
              {setShow && type !== 'summary' && (
                <div
                  className="w-[20%] flex flex-row items-center justify-start cursor-pointer"
                  onClick={() => setShow(false)}
                >
                  <p className="font-lato text-left font-normal text-sm">Hide</p>
                  <ChevronDownIcon className="stroke-white" />
                </div>
              )}
            </div>
          </h2>

          {/* Fav + Alert Row */}
          <div className="overflow-y-auto alert-scrollbar pr-0">
            {type !== 'summary' && isLogin && (
              <div
                className={classNames(
                  'flex flex-row align-middle items-center px-[30px] md:px-10 py-3 md:bg-[#ECEFFA] font-lato text-[16px] leading-5 tracking-normal font-bold',
                  {
                    hidden: noFav,
                    'absolute w-[100vw] -translate-x-[27px] bg-[#ECEFFA]':
                      width < MIN_DESKTOP_WIDTH &&
                      (alertAddOrRemove === 'addAlert' || alertAddOrRemove === 'removeAlert'),
                    'flex flex-col flex-wrap bg-white px-0 pt-8':
                      width < MIN_DESKTOP_WIDTH &&
                      alertAddOrRemove !== 'addAlert' &&
                      alertAddOrRemove !== 'removeAlert',
                  }
                )}
              >
                <div
                  className={classNames('flex flex-row items-center mr-[28px]', {
                    hidden:
                      width < MIN_DESKTOP_WIDTH &&
                      alertAddOrRemove !== 'addAlert' &&
                      alertAddOrRemove !== 'removeAlert',
                  })}
                >
                  <div
                    onClick={() => wellStore.toggleShowSavedWells()}
                    className="w-4 h-4 flex-shrink-0 rounded-sm border-[#333333] border-2 p-[2px] mr-2"
                  >
                    <div
                      className={classNames('bg-[#333333] w-full h-full', {
                        hidden: !wellStore.showSaved,
                      })}
                    />
                  </div>
                  <div className="text-[#333333]">Show only Saved Wells</div>
                </div>

                {isLogin &&
                  showAddAlert &&
                  {
                    addAlert: (
                      <div className="my-auto cursor-pointer">
                        <Button
                          className={classNames('py-2', { 'px-0': width < MIN_DESKTOP_WIDTH })}
                          onClick={() => setAlertAddOrRemove('inputEmail')}
                        >
                          <BellIcon className="stroke-carbon-path-bluestroke inline mr-1" />
                          <span className="text-carbon-path-bluestroke align-middle underline underline-offset-4">
                            Add Alert
                          </span>
                        </Button>
                      </div>
                    ),
                    inputEmail: (
                      <div className="flex flex-col md:flex-row items-center justify-start">
                        <Button
                          icon={<ChevronUpIcon className={classNames('scale-[200%] -rotate-90')} />}
                          onClick={() => setAlertAddOrRemove('addAlert')}
                          className={classNames('mr-auto px-0 mb-6 md:hidden')}
                        />
                        <div
                          className={classNames('md:hidden', {
                            'text-[28px] mr-auto mb-4': width < MIN_DESKTOP_WIDTH,
                          })}
                        >
                          Add Alert
                        </div>
                        <div
                          className={classNames('font-lato md:hidden', {
                            'mb-9': width < MIN_DESKTOP_WIDTH,
                          })}
                        >
                          <span className="text-[#606060] font-medium">
                            Enter your email to receive latest news about{' '}
                          </span>
                          <span className="text-[#333333] font-bold">{alertLoc}</span>
                        </div>

                        <input
                          className={classNames(
                            'rounded-xl md:rounded-[10px] pl-6 py-4 bg-white min-w-[280px] font-medium border-2 border-[#6AEAEA] text-[#606060] md:mr-2',
                            {
                              'w-full mb-4 focus:outline-[#333333]': width < MIN_DESKTOP_WIDTH,
                            }
                          )}
                          placeholder={activeEmail ? activeEmail : 'Enter your email'}
                          onChange={(e) => setAlertEmail(e.target.value)}
                        />
                        <Button
                          className={classNames(
                            'font-montserrat uppercase font-bold text-carbon-path-bluestroke px-[30px] py-[18px] md:mr-4',
                            {
                              'w-full rounded-xl': width < MIN_DESKTOP_WIDTH,
                            }
                          )}
                          variant="cyan"
                          onClick={handleSubmitAlertEmail}
                        >
                          SUBMIT
                        </Button>
                        <Button
                          iconAlign="iconOnly"
                          className={classNames('px-0 mr-4', {
                            hidden: width < MIN_DESKTOP_WIDTH,
                          })}
                          onClick={() => setAlertAddOrRemove('addAlert')}
                        >
                          <CloseIcon
                            width={24}
                            height={24}
                            className="stroke-carbon-path-bluestroke"
                          />
                        </Button>
                      </div>
                    ),
                    acceptedEmail: (
                      <>
                        <div
                          className={classNames(
                            'flex flex-row rounded-xl bg-white px-4 py-3 items-center align-middle',
                            { hidden: width < MIN_DESKTOP_WIDTH }
                          )}
                        >
                          <BellIcon className="stroke-carbon-path-bluestroke" />
                          <span className="ml-3 mr-6 font-normal text-[#1B1B27]">
                            You will receive latest news about{' '}
                            <span className="font-bold">{alertLoc}</span> in your inbox
                            {activeEmail ? ` (${activeEmail}).` : '.'}
                          </span>

                          <Button
                            className="px-0"
                            onClick={() => setAlertAddOrRemove('removeAlert')}
                          >
                            <CloseIcon
                              width={24}
                              height={24}
                              className="stroke-carbon-path-bluestroke"
                            />
                          </Button>
                        </div>
                        <div
                          className={classNames('md:hidden', {
                            'flex flex-col': width < MIN_DESKTOP_WIDTH,
                          })}
                        >
                          <div
                            className={classNames({
                              hidden: width >= MIN_DESKTOP_WIDTH,
                              'text-[28px] mr-auto mb-4 mt-4': width < MIN_DESKTOP_WIDTH,
                            })}
                          >
                            <div className="py-2">Alert successfully</div>
                            <div className="py-2">added!</div>
                          </div>
                          <div
                            className={classNames('font-lato', {
                              hidden: width >= MIN_DESKTOP_WIDTH,
                              'mb-9 ': width < MIN_DESKTOP_WIDTH,
                            })}
                          >
                            <span className="text-[#606060] font-normal">
                              Your email has been added! You will receive latest news about{' '}
                            </span>
                            <span className="text-[#333333] font-bold">{alertLoc}</span>
                            <span className="text-[#606060] font-normal">
                              {' '}
                              in your inbox{activeEmail ? ` (${activeEmail}).` : '.'}
                            </span>
                            <Button
                              className={classNames(
                                'font-montserrat uppercase font-bold text-carbon-path-bluestroke px-[30px] py-[18px] md:mr-4',
                                {
                                  'w-full rounded-xl mt-9': width < MIN_DESKTOP_WIDTH,
                                }
                              )}
                              variant="cyan"
                              onClick={() => setAlertAddOrRemove('removeAlert')}
                            >
                              CLOSE
                            </Button>
                          </div>
                        </div>
                      </>
                    ),
                    removeAlert: (
                      <div className="my-auto cursor-pointer">
                        <Button
                          className={classNames('py-2', { 'px-0': width < MIN_DESKTOP_WIDTH })}
                          onClick={handleRemoveAlert}
                        >
                          <BellFilledIcon className="stroke-carbon-path-bluestroke inline mr-1" />
                          <span className="text-carbon-path-bluestroke align-middle underline underline-offset-4">
                            Remove Alert
                          </span>
                        </Button>
                      </div>
                    ),
                  }[alertAddOrRemove]}
              </div>
            )}

            <div
              className={classNames('collapse', {
                show: type !== 'summary',
                hidden:
                  width < MIN_DESKTOP_WIDTH &&
                  alertAddOrRemove !== 'addAlert' &&
                  alertAddOrRemove !== 'removeAlert',
              })}
            >
              <div
                className={classNames(
                  'bg-white flex-1 rounded-t-2xl overflow-y-auto max-h-[60vh] alert-scrollbar pb-24 md:max-h-56 md:rounded-t-none md:pt-0 md:pb-0',
                  {
                    'pt-16': isLogin && !noFav,
                    'pt-2': isLogin && noFav,
                    'pt-4': !isLogin,
                  }
                )}
              >
                {isEmptyTxn ? (
                  <div className="mx-8 mt-6 mb-4 font-lato text-[16px] leading-6 text-[#1B1B27] font-bold">
                    No transactions
                  </div>
                ) : (
                  <>
                    {bodyData.map((row, index) => {
                      if (wellStore.showSaved && !row['isSavedWell']) {
                        return <div key={'empty-row-' + index} />
                      }
                      return (
                        <div
                          key={'table-body-' + index}
                          className={classNames(
                            'flex flex-col md:flex-row justify-between items-center px-2 py-4 md:px-8',
                            { 'border-t-2 border-t-[#E7E7E7]': index > 0 }
                          )}
                        >
                          {headerVarNames.map((col, colIndex) => (
                            <div
                              key={'table-body-' + String(index) + '-' + String(colIndex)}
                              className="w-full md:w-[20%]"
                            >
                              {typeof row[col] === 'string' || col === 'id' ? (
                                <div
                                  className={classNames(
                                    'flex flex-row justify-start items-center md:pb-0',
                                    {
                                      'pb-4': colIndex === 0,
                                      'pb-2': colIndex !== 0,
                                      hidden: col === 'txnHash',
                                    }
                                  )}
                                >
                                  {width < MIN_DESKTOP_WIDTH &&
                                    (colIndex === 0 && col !== 'txnHashShortened' ? (
                                      <></>
                                    ) : (
                                      <div
                                        className={classNames(
                                          'font-lato font-bold text-left text-sm md:text-black',
                                          {
                                            'text-carbon-path-bluestroke mr-1':
                                              col === 'txnHashShortened',
                                            'text-[#606060]': col !== 'txnHashShortened',
                                          }
                                        )}
                                      >
                                        {`${headerData[colIndex] + ': '}`}
                                      </div>
                                    ))}

                                  <div
                                    className={classNames(
                                      'font-lato font-bold text-left md:text-black',
                                      {
                                        'text-carbon-path-bluestroke': colIndex === 0,
                                        'text-[#606060] ml-auto mr-0 md:mr-auto md:ml-0 text-sm':
                                          colIndex !== 0,
                                      }
                                    )}
                                  >
                                    {col === 'id' && type !== 'summary' && isLogin ? (
                                      <>
                                        <BookmarkIcon
                                          onClick={() => handleFavoriteToggle(row[col])}
                                          className={classNames(
                                            'inline mr-2 mb-1 stroke-2 cursor-pointer transition-all duration-300',
                                            {
                                              'fill-carbon-path-bluegrey stroke-carbon-path-bluegrey':
                                                row['isSavedWell'],
                                              'fill-white stroke-[#BDBFC7]': !row['isSavedWell'],
                                            }
                                          )}
                                        />
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    {col === 'id' ? `${row['name']}` : `${row[col]}`}
                                  </div>

                                  {width < MIN_DESKTOP_WIDTH && colIndex === 0 && col === 'id' && (
                                    <div
                                      className="cursor-pointer inline ml-auto"
                                      onClick={() => {
                                        onExpandClick(row['id'])
                                      }}
                                    >
                                      <RightArrowIcon
                                        width={24}
                                        height={24}
                                        className="stroke-carbon-path-bluestroke"
                                      />
                                    </div>
                                  )}

                                  {width < MIN_DESKTOP_WIDTH &&
                                    colIndex === 0 &&
                                    col === 'txnHashShortened' && (
                                      <div className="cursor-pointer inline ml-auto">
                                        <a
                                          href={`${process.env.CELO_BLOCKSCOUT_URL}tx/${row['txnHash']}/token-transfers`}
                                          rel="noreferrer"
                                          target="_blank"
                                          className="cursor-pointer"
                                        >
                                          <RightArrowIcon
                                            width={24}
                                            height={24}
                                            className="stroke-carbon-path-bluestroke"
                                          />
                                        </a>
                                      </div>
                                    )}
                                </div>
                              ) : width > MIN_DESKTOP_WIDTH ? (
                                row[col]
                              ) : (
                                <div className="flex flex-row justify-start items-center pb-2">
                                  <div className="inline font-lato font-bold text-left text-sm text-[#606060]">
                                    {headerData[colIndex] + ': '}
                                  </div>
                                  <div className="inline font-lato font-bold text-left text-sm text-[#606060] ml-auto">
                                    {row[col]}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

TableDisplay.displayName = 'TableDisplay'
export default observer(TableDisplay)
