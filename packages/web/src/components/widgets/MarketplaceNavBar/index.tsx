import { useStore } from '@carbonpath/shared/lib/stores'
import { useCelo } from '@celo/react-celo'
import classNames from 'classnames'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAsync } from 'react-use'
import BuyIcon from '../../../assets/icons/BuyIcon'
import CarbonPathIcon from '../../../assets/icons/CarbonPathIcon'
import ConnectIcon from '../../../assets/icons/ConnectIcon'
import ExpandIcon from '../../../assets/icons/ExpandIcon'
import ExploreIcon from '../../../assets/icons/ExploreIcon'
import ImpactIcon from '../../../assets/icons/ImpactIcon'
import OffsetIcon from '../../../assets/icons/OffsetIcon'
import RetireIcon from '../../../assets/icons/RetireIcon'
import ShrinkIcon from '../../../assets/icons/ShrinkIcon'
import SignOutIcon from '../../../assets/icons/SignOutIcon'
import { getStableTokenBalance } from '../../../utils/contractkit/stableToken'
import Button from '../../atoms/Button'
import MarketplaceNavBarCarousel from '../Carousels/MarketplaceNavBarCarousel'

type Props = {
  activeButton: string
  setActiveButton: Dispatch<SetStateAction<string>>
  handleConnect: () => {}
  handleLogout: () => {}
}

