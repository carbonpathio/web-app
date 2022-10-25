import config from '@carbonpath/shared/lib/config'
import Well from '@carbonpath/shared/lib/models/Well'
import { useStore } from '@carbonpath/shared/lib/stores'
import { useCelo } from '@celo/react-celo'
import MapboxClient from '@mapbox/mapbox-sdk'
import mbxGeocoder from '@mapbox/mapbox-sdk/services/geocoding'
import { pdf } from '@react-pdf/renderer'
import classNames from 'classnames'
import { saveAs } from 'file-saver'
import Humanize from 'humanize-plus'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { MapRef } from 'react-map-gl'
import { useAsync } from 'react-use'
import ImpactIcon from '../../../assets/icons/ImpactIcon'
import InfoCircleIcon from '../../../assets/icons/InfoCircleIcon'
import RetireIcon from '../../../assets/icons/RetireIcon'
import { retire } from '../../../utils/contractkit/admin'
import { getTokenBalance } from '../../../utils/contractkit/token'
import Button from '../../atoms/Button'
import MyDocument from '../../widgets/MarketplaceReceipt'
import { InvoiceTxnProps } from '../MarketplaceReceipt'
import InputRetire from './InputWithSavedWells'

type Props = {
  setActiveButton: Dispatch<SetStateAction<string>>
  mapRef: React.MutableRefObject<MapRef> | undefined
  mapReady: boolean
  setCurrentActiveMarker: Dispatch<SetStateAction<number>>
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  retireFromMarker: Well
  setRetireFromMarker: Dispatch<SetStateAction<Well>>
  className?: string
}

type Inputs = {
  tokensToRetire: number
}

