import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import { Dispatch, SetStateAction, useState } from 'react'
import { MapRef } from 'react-map-gl'
import { MIN_DESKTOP_WIDTH } from '../../../../constants/width'
import useWindowSize from '../../../../hooks/useWindowSize'
import MarketplaceSearchBar from '../../../widgets/MarketplaceSearchBar'
import MarketplaceSearchResults from '../../../widgets/MarketplaceSearchResults'

type Props = {
  mapRef: React.MutableRefObject<MapRef> | undefined
  mapReady: boolean
  setCurrentActiveMarker: Dispatch<SetStateAction<number>>
  filterData: object[]
  filterDropdownData: object[]
  finalFiltered: object[]
  setFinalFiltered: Dispatch<SetStateAction<object[]>>
}

const ExplorePage: React.FC<Props> = ({
  mapRef,
  mapReady,
  setCurrentActiveMarker,
  filterData,
  filterDropdownData,
  finalFiltered,
  setFinalFiltered,
}) => {
  const [searchBarValue, setSearchBarValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [alertsToggle, setAlertsToggle] = useState(false)
  const [showAddAlert, setShowAddAlert] = useState(false)
  const [alertLoc, setAlertLoc] = useState('')

  const windowSize = useWindowSize()
  const width = windowSize.width

  return (
    <>
      <MarketplaceSearchBar
        mapRef={mapRef}
        mapReady={mapReady}
        className={classNames(
          'absolute top-28 flex flex-row items-center md:px-10 md:z-20 w-full md:top-10 md:w-9/12',
          {
            'z-10 px-10': !focused,
            'z-20': focused,
            'justify-center': !focused && width < MIN_DESKTOP_WIDTH,
          }
        )}
        value={searchBarValue}
        setValue={setSearchBarValue}
        placeholder="Search by name, area or keyword"
        filterData={filterData}
        filterDropdownData={filterDropdownData}
        finalFiltered={finalFiltered}
        setFinalFiltered={setFinalFiltered}
        focused={focused}
        setFocused={setFocused}
        setCurrentActiveMarker={setCurrentActiveMarker}
        alertsToggle={alertsToggle}
        setAlertsToggle={setAlertsToggle}
        showAddAlert={showAddAlert}
        setShowAddAlert={setShowAddAlert}
        alertLoc={alertLoc}
        setAlertLoc={setAlertLoc}
      />
      <MarketplaceSearchResults
        className="absolute bottom-10 px-10 flex flex-row z-10 w-full md:w-9/12 pointer-events-none"
        finalFiltered={finalFiltered}
        setCurrentActiveMarker={setCurrentActiveMarker}
        alertsToggle={alertsToggle}
        showAddAlert={showAddAlert}
        alertLoc={alertLoc}
      />
    </>
  )
}
export default observer(ExplorePage)
