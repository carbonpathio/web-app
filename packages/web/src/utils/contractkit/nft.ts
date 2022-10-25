import { MiniContractKit } from '@celo/contractkit/lib/mini-kit'
import NFTJSON from './contracts/CarbonPathNFT.json'

export const getNFTInstance = (kit: MiniContractKit, contractAddress: string) => {
  const instance = new kit.connection.web3.eth.Contract(NFTJSON.abi as any[], contractAddress)
  return instance
}