const MarketplaceRetire: React.FC<Props> = ({
  setActiveButton,
  mapRef,
  mapReady,
  setCurrentActiveMarker,
  isModalOpen,
  setIsModalOpen,
  retireFromMarker,
  setRetireFromMarker,
  className,
}) => {
  const { userStore, authStore, wellStore, tokenTransactionStore } = useStore()
  const numberOfRetiredTokens = !!userStore.me ? userStore.me.retiredAmount : 'N/A'

  const [selectedWell, setSelectedWell] = useState<Well>()
  const [savedWellsIDs, setSavedWellsIDs] = useState<number[]>([])
  const [retireMax, setRetireMax] = useState(parseFloat(userStore.balance))
  const [numTokens, setNumTokens] = useState(0)

  const [errorTextInput, setErrorTextInput] = useState('')
  const [disabledRetireButton, setdisabledRetireButton] = useState(false)
  const [cardError, setCardError] = useState('Invalid')
  const [retireCard, setRetireCard] = useState('retire') // retire, processing, success, error

  const [isShowSpecificWells, setIsShowSpecificWells] = useState(false)
  const [reorderedWellsList, setReorderedWellsList] = useState<Well[]>([])

  const { performActions, address, getConnectedKit } = useCelo()
  const isLogin = !!address && !!authStore.token

  const { register, watch, handleSubmit } = useForm<Inputs>({})
  const tokensToRetire = watch('tokensToRetire')

  const [searchBarValue, setSearchBarValue] = useState('')
  const [focused, setFocused] = useState(false)

  const geocoder = mbxGeocoder(
    MapboxClient({
      accessToken: config.mapboxApiKey,
      origin: 'https://api.mapbox.com',
    })
  )

  const onSearch = async (customValue?: string) => {
    const geocodeConfig = {
      limit: 1,
      query: customValue ? customValue : searchBarValue,
    }
    const forwardGeocode = await geocoder.forwardGeocode(geocodeConfig).send()
    const geocodeData = forwardGeocode.body.features[0]

    if (mapRef && mapRef.current && mapReady && geocodeData) {
      const map = mapRef.current.getMap()
      if (geocodeData.bbox) {
        map.fitBounds(geocodeData.bbox, { linear: true })
      }
    }
  }

  // Reorder Wells
  useAsync(async () => {
    if (!isShowSpecificWells) setRetireCard('processing')

    const savedWellHold = await wellStore.mySavedWells()
    const savedWells: number[] = []
    savedWellHold.extra.results.forEach((holdWell) => {
      if (holdWell.mintStatus !== 'draft') savedWells.push(holdWell.id)
    })

    const orderedWells: any = []
    wellStore.wells.forEach((holdWell) => {
      if (holdWell.mintStatus !== 'draft') {
        if (savedWells.includes(holdWell.id)) orderedWells.unshift(holdWell)
        else orderedWells.push(holdWell)
      }
    })

    setSavedWellsIDs(savedWells)
    setReorderedWellsList(orderedWells)
    if (!isShowSpecificWells) setRetireCard('retire')
  }, [wellStore, isShowSpecificWells, isLogin])

  const getPriorityWell = useCallback(() => {
    if (!reorderedWellsList.length) {
      setdisabledRetireButton(true)
      return false
    } else {
      setdisabledRetireButton(false)
      const leastRetiredWell = reorderedWellsList.reduce(function (prev, curr) {
        return prev.retiredAmount < curr.retiredAmount ? prev : curr
      })
      const availableRetire =
        leastRetiredWell.numberOfAdvancedEavs +
        leastRetiredWell.numberOfBufferPoolEavs -
        leastRetiredWell.retiredAmount

      setSelectedWell(leastRetiredWell)
      setRetireMax(
        availableRetire > parseFloat(userStore.balance)
          ? parseFloat(userStore.balance)
          : availableRetire
      )
      return true
    }
  }, [reorderedWellsList, userStore.balance])

  const retireSaved = useCallback(
    (retireToWell: Well) => {
      if (!!retireToWell) {
        const availableRetireToWell =
          retireToWell.numberOfAdvancedEavs +
          retireToWell.numberOfBufferPoolEavs -
          retireToWell.retiredAmount

        setSelectedWell(retireToWell)
        setRetireMax(
          availableRetireToWell > parseFloat(userStore.balance)
            ? parseFloat(userStore.balance)
            : availableRetireToWell
        )
      }
    },
    [userStore.balance]
  )

  // Retire to default well OR from selected marker
  useEffect(() => {
    if (!!retireFromMarker) {
      retireSaved(retireFromMarker)
      setIsShowSpecificWells(true)
    } else getPriorityWell()
  }, [getPriorityWell, retireFromMarker, retireSaved])

  useEffect(() => {
    setRetireCard('retire')
  }, [isLogin, address])

  const handleSavedWellsCheckbox = () => {
    // Reset checkbox upon toggle off
    if (isShowSpecificWells) {
      if (!!retireFromMarker) setRetireFromMarker(undefined)
      getPriorityWell()
    }

    setIsShowSpecificWells((prev) => !prev)
  }

  const handleError: SubmitErrorHandler<Inputs> = (error) => {
    setErrorTextInput(error.tokensToRetire.message)
    console.log('handleError', errorTextInput)
  }

  const handleRetireNow: SubmitHandler<Inputs> = async (data) => {
    setRetireCard('processing')
    setErrorTextInput('')
    setNumTokens(data.tokensToRetire)

    const [retireOk, receipt] = await retire(
      performActions,
      parseInt(selectedWell.tokenId), // tokenID
      data.tokensToRetire // number of tokens to retire
    )
    if (!retireOk) {
      setCardError(receipt.message)
      setRetireCard('error')
      return
    }

    const balance = await getTokenBalance(performActions)
    userStore.setBalance(balance)
    setRetireMax(parseFloat(userStore.balance))

    const apiUpdate = await wellStore.retire(selectedWell.id, {
      transactionHash: receipt.transactionHash,
      amount: data.tokensToRetire,
    })

    if (!apiUpdate.ok) {
      console.debug('Error in sending api update for retire')
    }

    await tokenTransactionStore.fetchMyTransactions()
    await userStore.fetchMe(authStore.token)
    await wellStore.fetchWell(selectedWell.id)

    // Generate retire invoice
    const txns = await tokenTransactionStore.transactions
    let invoiceTxn: InvoiceTxnProps

    txns.forEach((txn) => {
      if (txn.$.transactionHash === receipt.transactionHash) {
        invoiceTxn = {
          amount: Humanize.formatNumber(parseFloat(txn.$.amount), 4),
          transactionHash: txn.$.transactionHash,
          created: txn.$.created,
          type: txn.$.type,
          wellName: txn.$.well !== null ? txn.$.well.name : 'N/A',
          wellLocation: txn.$.well !== null ? txn.$.well.location : 'N/A',
        }
      }
    })
    const kit = await getConnectedKit()
    const invoice = await kit.connection.web3.eth.getTransactionReceipt(receipt.transactionHash)
    const blob = await pdf(
      <MyDocument receipt={invoice} transaction={invoiceTxn} hash={receipt.transactionHash} />
    ).toBlob()
    saveAs(blob, `CarbonPathInvoice-Retire-${selectedWell.name}`)
    setRetireCard('success')
  }

  const successRetire = () => {
    getPriorityWell()
    setRetireCard('retire')
  }

  const successImpact = () => {
    getPriorityWell()
    setRetireCard('retire')
    setActiveButton('impact')
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit(handleRetireNow, handleError)}
        className="min-h-full bg-[#F4F4F6] md:rounded-xl md:h-auto"
      >
        <div className="p-6 h-full md:h-auto md:rounded-xl">
          <div className="hidden md:flex md:justify-start md:items-center md:mb-6">
            <RetireIcon width={32} height={32} className="stroke-carbon-path-bluestroke mr-2" />
            <h1 className="font-lato font-bold text-2xl leading-snug text-carbon-path-blue">
              Retire tokens
            </h1>
          </div>
          <div
            className={classNames(
              'bg-carbon-path-bluegrey px-2 py-3 rounded-xl flex flex-col justify-center items-center',
              {
                'mb-10 md:mt-2': retireCard === 'retire',
                'mb-6 md:mt-2': retireCard === 'processing',
                hidden: retireCard === 'success' || retireCard === 'error',
              }
            )}
          >
            <p className="font-lato text-sm text-white">
              Total CO<sub>2</sub> Retired
            </p>
            <h1 className="font-lato font-bold text-2xl text-white">
              {numberOfRetiredTokens
                ? `${numberOfRetiredTokens} ${Humanize.pluralize(numberOfRetiredTokens, 'tonne')}`
                : 'N/A'}
            </h1>
          </div>

          {!!!isLogin ? (
            <div className="flex align-middle items-center font-lato font-bold mb-3 text-base text-carbon-path-bluestroke ">
              Login to retire your CarbonPath tokens!
            </div>
          ) : (
            <>
              <div className={classNames({ hidden: retireCard !== 'retire' })}>
                <p className="font-lato font-bold mb-3 text-[16px] leading-5 tracking-normal">
                  Tokens to retire (1 Tonne of CO<sub>2</sub> equivalent)
                </p>
                <input
                  id="retireInputBox"
                  // placeholder="t 0.00"
                  className={classNames('rounded-xl px-6 py-4 bg-white md:bg-[#ECEFFA] w-full', {
                    'outline-2 outline-[#DC5454] border-2 border-[#DC5454]':
                      errorTextInput.length > 0,
                    'outline-2 outline-carbon-path-lightblue border-2 border-carbon-path-lightblue':
                      errorTextInput.length === 0,
                  })}
                  {...register('tokensToRetire', {
                    required: true && 'Required',
                    validate: {
                      val: (v) => !isNaN(v) || 'Invalid input',
                      min: (v) => v >= 0.01 || 'Min amount to retire is 0.01 tokens',
                      max: (v) => {
                        return (
                          parseFloat(v as unknown as string) < retireMax ||
                          `Can only retire up to ${retireMax} `
                        )
                      },
                      digits: (v) =>
                        /^\d{0,3}?$/i.test(v.toString().replace('.', '')) ||
                        'Support up to 2 decimal places',
                    },
                  })}
                />
                <div
                  className={classNames(
                    'flex flex-row items-center align-middle text-[#DC5454] font-lato font-medium text-xs mt-1',
                    {
                      hidden: errorTextInput.length === 0,
                    }
                  )}
                >
                  <InfoCircleIcon className="mr-1 stroke-[#DC5454]" />
                  <span>{errorTextInput}</span>
                </div>
              </div>
              <div
                className={classNames('flex flex-row font-lato font-bold mt-4', {
                  hidden: retireCard !== 'retire',
                  'mb-6': !isShowSpecificWells,
                  'mb-4': isShowSpecificWells,
                })}
              >
                <div
                  onClick={handleSavedWellsCheckbox}
                  className="w-4 h-4 flex-shrink-0 rounded-sm border-[#333333] border-2 p-[2px] mr-2 my-auto"
                >
                  <div
                    className={classNames('bg-[#333333] w-full h-full', {
                      hidden: !isShowSpecificWells,
                    })}
                  />
                </div>

                <div className="tracking-normal">Retire to specific well</div>
              </div>
              <div
                className={classNames('mb-6 rounded-xl bg-[#ECEFFA]', {
                  hidden: !isShowSpecificWells || retireCard !== 'retire',
                })}
              >
                <InputRetire
                  setValue={setSearchBarValue}
                  filterData={reorderedWellsList}
                  focused={focused}
                  setFocused={setFocused}
                  currentFavorites={savedWellsIDs}
                  setCurrentFavorites={setSavedWellsIDs}
                  onSearch={onSearch}
                  setCurrentActiveMarker={setCurrentActiveMarker}
                  wellSelect={retireSaved}
                  toggle={isShowSpecificWells}
                  selectFromMarker={retireFromMarker}
                />
              </div>

              <div
                className={classNames(
                  'flex flex-row items-center align-middle text-carbon-path-bluestroke font-lato font-medium text-xs mb-2',
                  {
                    hidden: selectedWell === undefined || retireCard !== 'retire',
                  }
                )}
              >
                <InfoCircleIcon className="mr-1 stroke-carbon-path-bluestroke" />
                {selectedWell !== undefined && (
                  <>
                    Tokens will be retired to well:
                    <span className="font-bold ml-1">{selectedWell.name}</span>
                  </>
                )}
              </div>
              <Button
                className={classNames(
                  'w-full font-bold font-montserrat text-carbon-path-bluestroke rounded-xl',
                  {
                    hidden: retireCard !== 'retire',
                    'bg-carbon-path-lightgray': disabledRetireButton,
                  }
                )}
                variant="cyan"
                onClick={handleSubmit(handleRetireNow, handleError)}
                disabled={disabledRetireButton}
              >
                RETIRE NOW
              </Button>
              <Button
                className={classNames(
                  'block w-full font-bold font-montserrat text-carbon-path-bluestroke mt-3 md:hidden border-2 border-carbon-path-cyan rounded-xl',
                  {
                    hidden: retireCard !== 'retire',
                  }
                )}
                variant="white"
                onClick={() => setIsModalOpen(true)}
                // disabled={}
                caps={true}
              >
                See all transactions
              </Button>
              <div
                className={classNames('flex flex-col justify-center items-center', {
                  hidden: retireCard !== 'processing',
                })}
              >
                <div
                  className="alert-spinner animate-spin mb-4 w-20 h-20 md:w-10 md:h-10"
                  role="status"
                >
                  <div className="top-[12px] left-[12px] w-14 h-14 md:top-[8px] md:left-[8px] md:w-6 md:h-6">
                    <span className="visually-hidden">Processing transaction...</span>
                  </div>
                </div>
                <div className="font-lato font-bold text-[16px] leading-5 text-[#333333]">
                  Processing transaction...
                </div>
              </div>

              <div
                className={classNames(
                  'flex flex-col items-center justify-center align-middle text-center',
                  {
                    hidden: retireCard !== 'success',
                  }
                )}
              >
                <ImpactIcon
                  width={52}
                  height={52}
                  className="stroke-white bg-carbon-path-bluegrey rounded-full p-2 mb-4"
                />
                <div className="font-lato text-base font-bold mb-10 md:mb-6">
                  <div>{numTokens} CarbonPath tokens have been</div>
                  <div>
                    sucessfully retired to well:
                    {!!selectedWell ? selectedWell.name : 'N/A'}
                  </div>
                </div>
                <Button
                  className="w-full font-bold font-montserrat text-carbon-path-bluestroke rounded-xl mb-3"
                  variant="cyan"
                  caps={true}
                  onClick={successRetire} // reset retire card
                >
                  Retire Again
                </Button>
                <Button
                  className="w-full font-bold font-montserrat text-carbon-path-bluestroke rounded-xl"
                  variant="quickWhite"
                  caps={true}
                  onClick={successImpact} // go to impact
                >
                  See my Impact
                </Button>
              </div>

              <div
                className={classNames(
                  'flex flex-col items-center justify-center align-middle text-center',
                  {
                    hidden: retireCard !== 'error',
                  }
                )}
              >
                <div className="mx-auto mb-4">
                  <div className="bg-[#DC5454] w-14 h-14 rounded-[100%] pl-3 pt-3">
                    <InfoCircleIcon className="stroke-white" width={32} height={32} />
                  </div>
                </div>
                <div className="font-lato font-bold text-[16px] leading-5 text-[#333333] mx-auto mb-2">
                  Retire error!
                </div>
                <div className="font-lato font-medium text-center text-[14px] md:text-[12px] leading-[18px] text-[#606060] mb-12 md:mb-6 px-4 md:px-0">
                  {cardError}
                </div>
                <Button
                  className="w-full font-bold font-montserrat text-carbon-path-bluestroke rounded-xl mb-3"
                  variant="cyan"
                  caps={true}
                  onClick={successRetire} // reset retire card
                >
                  Try Again
                </Button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default MarketplaceRetire
