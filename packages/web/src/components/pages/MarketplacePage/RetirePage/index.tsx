import Well from '@carbonpath/shared/lib/models/Well'
import { useStore } from '@carbonpath/shared/lib/stores'
import { useCelo } from '@celo/react-celo'
import classNames from 'classnames'
import { Dispatch, SetStateAction, useState } from 'react'
import { MapRef } from 'react-map-gl'
import MarketplaceRetire from '../../../widgets/MarketplaceRetire'
import MarketplaceRetireTransactionsTable from '../../../widgets/MarketplaceRetireTransactionsTable'

type Props = {
  setActiveButton: Dispatch<SetStateAction<string>>
  mapRef: React.MutableRefObject<MapRef> | undefined
  mapReady: boolean
  setCurrentActiveMarker: Dispatch<SetStateAction<number>>
  retireFromMarker: Well
  setRetireFromMarker: Dispatch<SetStateAction<Well>>
}

const RetirePage: React.FC<Props> = ({
  setActiveButton,
  mapRef,
  mapReady,
  setCurrentActiveMarker,
  retireFromMarker,
  setRetireFromMarker,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { authStore } = useStore()
  const { address } = useCelo()
  const isLogin = !!address && !!authStore.token
  return (
    <>
      <div className="absolute top-0 left-0 z-10 w-full h-full md:h-fit md:top-10 md:left-10 md:w-5/12">
        <MarketplaceRetire
          setActiveButton={setActiveButton}
          mapRef={mapRef}
          mapReady={mapReady}
          setCurrentActiveMarker={setCurrentActiveMarker}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          className="h-full md:h-fit"
          retireFromMarker={retireFromMarker}
          setRetireFromMarker={setRetireFromMarker}
        />
      </div>
      <MarketplaceRetireTransactionsTable
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        className={classNames(
          'absolute bottom-10 px-10 flex flex-row z-10 w-full md:w-9/12 pointer-events-none',
          { hidden: !isLogin }
        )}
      />
    </>
  )
}
export default RetirePage
