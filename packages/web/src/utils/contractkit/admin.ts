import config from '@carbonpath/shared/lib/config'
import { StableToken } from '@celo/contractkit'
import { MiniContractKit } from '@celo/contractkit/lib/mini-kit'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { EXCHANGE_RATE, GAS_PRICE } from './base'
import AdminJSON from './contracts/CarbonPathAdmin.json'
import { getNFTInstance } from './nft'
import { calculateCusdAmount } from './stableToken'
import { getTokenInstance } from './token'
export const getAdminInstance = (kit: MiniContractKit, contractAddress: string) => {
  const instance = new kit.connection.web3.eth.Contract(AdminJSON.abi as any[], contractAddress)
  return instance
}

export const mint = async (
  performActions: (
    ...operations: ((kit: MiniContractKit) => any | Promise<any>)[]
  ) => Promise<any[]>,
  advanceAmount: number,
  cpFeePercentage: number,
  bufferAmount: number,
  operatorAddress: string,
  tokenUri: string,
  metadata: string,
  geoJson: string
) => {
  try {
    const actionResult = await performActions(async (kit: MiniContractKit) => {
      const address = kit.connection.defaultAccount
      const adminAddress = config.contract.cpAdmin
      const nftAddress = config.contract.cpNFT

      if (!address || !adminAddress || !nftAddress) return undefined

      const adminInstance = getAdminInstance(kit, adminAddress)
      const nftInstance = getNFTInstance(kit, nftAddress)
      const stableToken = await kit.contracts.getStableToken('cUSD' as StableToken)
      const advancedAmountInWei = Web3.utils.toWei(advanceAmount.toString())
      const bufferAmountInWei = Web3.utils.toWei(bufferAmount.toString())

      const startBlockNumber = await kit.connection.getBlockNumber()

      const transactionObject = await adminInstance.methods.mint(
        address,
        advancedAmountInWei,
        cpFeePercentage,
        bufferAmountInWei,
        operatorAddress,
        tokenUri,
        metadata,
        geoJson
      )

      const transaction = await kit.connection.sendTransactionObject(transactionObject, {
        feeCurrency: stableToken.address,
        gasPrice: GAS_PRICE,
      })

      await transaction.waitReceipt()
      const events = await nftInstance.getPastEvents('Transfer', {
        fromBlock: startBlockNumber,
        toBlock: 'latest',
      })
      return events.map((ev) => ({
        to: ev.returnValues.to,
        tokenId: ev.returnValues.tokenId,
        transactionHash: ev.transactionHash,
      }))
    })

    return actionResult[0]
  } catch (error) {
    console.error(error)
    return false
  }
}

export const retire = async (
  performActions: (
    ...operations: ((kit: MiniContractKit) => any | Promise<any>)[]
  ) => Promise<any[]>,
  tokenId: number,
  amount: number
) => {
  const amountInWei = Web3.utils.toWei(amount.toString())
  const adminAddress = config.contract.cpAdmin
  const tokenAddress = config.contract.cpToken

  try {
    const actionResult = await performActions(
      async (kit: MiniContractKit) => {
        const address = kit.connection.defaultAccount

        if (!address || !adminAddress || !tokenAddress) return undefined
        const stableToken = await kit.contracts.getStableToken('cUSD' as StableToken)
        const tokenInstance = getTokenInstance(kit, tokenAddress)
        const allowance = await tokenInstance.methods.allowance(address, adminAddress).call()
        const allowanceBN = Web3.utils.toBN(allowance)
        if (allowanceBN.cmp(Web3.utils.toBN(amountInWei)) >= 0) return true

        const transactionObject = await tokenInstance.methods.increaseAllowance(
          adminAddress,
          amountInWei
        )

        const transaction = await kit.connection.sendTransactionObject(transactionObject, {
          feeCurrency: stableToken.address,
          gasPrice: GAS_PRICE,
        })

        await transaction.waitReceipt()
      },
      async (kit: MiniContractKit) => {
        const address = kit.connection.defaultAccount

        if (!address || !adminAddress) return undefined

        const adminInstance = getAdminInstance(kit, adminAddress)
        const stableToken = await kit.contracts.getStableToken('cUSD' as StableToken)

        const transactionObject = await adminInstance.methods.retire(tokenId, amountInWei)

        const transaction = await kit.connection.sendTransactionObject(transactionObject, {
          feeCurrency: stableToken.address,
          gasPrice: GAS_PRICE,
        })

        return await transaction.waitReceipt()
      }
    )

    return [true, actionResult[1]]
  } catch (error) {
    console.error(error)
    return [false, error]
  }
}

