import config from '@carbonpath/shared/lib/config'
import { MiniContractKit } from '@celo/contractkit/lib/mini-kit'
import Web3 from 'web3'
import TokenJSON from './contracts/CarbonPathToken.json'

export const getTokenInstance = (kit: MiniContractKit, contractAddress: string) => {
  const instance = new kit.connection.web3.eth.Contract(TokenJSON.abi as any[], contractAddress)
  return instance
}

export const getTokenBalance = async (
  performActions: (
    ...operations: ((kit: MiniContractKit) => any | Promise<any>)[]
  ) => Promise<any[]>
) => {
  try {
    const actionResult = await performActions(async (kit: MiniContractKit) => {
      const address = kit.connection.defaultAccount
      const tokenAddress = config.contract.cpToken

      const tokenInstance = getTokenInstance(kit, tokenAddress)

      const balance = await tokenInstance.methods.balanceOf(address).call()
      const convertedBalance = Web3.utils.fromWei(balance.toString())

      return parseFloat(convertedBalance).toFixed(4)
    })

    return actionResult[0]
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getAdminTokenBalance = async (
  performActions: (
    ...operations: ((kit: MiniContractKit) => any | Promise<any>)[]
  ) => Promise<any[]>
) => {
  try {
    const actionResult = await performActions(async (kit: MiniContractKit) => {
      const tokenAddress = config.contract.cpToken

      const tokenInstance = getTokenInstance(kit, tokenAddress)

      const balance = await tokenInstance.methods.balanceOf(config.contract.cpAdmin).call()
      const convertedBalance = Web3.utils.fromWei(balance.toString())

      return parseFloat(convertedBalance).toFixed(6)
    })

    return actionResult[0]
  } catch (error) {
    console.error(error)
    return false
  }
}