const MarketplaceNavBar: React.FC<Props> = ({
  activeButton,
  setActiveButton,
  handleConnect,
  handleLogout,
}) => {
  const { authStore, wellStore, userStore } = useStore()
  const [expand, setExpand] = useState(false)
  const { performActions, address } = useCelo()
  const [walletAddress, setWalletAddress] = useState('')
  const isLogin = !!address && !!authStore.token
  const [cUSDBalance, setCUSDBalance] = useState('')
  const handleExpand = () => {
    setExpand((prev) => !prev)
  }

  useAsync(async () => {
    if (address && userStore.balance) {
      const balance = await getStableTokenBalance(performActions)
      setCUSDBalance(balance)
    }
  }, [address, userStore.balance])

  // const handleMint = async () => {
  //   if (address) {
  //     const wellId = 1

  //     const wellRes = await wellStore.fetchWell(wellId)
  //     if (!wellRes.ok || !wellRes.extra.isApproved || wellRes.extra.mintStatus == 'minted') {
  //       return alert('Well is not approved for minting or well has been already minted')
  //     }

  //     //Fetch Enverus data
  //     const enverusRes = await fetchEnverusWellData(wellId)
  //     if (Object.keys(enverusRes.response.entities).length === 0) {
  //       return alert('No Enverus Data Received')
  //     }

  //     const advancedAmount = 50
  //     const bufferAmount = 50
  //     const res = await wellStore.ipfs(wellId)
  //     if (!res.ok) {
  //       return
  //     }

  //     const transaction = await mint(
  //       performActions,
  //       advancedAmount, //advance ammount
  //       50, // percentage
  //       bufferAmount, // buffer amount
  //       address, // operator address
  //       res.extra.metadataUri, // URI
  //       JSON.stringify(enverusRes.response.entities),
  //       'geoJson' //geoJson
  //     )

  //     const receipt = transaction[0]
  //     const balance = await getTokenBalance(performActions)
  //     userStore.setBalance(balance)

  //     const apiUpdate = await wellStore.mint(wellId, {
  //       adminContractAddress: config.contract.cpAdmin,
  //       nftContractAddress: config.contract.cpNFT,
  //       tokenContractAddress: config.contract.cpToken,
  //       tokenId: receipt.tokenId,
  //       mintTransactionHash: receipt.transactionHash,
  //       numberOfAdvancedEavs: advancedAmount,
  //       numberOfBufferPoolEavs: bufferAmount,
  //     })

  //     if (!apiUpdate.ok) {
  //       console.debug('Error in sending api update for mint')
  //     }
  //   }
  // }

  // const handleRetire = async () => {
  //   if (address) {
  //     const tokenId = 14
  //     const wellID = 1

  //     const amount = 10

  //     const receipt = await retire(
  //       performActions,
  //       tokenId, // tokenID
  //       amount // number of tokens to retire
  //     )

  //     const balance = await getTokenBalance(performActions)
  //     userStore.setBalance(balance)

  //     const apiUpdate = await wellStore.retire(wellID, {
  //       transactionHash: receipt.transactionHash,
  //       amount: amount,
  //     })

  //     if (!apiUpdate.ok) {
  //       console.debug('Error in sending api update for retire')
  //     }

  //     await userStore.fetchMe(authStore.token)
  //   }
  // }

  // const handleSell = async () => {
  //   if (address) {
  //     await sell(performActions, 400)

  //     const balance = await getTokenBalance(performActions)
  //     userStore.setBalance(balance)
  //   }
  // }

  // const handleBuy = async () => {
  //   if (address) {
  //     // Before actually performing the buy operation, make sure that:
  //     // Admin has enough tokens to sell
  //     // User has enough cUSD to buy
  //     await buy(performActions, 1)

  //     const balance = await getTokenBalance(performActions)
  //     userStore.setBalance(balance)
  //   }
  // }

  // https://nextjs.org/docs/messages/react-hydration-error
  useEffect(() => {
    setWalletAddress(address)
  }, [address, setWalletAddress])

  return (
    <nav
      className={classNames(
        'h-full w-full bg-white overflow-y-auto overflow-x-hidden transition-[width] ease-in-out duration-300 md:bg-white md:w-[96px] md:h-screen',
        {
          'md:w-[300px]': expand,
        }
      )}
    >
      <div
        className={classNames(
          'flex flex-row mx-4 justify-between text-sm font-bold tracking-normal leading-none whitespace-pre-line sm:text-base md:flex-col md:h-screen md:pt-2 md:justify-start',
          { 'md:w-[90%]': expand }
        )}
      >
        <div
          className={classNames('gap-4 my-8 hidden md:flex', {
            'md:flex-col md:items-center': !expand,
            'md:flex-row md:justify-between': expand,
          })}
        >
          <CarbonPathIcon className={classNames({ 'mt-4': expand })} />

          <Button
            icon={expand ? <ShrinkIcon /> : <ExpandIcon />}
            iconAlign="left"
            onClick={handleExpand}
            className={classNames('bg-transparent', { 'pr-0': expand })}
          />
        </div>

        <div
          className={classNames(
            'w-full flex flex-row justify-between items-center mt-2 mx-2 sm:mx-8 md:mx-0 md:flex-col md:gap-2.5',
            {
              'md:mb-36': !expand,
              'md:mb-8': expand,
            }
          )}
        >
          {/* CONNECT - chain */}
          <div
            className={classNames('hidden rounded-xl md:block', {
              'md:w-full md:bg-transparent': expand,
            })}
          >
            <Button
              onClick={handleConnect}
              iconAlign="iconOnly"
              variant={!expand && !isLogin ? 'grayOut' : 'blueGrey'}
              icon={
                <ConnectIcon
                  className={classNames({
                    'stroke-carbon-path-bluestroke': !isLogin && !expand,
                    'stroke-white': !!isLogin && !expand,
                    'md:hidden': expand,
                  })}
                />
              }
              className="px-0 py-0 rounded-xl"
            />

            {!!isLogin && walletAddress ? (
              <div
                className={classNames(
                  'px-8 py-4 rounded-xl flex-col items-center bg-carbon-path-lightgray mb-8',
                  { hidden: !expand }
                )}
              >
                <span className="font-lato font-bold text-base text-[#182B51]">
                  Balance: {cUSDBalance} cUSD
                </span>
                <div className="font-lato font-medium text-xs text-[#182B51]">
                  Wallet Address: 0x...{walletAddress.slice(-12)}
                </div>
              </div>
            ) : (
              <Button
                variant="cyan"
                onClick={handleConnect}
                className={classNames('w-full py-4 rounded-xl mb-8', {
                  hidden: !expand,
                })}
              >
                CONNECT WALLET
              </Button>
            )}
          </div>

          {/* EXPLORE - globe */}
          <div className={classNames('rounded-xl', { 'md:w-full': expand })}>
            <Button
              onClick={() => setActiveButton('explore')}
              iconAlign="iconOnly"
              contentJustify="left"
              variant={activeButton === 'explore' ? 'blueGrey' : 'grayOut'}
              icon={
                <ExploreIcon
                  className={classNames('inline scale-150 md:scale-100', {
                    'stroke-carbon-path-graytext': expand && activeButton !== 'explore',
                    'stroke-carbon-path-bluestroke': activeButton !== 'explore',
                    'stroke-white': activeButton === 'explore',
                  })}
                />
              }
              className="w-full rounded-xl items-start justify-start scale-90 py-0 px-0 sm:px-2 md:px-0 md:scale-100 "
            >
              <span
                className={classNames('hidden self-center md:inline', {
                  'md:hidden md:text-carbon-path-bluestroke': !expand,
                })}
              >
                Explore
              </span>
            </Button>
            <span className="text-carbon-path-bluestroke text-center text-sm block md:hidden">
              Explore
            </span>
          </div>

          {/* OFFSET - leaf */}
          <div className={classNames('rounded-xl', { 'md:w-full': expand })}>
            <Button
              onClick={() => setActiveButton('offset')}
              iconAlign="iconOnly"
              contentJustify="left"
              variant={activeButton === 'offset' ? 'blueGrey' : 'grayOut'}
              icon={
                <OffsetIcon
                  className={classNames('inline scale-150 md:scale-100', {
                    'stroke-carbon-path-graytext': expand && activeButton !== 'offset',
                    'stroke-carbon-path-bluestroke': activeButton !== 'offset',
                    'stroke-white': activeButton === 'offset',
                  })}
                />
              }
              className="w-full px-0 scale-90 md:scale-100 sm:px-2 md:px-0 py-0 rounded-xl items-start justify-start"
            >
              <span
                className={classNames('hidden self-center md:inline', {
                  'md:hidden md:text-carbon-path-bluestroke': !expand,
                })}
              >
                Offset
              </span>
            </Button>
            <span className="text-carbon-path-bluestroke text-center text-sm block md:hidden">
              Offset
            </span>
          </div>

          {/* IMPACT - flower */}
          <div className={classNames('rounded-xl', { 'md:w-full': expand })}>
            <Button
              onClick={() => setActiveButton('impact')}
              iconAlign="iconOnly"
              contentJustify="left"
              variant={activeButton === 'impact' ? 'blueGrey' : 'grayOut'}
              icon={
                <ImpactIcon
                  className={classNames('inline m-4 scale-150 md:scale-100', {
                    'stroke-carbon-path-graytext': expand && activeButton !== 'impact',
                    'stroke-carbon-path-bluestroke': activeButton !== 'impact',
                    'stroke-white': activeButton === 'impact',
                  })}
                />
              }
              className="w-full px-0 scale-90 md:scale-100 sm:px-2 md:px-0 py-0 rounded-xl items-start justify-start"
            >
              <span
                className={classNames('hidden self-center md:inline', {
                  'md:hidden md:text-carbon-path-bluestroke': !expand,
                })}
              >
                Impact
              </span>
            </Button>
            <span className="text-carbon-path-bluestroke text-center text-sm block md:hidden">
              Impact
            </span>
          </div>

          {/* RETIRE - pinwheel */}
          <div className={classNames('rounded-xl', { 'md:w-full': expand })}>
            <Button
              onClick={() => setActiveButton('retire')}
              iconAlign="iconOnly"
              contentJustify="left"
              variant={activeButton === 'retire' ? 'blueGrey' : 'grayOut'}
              icon={
                <RetireIcon
                  width={36}
                  height={36}
                  strokeWidth={2}
                  className={classNames('inline m-3 md:p-1', {
                    'stroke-carbon-path-graytext': expand && activeButton !== 'retire',
                    'stroke-carbon-path-bluestroke': activeButton !== 'retire',
                    'stroke-white': activeButton === 'retire',
                  })}
                />
              }
              className="w-full px-0 scale-90 md:scale-100 sm:px-2 md:px-0 py-0 rounded-xl items-start justify-start"
            >
              <span
                className={classNames('hidden self-center md:inline', {
                  'md:hidden md:text-carbon-path-bluestroke': !expand,
                })}
              >
                Retire
              </span>
            </Button>
            <span className="text-carbon-path-bluestroke text-center text-sm block md:hidden">
              Retire
            </span>
          </div>

          {/* BUY - point */}
          <div className={classNames('rounded-xl block md:hidden', { 'md:w-full': expand })}>
            <Button
              onClick={() => setActiveButton('buy')}
              iconAlign="iconOnly"
              contentJustify="left"
              variant={activeButton === 'buy' ? 'blueGrey' : 'grayOut'}
              icon={
                <BuyIcon
                  className={classNames('inline scale-150 md:scale-100', {
                    'stroke-carbon-path-graytext': expand && activeButton !== 'buy',
                    'stroke-carbon-path-bluestroke': activeButton !== 'buy',
                    'stroke-white': activeButton === 'buy',
                  })}
                />
              }
              className="w-full px-0 scale-90 md:scale-100 sm:px-2 md:px-0 py-0 rounded-xl items-start justify-start"
            >
              <span
                className={classNames('hidden self-center md:inline', {
                  'md:hidden md:text-carbon-path-bluestroke': !expand,
                })}
              >
                Buy
              </span>
            </Button>
            <span className="text-carbon-path-bluestroke text-center text-sm block md:hidden">
              Buy
            </span>
          </div>
        </div>

        {/* Only for testing function */}
        <div>
          {/* <Button onClick={handleMint}> Mint </Button>
          <Button onClick={handleRetire}>Retire </Button>
          <Button onClick={handleSell}> Sell </Button>
          <Button onClick={handleBuy}>Buy </Button> */}
        </div>

        {/* Carousel */}
        <div
          className={classNames(
            'mt-4 text-white font-lato align-middle text-center',
            { hidden: !expand },
            { 'hidden md:relative': expand }
          )}
        >
          <MarketplaceNavBarCarousel />
        </div>
        <div className="md:flex-1" />
        <div className="hidden pb-4 md:block md:w-full">
          <Button
            className={classNames(
              'w-full py-4 px-0 rounded-xl text-black',
              { hidden: !expand || !isLogin },
              { block: expand }
            )}
          >
            Advanced View
          </Button>

          <Button
            variant="white"
            iconAlign={expand ? 'right' : 'iconOnly'}
            icon={<SignOutIcon className="stroke-black" />}
            className={classNames('w-full py-4 rounded-xl text-black', { hidden: !isLogin })}
            onClick={handleLogout}
          >
            <span className={classNames({ hidden: !expand })}>Sign Out</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default MarketplaceNavBar
