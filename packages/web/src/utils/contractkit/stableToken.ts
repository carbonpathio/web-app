import { StableToken } from '@celo/contractkit'
import { MiniContractKit } from '@celo/contractkit/lib/mini-kit'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'

export const calculateCusdAmount = async (
  kit: MiniContractKit,
  amountInDollars: number
): Promise<string> => {
  const cUSDtoken = await kit.contracts.getStableToken('cUSD' as StableToken)
  const decimals = await cUSDtoken.decimals()

  const amountPow = new BigNumber(amountInDollars).multipliedBy(new BigNumber(10).pow(decimals))
  return amountPow.toString()
}

export const getStableTokenBalance = async (
  performActions: (
    ...operations: ((kit: MiniContractKit) => any | Promise<any>)[]
  ) => Promise<any[]>
) => {
  try {
    const actionResult = await performActions(async (kit: MiniContractKit) => {
      const address = kit.connection.defaultAccount
      const stableToken = await kit.contracts.getStableToken('cUSD' as StableToken)

      if (!address) return undefined

      const balance = await stableToken.balanceOf(address)
      const convertedBalance = Web3.utils.fromWei(balance.toString())

      return parseFloat(convertedBalance).toFixed(4)
    })

    return actionResult[0]
  } catch (error) {
    console.error(error)
    return false
  }
}
