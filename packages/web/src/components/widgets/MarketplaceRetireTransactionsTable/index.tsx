import { useStore } from '@carbonpath/shared/lib/stores'
import { useCelo } from '@celo/react-celo'
import classNames from 'classnames'
import Humanize from 'humanize-plus'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAsync } from 'react-use'
import TransactionIcon from '../../../assets/icons/TransactionIcon'
import { MIN_SWIPE_DISTANCE } from '../../../constants/swipe'
import { MIN_DESKTOP_WIDTH } from '../../../constants/width'
import useWindowSize from '../../../hooks/useWindowSize'
import Button from '../../atoms/Button'
import MobileSliderModal from '../../atoms/MobileSliderModal'
import TableDisplay from '../../atoms/TableDisplay'

interface Props {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  className: string
}

const MarketplaceRetireTransactionsTable: React.FC<React.PropsWithChildren<Props>> = ({
  isModalOpen,
  setIsModalOpen,
  className: extraClassName,
}) => {
  const windowSize = useWindowSize()
  const { authStore, tokenTransactionStore } = useStore()
  const [showTransactions, setShowTransactions] = useState(false)
  const [transactionList, setTransactionList] = useState<any[]>([])
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const { address } = useCelo()

  const isLogin = !!address && !!authStore.token

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientY)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance < -MIN_SWIPE_DISTANCE) setIsModalOpen(false)
  }

  useEffect(() => {
    if (showTransactions) setIsModalOpen(true)
  }, [showTransactions, setIsModalOpen])

  useAsync(async () => {
    if (isLogin) {
      await tokenTransactionStore.fetchMyTransactions()
      const txns = await tokenTransactionStore.transactions
      if (!!txns.size) {
        const newTxn: any = []
        txns.forEach((txn) => {
          const tmp = {
            txnId: txn.$.id,
            txnHash: txn.$.transactionHash,
            txnHashShortened: '0x...' + txn.$.transactionHash.slice(-12),
            txnDate: txn.$.created.slice(0, 10) + ' • ' + txn.$.created.slice(11, 19),
            txnAmount: Humanize.formatNumber(parseFloat(txn.$.amount), 4),
            txnType: txn.$.type === 'retire' ? 'Retire' : 'Purchase',
            txnWell: txn.$.well !== null ? txn.$.well.name : 'N/A',
            action: (
              <div className="cursor-pointer font-lato text-sm hover:underline">
                <a
                  href={`${process.env.CELO_BLOCKSCOUT_URL}tx/${txn.$.transactionHash}/token-transfers`}
                  rel="noreferrer"
                  target="_blank"
                  className="cursor-pointer"
                >
                  {'View More'}
                </a>
              </div>
            ),
          }
          newTxn.push(tmp)
        })
        setTransactionList(newTxn.reverse())
      }
    }
  }, [tokenTransactionStore, showTransactions, tokenTransactionStore.transactions.size])

  return (
    <div className={extraClassName}>
      {windowSize.width > MIN_DESKTOP_WIDTH ? (
        <div className="flex flex-row items-end justify-start w-full pointer-events-none">
          {showTransactions ? (
            <>
              {!!transactionList.length ? (
                <TableDisplay
                  className="flex-[4] pr-4 max-h-96 pointer-events-auto"
                  headerData={[
                    'Transaction ID',
                    'Well',
                    'Date',
                    'Amount (t)',
                    'Type',
                    // 'Status',
                  ]}
                  headerVarNames={[
                    'txnHashShortened',
                    'txnWell',
                    'txnDate',
                    'txnAmount',
                    'txnType',
                    'action',
                  ]}
                  bodyData={transactionList}
                  show={showTransactions}
                  setShow={setShowTransactions}
                  showAddAlert={false}
                  alertLoc={''}
                  noFav={true}
                />
              ) : (
                <TableDisplay
                  className="flex-[4] pr-4 max-h-96 pointer-events-auto"
                  headerData={[
                    'Transaction ID',
                    'Well',
                    'Date',
                    'Amount (t)',
                    'Type',
                    // 'Status',
                  ]}
                  headerVarNames={['txnHashShortened']}
                  bodyData={transactionList}
                  show={showTransactions}
                  setShow={setShowTransactions}
                  showAddAlert={false}
                  alertLoc={''}
                  noFav={true}
                  isEmptyTxn={true}
                />
              )}
            </>
          ) : (
            <Button
              variant="white"
              className="pointer-events-auto flex flex-row justify-center items-center py-3 px-6"
              onClick={() => setShowTransactions((prev) => !prev)}
            >
              <TransactionIcon className="mr-3" />
              <div className="font-lato font-bold text-carbon-path-bluestroke">{`My Transactions (${transactionList.length})`}</div>
            </Button>
          )}
        </div>
      ) : (
        <>
          <MobileSliderModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            width={100}
            height={60}
            measure={'%'}
            animation={'slideUp'}
            className="flex flex-col justify-between items-center px-3 py-2 pointer-events-auto"
          >
            <div
              className="w-full flex flex-col justify-between items-center"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="border-[#9EA1AE] border-2 rounded-lg w-8" />
              <h4
                className={classNames(
                  'font-lato font-bold text-[28px] text-[#333333] leading-[40px] tracking-[0.02em] pt-6'
                )}
              >{`Transactions (${transactionList.length})`}</h4>
            </div>
            <TableDisplay
              className="w-full"
              headerData={[
                'ID',
                'Date',
                'Project',
                'Tonnes',
                'Type',
                'noHash',
                '',
                '',
                // 'Status',
              ]}
              headerVarNames={[
                'txnHashShortened',
                'txnDate',
                'txnWell',
                'txnAmount',
                'txnType',
                'txnHash',
              ]}
              bodyData={transactionList}
              alertAddOrRemove={'addAlert'}
              noFav={true}
            />
          </MobileSliderModal>
        </>
      )}
    </div>
  )
}

export default MarketplaceRetireTransactionsTable
