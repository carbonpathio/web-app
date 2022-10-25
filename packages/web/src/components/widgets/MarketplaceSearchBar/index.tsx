import config from '@carbonpath/shared/lib/config'
import MapboxClient from '@mapbox/mapbox-sdk'
import mbxGeocoder from '@mapbox/mapbox-sdk/services/geocoding'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { MapRef } from 'react-map-gl'
import MarketplaceAlerts from '../MarketplaceAlerts'
import InputWithFilter from './InputWithFilter'

interface Props {
  mapRef: React.MutableRefObject<MapRef> | undefined
  mapReady: boolean
  className: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
  placeholder: string
  filterData: object[]
  filterDropdownData: object[]
  finalFiltered: object[]
  setFinalFiltered: Dispatch<SetStateAction<object[]>>
  focused: boolean
  setFocused: Dispatch<SetStateAction<boolean>>
  setCurrentActiveMarker: Dispatch<SetStateAction<number>>
  alertsToggle: boolean
  setAlertsToggle: Dispatch<SetStateAction<boolean>>
  showAddAlert: boolean
  setShowAddAlert: Dispatch<SetStateAction<boolean>>
  alertLoc: string
  setAlertLoc: Dispatch<SetStateAction<string>>
}

const MarketplaceSearchBar: React.FC<React.PropsWithChildren<Props>> = ({
  mapRef,
  mapReady,
  className,
  value,
  setValue,
  placeholder,
  filterData,
  filterDropdownData,
  finalFiltered,
  setFinalFiltered,
  focused,
  setFocused,
  setCurrentActiveMarker,
  alertsToggle,
  setAlertsToggle,
  showAddAlert,
  setShowAddAlert,
  alertLoc,
  setAlertLoc,
}) => {
  const [alertOpen, setAlertOpen] = useState(false)

  const geocoder = mbxGeocoder(
    MapboxClient({
      accessToken: config.mapboxApiKey,
      origin: 'https://api.mapbox.com',
    })
  )

  const onSearch = async (customValue?: string) => {
    const geocodeConfig = {
      limit: 1,
      query: customValue ? customValue : value,
    }
    const forwardGeocode = await geocoder.forwardGeocode(geocodeConfig).send()
    const geocodeData = forwardGeocode.body.features[0]
    setAlertLoc(geocodeData.matching_place_name)
    if (mapRef && mapRef.current && mapReady && geocodeData) {
      const map = mapRef.current.getMap()
      if (geocodeData.bbox) {
        map.fitBounds(geocodeData.bbox, { linear: true })
      }
    }
  }
  useEffect(() => {
    // initialize
    setAlertLoc('')
    setShowAddAlert(false)
  }, [setAlertLoc, setShowAddAlert])

  useEffect(() => {
    if (
      alertLoc !== undefined &&
      alertLoc.length > 0 &&
      alertLoc.toLowerCase() === value.toLowerCase()
    ) {
      setShowAddAlert(true)
    } else {
      setShowAddAlert(false)
    }
  }, [alertLoc, setShowAddAlert, value])

  return (
    <div className={classNames(className)}>
      <InputWithFilter
        value={value}
        setValue={setValue}
        placeholder={placeholder}
        filterData={filterData}
        filterDropdownData={filterDropdownData}
        finalFiltered={finalFiltered}
        setFinalFiltered={setFinalFiltered}
        onSearch={onSearch}
        focused={focused}
        setFocused={setFocused}
        setCurrentActiveMarker={setCurrentActiveMarker}
      />

      <MarketplaceAlerts
        alertsToggle={alertsToggle}
        setAlertsToggle={setAlertsToggle}
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
      />
    </div>
  )
}

export default observer(MarketplaceSearchBar)
