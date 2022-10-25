import { useStore } from '@carbonpath/shared/lib/stores'
import { useCelo } from '@celo/react-celo'
import classNames from 'classnames'
import Humanize from 'humanize-plus'
import { Dispatch, SetStateAction, useState } from 'react'
import { useAsync } from 'react-use'
import ImpactIcon from '../../../../assets/icons/ImpactIcon'
import useWindowSize from '../../../../hooks/useWindowSize'
import Button from '../../../atoms/Button'
import MarketplaceImpactCarousel from '../../../widgets/Carousels/MarketplaceImpactCarousel'

type Props = {
  setActiveButton: Dispatch<SetStateAction<string>>
  setBuyOverride: Dispatch<SetStateAction<boolean>>
}
const ImpactPage: React.FC<Props> = ({ setActiveButton, setBuyOverride }) => {
  const { userStore, authStore, tokenTransactionStore } = useStore()
  const numberOfRetiredTokens = !!userStore.me ? userStore.me.retiredAmount : 0
  const [projectIds, setProjectIds] = useState([])
  const windowSize = useWindowSize()
  const { address } = useCelo()
  const isLogin = !!address && !!authStore.token

  useAsync(async () => {
    if (isLogin) {
      await tokenTransactionStore.fetchMyTransactions()
      const txns = await tokenTransactionStore.transactions
      if (!!txns.size) {
        const newTxn: any = []
        txns.forEach((txn) => {
          if (txn.$.type === 'retire' && newTxn.indexOf(txn.$.well.id) === -1) {
            newTxn.push(txn.$.well.id)
          }
        })
        setProjectIds(newTxn)
      }
    }
  }, [isLogin, tokenTransactionStore, tokenTransactionStore.transactions.size])

  const impactBuyTokens = () => {
    if (windowSize.width < 768) setActiveButton('buy')
    else setBuyOverride(true)
  }

  return (
    <div
      id="ImpactPage"
      className="absolute top-0 left-0 min-h-full w-full z-10 transition-all ease-in-out duration-300 bg-[#F4F4F6] md:bg-transparent md:h-fit md:w-5/12 md:mt-8 md:ml-8"
    >
      <div className="flex flex-col flex-start h-fit w-full font-lato drop-shadow-xl mr-4 md:pb-4 md:bg-white md:h-fit md:max-w-[25rem] md:rounded-xl">
        <div className="hidden md:flex md:ml-2 md:mr-4 md:mt-2">
          <ImpactIcon className="stroke-carbon-path-blue m-4" width={32} height={32} />
          <span className="flex align-middle items-center font-bold text-2xl text-carbon-path-bluestroke -ml-2">
            See your impact
          </span>
        </div>
        <div className="hidden bg-carbon-path-bluegrey rounded-xl p-4 text-center text-white mx-6 mt-8 md:mt-0 md:block">
          <h3 className="text-sm">Total emmisions Prevented</h3>
          <h3 className="font-bold text-3xl">
            {!!numberOfRetiredTokens ? numberOfRetiredTokens : 'N/A'}{' '}
            {Humanize.pluralize(numberOfRetiredTokens == null ? 0 : numberOfRetiredTokens, 'tonne')}
          </h3>
        </div>
      </div>

      <div
        className={classNames(
          'flex flex-col flex-start bg-[#F4F4F6] font-lato rounded-xl mx-6 px-2 mt-8 pb-2 sm:pb-0 md:mx-2 md:px-0 md:drop-shadow-xl md:bg-white md:w-[25rem]',
          {
            'md:pb-2 ': isLogin,
            'md:pb-5 ': !isLogin,
          }
        )}
      >
        <div className="flex flex-col bg-white rounded-xl">
          <div className="flex-1 bg-transparent rounded-t-xl h-32">
            {/* Carousel */}
            <div className="relative text-white font-lato align-middle text-left">
              <MarketplaceImpactCarousel numberOfRetiredTokens={numberOfRetiredTokens} />
            </div>
          </div>

          <div className="flex-col mt-6 mx-6 bg-white rounded-b-xl mb-7 md:mb-0">
            <div className="text-2xl font-bold mb-6 text-carbon-path-blue">
              {!!numberOfRetiredTokens
                ? 'You’ve made a difference!'
                : 'Ready to make a difference?'}
            </div>
            <div className="text-sm align-middle">
              <div className="flex flex-row justify-start items-center mb-2">
                <ImpactIcon className="flex-none stroke-black mr-2" />
                <div className="max-w-[300px]">
                  {!!numberOfRetiredTokens
                    ? `You’ve helped P&E ${projectIds.length} well ${Humanize.pluralize(
                        numberOfRetiredTokens,
                        'site'
                      )}.`
                    : 'Help shut wells and prevent emmisions.'}
                </div>
              </div>
              <div className="flex flex-row justify-start items-center mb-2">
                <ImpactIcon className="flex-none stroke-black mr-2" />
                <div className="max-w-[300px]">
                  {!!numberOfRetiredTokens
                    ? `You’ve offset your footprint by ${numberOfRetiredTokens} ${Humanize.pluralize(
                        numberOfRetiredTokens,
                        'tonne'
                      )}.`
                    : 'Offset your footprint.'}
                </div>
              </div>
              <div className="flex flex-row justify-start items-center mb-2">
                <ImpactIcon className="flex-none stroke-black mr-2" />
                <div className="max-w-[300px]">
                  {!!numberOfRetiredTokens
                    ? `You’ve helped fund ${projectIds.length} additional ${Humanize.pluralize(
                        numberOfRetiredTokens,
                        'project'
                      )}.`
                    : 'Support additional projects.'}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="impact-CTA"
          className={classNames('flex justify-center mt-4 pb-6', {
            hidden: !isLogin,
          })}
        >
          {numberOfRetiredTokens == null || numberOfRetiredTokens === 0 ? (
            <Button
              variant="cyan"
              className="font-bold font-montserrat text-carbon-path-bluestroke rounded-xl w-full md:mx-6"
              onClick={impactBuyTokens}
            >
              BUY TOKENS
            </Button>
          ) : (
            <Button
              variant="cyan"
              className="font-bold font-montserrat text-carbon-path-bluestroke rounded-xl w-full md:mx-6"
            >
              EXPORT MY IMPACT REPORT
            </Button>
          )}
        </div>
        {/* <div className="mx-8 mt-8 mb-4 text-sm">
          Well done for everything you have done toward our net-zero future.
        </div>
        <div className="bg-white mx-8 rounded-xl py-4 px-6 text-center text-sm drop-shadow-xl md:bg-[#ECEFFA] md:drop-shadow-none">
          Refer a friend and get 10% off:
          <br />
          <a
            href="cp.com/6HDS5W3"
            rel="noreferrer"
            target="_blank"
            className="text-carbon-path-blue text-base font-bold underline"
          >
            cp.com/6HDS5W3
          </a>
        </div>
        <div className="flex flex-row justify-center items-center mt-6">
          <YoutubeIcon className="cursor-pointer fill-carbon-path-blue mx-2" /> // pending YT link, if ever
          
          <a
            href="https://twitter.com/CarbonPath_io"
            rel="noreferrer"
            target="_blank"
          >
            <TwitterIcon className="cursor-pointer fill-carbon-path-blue mx-2 mb-3" />
          </a>
          
          <DiscordIcon className="cursor-pointer fill-carbon-path-blue mx-2" /> // pending discord link, if ever
        </div> */}
      </div>
    </div>
  )
}
export default ImpactPage