export const sell = async (
  performActions: (
    ...operations: ((kit: MiniContractKit) => any | Promise<any>)[]
  ) => Promise<any[]>,
  amount: number
) => {
  const adminAddress = config.contract.cpAdmin
  const tokenAddress = config.contract.cpToken
  const amountInWei = Web3.utils.toWei(amount.toString())

  try {
    const actionResult = await performActions(
      async (kit: MiniContractKit) => {
        const address = kit.connection.defaultAccount

        if (!address || !adminAddress || !tokenAddress) return undefined
        const stableToken = await kit.contracts.getStableToken('cUSD' as StableToken)
        const tokenInstance = getTokenInstance(kit, tokenAddress)
        const allowance = await tokenInstance.methods.allowance(address, adminAddress).call()

        const allowanceBN = Web3.utils.toBN(allowance)
        if (allowanceBN.cmp(Web3.utils.toBN(amountInWei)) >= 0) return true

        const transactionObject = await tokenInstance.methods.increaseAllowance(
          adminAddress,
          amountInWei
        )

        const transaction = await kit.connection.sendTransactionObject(transactionObject, {
          feeCurrency: stableToken.address,
          gasPrice: GAS_PRICE,
        })

        await transaction.waitReceipt()
      },
      async (kit: MiniContractKit) => {
        const address = kit.connection.defaultAccount
        const adminAddress = config.contract.cpAdmin

        if (!address || !adminAddress) return undefined
        const stableToken = await kit.contracts.getStableToken('cUSD' as StableToken)
        const adminInstance = getAdminInstance(kit, adminAddress)
        const transactionObject = await adminInstance.methods.sell(amountInWei)
        const transaction = await kit.connection.sendTransactionObject(transactionObject, {
          feeCurrency: stableToken.address,
          gasPrice: GAS_PRICE,
        })

        await transaction.waitReceipt()
      }
    )

    return actionResult[0]
  } catch (error) {
    console.error(error)
    return false
  }
}

export const buy = async (
  performActions: (
    ...operations: ((kit: MiniContractKit) => any | Promise<any>)[]
  ) => Promise<any[]>,
  amount: number
) => {
  const amountInWei = Web3.utils.toWei(amount.toString())
  try {
    const actionResult = await performActions(
      async (kit: MiniContractKit) => {
        const address = kit.connection.defaultAccount
        const adminAddress = config.contract.cpAdmin

        if (!address || !adminAddress) return undefined
        const stableToken = await kit.contracts.getStableToken('cUSD' as StableToken)

        const cUSDAmount = await calculateCusdAmount(kit, amount * EXCHANGE_RATE)
        const weiCUSDAmount = new BigNumber(cUSDAmount)

        const allowance = await stableToken.allowance(address, adminAddress)

        if (allowance.comparedTo(weiCUSDAmount) >= 0) return true

        const txo = await stableToken.increaseAllowance(adminAddress, weiCUSDAmount).txo
        const transaction = await kit.connection.sendTransactionObject(txo, {
          from: address,
          gasPrice: GAS_PRICE,
          feeCurrency: stableToken.address,
        })

        const receipt = await transaction.waitReceipt()
        return receipt
      },
      async (kit: MiniContractKit) => {
        const address = kit.connection.defaultAccount
        const adminAddress = config.contract.cpAdmin

        if (!address || !adminAddress) return undefined

        const adminInstance = getAdminInstance(kit, adminAddress)
        const stableToken = await kit.contracts.getStableToken('cUSD' as StableToken)

        const transactionObject = await adminInstance.methods.buy(amountInWei)

        const transaction = await kit.connection.sendTransactionObject(transactionObject, {
          feeCurrency: stableToken.address,
          gasPrice: GAS_PRICE,
        })

        const receipt = await transaction.waitReceipt()
        return receipt
      }
    )

    return [true, actionResult[1]]
  } catch (error) {
    console.error(error)
    return [false, error]
  }
}
