import { useStore } from '@carbonpath/shared/lib/stores'
import { useCelo } from '@celo/react-celo'
import classNames from 'classnames'
import React, { Dispatch, SetStateAction } from 'react'
import Button from '../../../atoms/Button'
import MarketplaceQuickBuy from '../../../widgets/MarketplaceQuickBuy'

type Props = {
  signOut: () => void
  signIn: () => void
  buyState: string
  setBuyState: Dispatch<SetStateAction<string>>
  setActiveButton: Dispatch<SetStateAction<string>>
}

const BuyPage: React.FC<React.PropsWithChildren<Props>> = ({
  signOut,
  signIn,
  buyState,
  setBuyState,
  setActiveButton,
}) => {
  const { authStore } = useStore()
  const { address } = useCelo()
  const isLogin = !!address && !!authStore.token
  return (
    <div
      id="BuyPage"
      className="absolute top-0 flex flex-col z-10 w-full min-h-full py-12 px-8 md:px-12 bg-[#F4F4F6] text-[#333333] font-lato font-bold text-base tracking-normal md:hidden"
    >
      <div className={classNames({ hidden: !isLogin })}>
        <MarketplaceQuickBuy
          buyState={buyState}
          setBuyState={setBuyState}
          setActiveButton={setActiveButton}
        />
      </div>
      <div className={classNames({ hidden: isLogin })}>
        <Button onClick={signIn} className="w-full" variant="cyan">
          <span className="font-montserrat uppercase font-bold  text-carbon-path-bluestroke">
            Connect Wallet
          </span>
        </Button>
      </div>
    </div>
  )
}

export default BuyPage
