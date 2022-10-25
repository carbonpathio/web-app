import config from '@carbonpath/shared/lib/config'
import { useStore } from '@carbonpath/shared/lib/stores'
import { useCelo } from '@celo/react-celo'
import { pdf } from '@react-pdf/renderer'
import classNames from 'classnames'
import { saveAs } from 'file-saver'
import Humanize from 'humanize-plus'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useAsync } from 'react-use'
import InfoCircleIcon from '../../../assets/icons/InfoCircleIcon'
import SettingsIcon from '../../../assets/icons/SettingsIcon'
import { buy } from '../../../utils/contractkit/admin'
import { EXCHANGE_RATE } from '../../../utils/contractkit/base'
import { getStableTokenBalance } from '../../../utils/contractkit/stableToken'
import { getAdminTokenBalance, getTokenBalance } from '../../../utils/contractkit/token'
import { truncate } from '../../../utils/truncate'
import Button from '../../atoms/Button'
import MyDocument from '../../widgets/MarketplaceReceipt'
import { InvoiceTxnProps } from '../MarketplaceReceipt'

type Props = {
  buyState: string
  setBuyState: Dispatch<SetStateAction<string>>
  setActiveButton: Dispatch<SetStateAction<string>>
}

type Inputs = {
  amount: number
}

const TOKEN_DECIMAL = 2

