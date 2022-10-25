import { useStore } from '@carbonpath/shared/lib/stores'
import { useCelo } from '@celo/react-celo'
import classNames from 'classnames'
import Humanize from 'humanize-plus'
import { useEffect, useState } from 'react'
import { useAsync } from 'react-use'
import CloseIcon from '../../../assets/icons/CloseIcon'
import MenuIcon from '../../../assets/icons/MenuIcon'
import useWindowSize from '../../../hooks/useWindowSize'
import { getStableTokenBalance } from '../../../utils/contractkit/stableToken'
import Button from '../../atoms/Button'

type Props = {
  activeButton: string
}
const MarketplaceMobileHeader: React.FC<Props> = ({ activeButton }) => {
  const { userStore, authStore } = useStore()
  const { address, performActions } = useCelo()
  const numberOfRetiredTokens = !!userStore.me ? userStore.me.retiredAmount : 0

  const [headerToggle, setHeaderToggle] = useState(false)
  const [cUSDBalance, setCUSDBalance] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const isLogin = !!address && !!authStore.token
  const windowSize = useWindowSize()

  useAsync(async () => {
    if (address && userStore.balance) {
      const balance = await getStableTokenBalance(performActions)
      setCUSDBalance(balance)
    }
  }, [address, userStore.balance])

  // https://nextjs.org/docs/messages/react-hydration-error
  useEffect(() => {
    setWalletAddress(address)
  }, [address, setWalletAddress])

  const handleHeaderToggle = () => {
    setHeaderToggle((prev) => !prev)
  }

  return (
    <header>
      {/* Header overlay - screen */}
      <div
        className={classNames(
          'absolute z-[21] top-0 bg-carbon-path-blue/80 backdrop-blur-md transition-all ease-in-out duration-500 h-screen font-lato text-white text-3xl font-bold tracking-normal leading-none whitespace-pre-line',
          {
            'w-screen': headerToggle,
            'w-0': !headerToggle,
          }
        )}
      >
        <div
          className={classNames('flex flex-col gap-16 mt-12 ml-8', {
            hidden: !headerToggle,
          })}
        >
          <div>
            <Button
              onClick={handleHeaderToggle}
              icon={<CloseIcon />}
              iconAlign="right"
              className="stroke-white float-right"
            />
          </div>

          <div className="">Item 1</div>
          <div className="">Item 2</div>
          <div className="">Item 3</div>
          <div className="">Item 4</div>
        </div>
      </div>

      {/* Header - top */}
      <div className="flex flex-col w-full bg-white">
        <div className="flex w-full justify-between items-center">
          <div className="ml-4 mt-2">
            <img src="/images/logo-1.png" alt="CarbonPath Logo" className="scale-75" />
          </div>
          <div>
            <Button
              className="rounded-lg outline-none focus:outline-none stroke-carbon-path-bluestroke"
              onClick={handleHeaderToggle}
              icon={<MenuIcon className="stroke-carbon-path-bluestroke" />}
              iconAlign="iconOnly"
            />
          </div>
        </div>
        <div>
          {
            {
              offset: (
                <div className="flex text-4xl font-lato font-bold text-[#333333] mx-8 mb-2 mt-6 pr-8">
                  Calculate your offset
                </div>
              ),
              impact: (
                <>
                  <div className="flex flex-col text-4xl font-lato font-bold text-[#333333] mx-8 mb-6">
                    <div
                      className={classNames('pr-8', {
                        'mt-3 mb-6': windowSize.height >= 800,
                        'mt-0 mb-1': windowSize.height < 800,
                      })}
                    >
                      My impact
                    </div>
                    <div
                      className={classNames(
                        'block w-full bg-carbon-path-bluegrey rounded-xl px-2 text-center text-white md:hidden',
                        {
                          'py-3': windowSize.height >= 720,
                          'py-1': windowSize.height < 720,
                        }
                      )}
                    >
                      <h3 className="text-sm font-[500]">Total emmisions Prevented</h3>
                      <h3 className="font-bold text-2xl">
                        {!!numberOfRetiredTokens ? numberOfRetiredTokens : 'N/A'}{' '}
                        {Humanize.pluralize(
                          numberOfRetiredTokens == null ? 0 : numberOfRetiredTokens,
                          'tonne'
                        )}
                      </h3>
                    </div>
                  </div>
                </>
              ),
              retire: (
                <div className="flex flex-col font-lato font-bold mx-[30px]">
                  <div
                    className={classNames('flex text-4xl text-[#333333]', {
                      'mt-6': windowSize.height >= 780,
                      'mt-1': windowSize.height < 780,
                    })}
                  >
                    Retire credits
                  </div>
                  <div
                    className={classNames(
                      'flex w-full text-carbon-path-bluestroke bg-carbon-path-lightgray rounded-xl py-4 px-6 mr-4',
                      {
                        hidden: !isLogin,
                        'my-6': windowSize.height >= 700,
                        'my-2': windowSize.height < 700,
                      }
                    )}
                  >
                    <span>Available tokens: </span>
                    <span className="font-[500] ml-1">{userStore.balance}</span>
                  </div>
                  <Button
                    // onClick={handleConnect}
                    variant="cyan"
                    className={classNames(
                      'flex w-full uppercase font-montserrat font-bold text-carbon-path-bluestroke rounded-xl',
                      {
                        hidden: !!isLogin,
                        'my-6': windowSize.height >= 700,
                        'my-2': windowSize.height < 700,
                      }
                    )}
                  >
                    Connect Wallet
                  </Button>
                </div>
              ),
              buy: (
                <div
                  className={classNames(
                    'flex flex-col text-4xl font-lato font-bold text-[#333333] mx-8 mb-2 mt-4',
                    {
                      'mt-0': windowSize.height < 740,
                    }
                  )}
                >
                  Quick buy
                  {!!walletAddress && (
                    <div
                      className={classNames(
                        'flex flex-col w-full bg-[#ECEFFA] rounded-xl leading-5 text-carbon-path-bluestroke my-6 px-6 py-[7px]',
                        { 'my-2': windowSize.height < 690 }
                      )}
                    >
                      <div className="font-bold text-base">Balance: {cUSDBalance} cUSD</div>
                      <div className="font-[500] text-[12px]">
                        Wallet Address: 0x...{walletAddress.slice(-12)}
                      </div>
                    </div>
                  )}
                </div>
              ),
              default: <></>,
            }[activeButton]
          }
        </div>
      </div>
    </header>
  )
}

export default MarketplaceMobileHeader