const MarketplaceQuickBuy: React.FC<Props> = ({ buyState, setBuyState, setActiveButton }) => {
  const { userStore, tokenTransactionStore } = useStore()

  const [errorTextInput, setErrorTextInput] = useState('')
  const [textInputMessage, setTextInputMessage] = useState('')
  const [cUSDBalance, setCUSDBalance] = useState('')
  const { performActions, address, getConnectedKit } = useCelo()
  const [maxSellAmount, setMaxSellAmount] = useState('')
  const [error, setError] = useState('')

  const [estimatedGas, setEstimatedGas] = useState('0.0000')
  const { register, watch, setValue, handleSubmit } = useForm<Inputs>({})
  const amount = watch('amount')

  const tokenCost = amount * EXCHANGE_RATE

  const estimateGasFee = async (buyInput) => {
    const adminAddress = config.contract.cpAdmin

    // Temporarily setEstimated Gas to 0.004 Celo
    setEstimatedGas('0.004')

    // await performActions(async (kit: MiniContractKit) => {
    //   const adminInstance = getAdminInstance(kit, adminAddress)
    //   const cUSD = await kit.contracts.getStableToken()

    //   let buyInputWei
    //   // Manual input is type string
    //   if (typeof buyInput === 'string') {
    //     buyInputWei = Web3.utils.toWei(buyInput)
    //   } else {
    //     buyInputWei = Web3.utils.toWei(buyInput.toString())
    //   }

    //   try {
    //     const estimateGasAllowance = await cUSD
    //       .increaseAllowance(config.contract.cpAdmin, buyInputWei.toString())
    //       .txo.estimateGas({ feeCurrency: cUSD.address })

    //     // TODO: Cannot estimateGas of buy as allowance needs to be increased first
    //     // const estimateGasBuy = await adminInstance.methods
    //     //   .buy(buyInputWei.toString())
    //     //   .estimateGas({ feeCurrency: cUSD.address, address: config.contract.cpAdmin })

    //     const weiGas = await Web3.utils.fromWei((estimateGasAllowance * 3 * GAS_PRICE).toString())
    //     setEstimatedGas(parseFloat(weiGas).toFixed(4))
    //   } catch (e) {
    //     console.debug(e)
    //   }
    // })
  }

  useAsync(async () => {
    if (address && userStore.balance) {
      const balance = await getStableTokenBalance(performActions)
      setCUSDBalance(balance)
    }
  }, [address, userStore.balance])

  useAsync(async () => {
    if (address) {
      const balance = await getAdminTokenBalance(performActions)
      setMaxSellAmount(balance)
    }
  }, [address])

  useAsync(async () => {
    setErrorTextInput('')
    if (!!amount) {
      await estimateGasFee(amount)
    } else {
      setEstimatedGas('0.0000')
    }
  }, [amount])

  const getMaxCUSDTokens = (percentage: number) => {
    return (
      truncate((parseFloat(cUSDBalance) - parseFloat(estimatedGas)) / EXCHANGE_RATE) * percentage
    )
  }

  const getMaxToken = (percentage: number) => {
    const sellTokens = truncate(parseFloat(maxSellAmount))
    const cusdTokens = getMaxCUSDTokens(percentage)

    return sellTokens > cusdTokens ? cusdTokens : sellTokens
  }

  const handlePercentageClick = (percentage: number) => {
    setTextInputMessage('')
    const maxToken = parseFloat(getMaxToken(percentage).toFixed(TOKEN_DECIMAL))
    setValue('amount', maxToken)

    if (maxToken < parseFloat(getMaxCUSDTokens(percentage).toFixed(2))) {
      setTextInputMessage(`${maxToken} tokens left`)
    }
  }

  const handleError: SubmitErrorHandler<Inputs> = (error) => {
    setErrorTextInput(error.amount.message)
    setTextInputMessage('')
  }

  const handleBuy: SubmitHandler<Inputs> = async (data) => {
    setBuyState('processing')
    setErrorTextInput('')
    setTextInputMessage('')

    const [success, res] = await buy(performActions, data.amount)
    if (!success) {
      setError(res.message)
      setBuyState('error')
      return
    }

    const balance = await getTokenBalance(performActions)
    userStore.setBalance(balance)

    const apiUpdate = await tokenTransactionStore.purchase({
      transactionHash: res.transactionHash,
      amount: data.amount,
    })

    if (!apiUpdate.ok) {
      console.debug('Error in sending api update for purchase')
    }

    // Update transactions
    await tokenTransactionStore.fetchMyTransactions()
    setBuyState('success')

    // Generate buy invoice
    const txns = await tokenTransactionStore.transactions
    let invoiceTxn: InvoiceTxnProps

    txns.forEach((txn) => {
      if (txn.$.transactionHash === res.transactionHash) {
        invoiceTxn = {
          amount: Humanize.formatNumber(parseFloat(txn.$.amount), 4),
          transactionHash: txn.$.transactionHash,
          created: txn.$.created,
          type: txn.$.type,
        }
      }
    })
    const kit = await getConnectedKit()
    const invoice = await kit.connection.web3.eth.getTransactionReceipt(res.transactionHash)
    const blob = await pdf(
      <MyDocument receipt={invoice} transaction={invoiceTxn} hash={res.transactionHash} />
    ).toBlob()
    saveAs(blob, 'CarbonPathInvoice-Buy')
  }

  const reset = () => {
    setValue('amount', 0)
    setError('')
    setTextInputMessage('')
    setErrorTextInput('')
  }

  return (
    <>
      <div className="flex flex-col justify-start">
        {
          {
            input: (
              <form onSubmit={handleSubmit(handleBuy, handleError)}>
                <div className="hidden md:block">
                  <div className="mb-2">Balance: </div>
                  <div className="mb-2 text-sm">
                    {cUSDBalance ? `${cUSDBalance} cUSD` : 'Loading...'}{' '}
                  </div>
                </div>
                <span className="mb-2">CarbonPath Tokens: </span>
                <input
                  id="buyInputBox"
                  className={classNames(
                    'rounded-xl px-6 py-4 bg-white w-full md:bg-[#ECEFFA] mt-2',
                    {
                      'outline-2 outline-[#DC5454] border-2 border-[#DC5454]':
                        errorTextInput.length > 0,
                      'outline-2 outline-carbon-path-lightblue border-2 border-carbon-path-lightblue':
                        errorTextInput.length === 0,
                    }
                  )}
                  {...register('amount', {
                    required: true && 'Required',
                    validate: {
                      val: (v) => !isNaN(v) || 'Invalid input',
                      min: (v) => v >= 0.01 || 'Min amount to buy is 0.01 tokens',
                      max: (v) => {
                        return (
                          parseFloat(v as unknown as string) <= getMaxToken(1) ||
                          `Can only buy up to ${getMaxToken(1).toFixed(TOKEN_DECIMAL)} `
                        )
                      },
                      digits: (v) =>
                        /^\d{0,3}?$/i.test(v.toString().replace('.', '')) ||
                        'Support up to 2 decimal places',
                    },
                  })}
                />

                <div
                  className={classNames('flex flex-col font-lato font-medium text-xs mt-2', {
                    hidden: !errorTextInput.length && !textInputMessage.length,
                  })}
                >
                  {errorTextInput && (
                    <div className="flex flex-row items-center align-middle">
                      <InfoCircleIcon className="mr-1" />
                      <span className="text-[#DC5454]">{errorTextInput}</span>
                    </div>
                  )}

                  {textInputMessage && (
                    <div>
                      <span>{textInputMessage}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 grid-rows-2 gap-2 mt-8  md:mt-4  ">
                  <Button
                    onClick={() => handlePercentageClick(0.25)}
                    variant="quickWhite"
                    className="px-4 py-2"
                  >
                    25%
                  </Button>
                  <Button
                    onClick={() => handlePercentageClick(0.5)}
                    variant="quickWhite"
                    className="px-4 py-2"
                  >
                    50%
                  </Button>
                  <Button
                    onClick={() => handlePercentageClick(0.75)}
                    variant="quickWhite"
                    className="px-4 py-2"
                  >
                    75%
                  </Button>
                  <Button
                    onClick={() => handlePercentageClick(1)}
                    variant="quickWhite"
                    className="px-4 py-2"
                  >
                    Max
                  </Button>
                </div>
                <div className="text-xs font-normal mt-2 mb-8">
                  *Percentage of your balance that will be converted to CarbonPath Tokens
                </div>

                <div
                  className={classNames(
                    'flex flex-row justify-between text-[#606060] text-sm font-medium mb-3'
                  )}
                >
                  <span>Token cost </span>
                  <span>{tokenCost ? tokenCost.toFixed(TOKEN_DECIMAL) : '0.00000'} cUSD</span>
                </div>

                <div
                  className={classNames(
                    'flex flex-row justify-between text-[#606060] text-sm font-medium mb-3'
                  )}
                >
                  <span>Estimated gas fees </span>
                  <span>{estimatedGas ? estimatedGas : '0.00000'} cUSD</span>
                </div>
                <hr className="mb-3" />
                <div className="mb-10">
                  Total cUSD:{' '}
                  <span>{`${
                    !!tokenCost ? (tokenCost + parseFloat(estimatedGas)).toFixed(4) : '0.0000'
                  }`}</span>
                </div>
                <Button
                  className={classNames(
                    'w-full rounded-xl font-montserrat uppercase font-bold text-carbon-path-bluestroke'
                  )}
                  variant="cyan"
                  onClick={handleSubmit(handleBuy, handleError)}
                >
                  BUY NOW
                </Button>
              </form>
            ),
            processing: (
              <>
                <div className="flex justify-center items-center mb-5">
                  <div
                    className="alert-spinner animate-spin inline-block w-20 h-20 md:w-9 md:h-9"
                    role="status"
                  >
                    <div className="top-[12px] left-[12px] w-14 h-14 md:top-[6px] md:left-[6px] md:w-6 md:h-6">
                      <span className="visually-hidden">Processing payment...</span>
                    </div>
                  </div>
                </div>
                <div className="mx-auto font-lato font-bold text-[16px] leading-5">
                  Processing payment...
                </div>
              </>
            ),
            success: (
              <>
                <div className="mx-auto mb-4">
                  <div className="bg-carbon-path-bluegrey w-14 h-14 rounded-[100%] pl-3 pt-3">
                    <SettingsIcon width={32} height={32} />
                  </div>
                </div>
                <div className="font-lato text-bold text-[16px] leading-5 text-[#333333] mx-auto mb-6">
                  Payment successful!
                </div>
                <Button
                  className="w-full rounded-xl font-montserrat uppercase font-bold text-carbon-path-bluestroke"
                  variant="cyan"
                  onClick={() => setActiveButton('retire')}
                >
                  RETIRE CREDITS
                </Button>
                <Button
                  className="mt-2 w-full rounded-xl font-montserrat uppercase font-bold text-carbon-path-bluestroke"
                  variant="cyan"
                  onClick={() => {
                    reset()
                    setBuyState('input')
                  }}
                >
                  Buy Again
                </Button>
              </>
            ),
            error: (
              <>
                <div className="mx-auto mb-4">
                  <div className="bg-[#DC5454] w-14 h-14 rounded-[100%] pl-3 pt-3">
                    <InfoCircleIcon className="stroke-white" width={32} height={32} />
                  </div>
                </div>
                <div className="font-lato font-bold text-[16px] leading-5 text-[#333333] mx-auto mb-4">
                  Payment error!
                </div>
                <div className="font-lato font-medium text-center text-[14px] md:text-[12px] leading-[18px] text-[#606060] mb-12 md:mb-6 px-4 md:px-0">
                  {error}
                </div>
                <Button
                  className="w-full rounded-xl font-montserrat uppercase font-bold text-carbon-path-bluestroke"
                  variant="cyan"
                  onClick={() => setBuyState('input')}
                >
                  Try Again
                </Button>
              </>
            ),
          }[buyState]
        }
      </div>
    </>
  )
}

export default MarketplaceQuickBuy
