import mapboxgl from 'mapbox-gl'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { MapRef, Marker } from 'react-map-gl'
import MarkerIcon from '../../../../assets/icons/MarkerIcon'

import { MIN_DESKTOP_WIDTH } from '../../../../constants/width'
import useWindowSize from '../../../../hooks/useWindowSize'

import { APIPlans } from '@carbonpath/shared/lib/api/dronedeploy'
import Well from '@carbonpath/shared/lib/models/Well'
import classNames from 'classnames'
import MapPopup from '../../MapPopup'
import MapPopupMobile from '../../MapPopupMobile'

type Props = {
  mapRef: React.MutableRefObject<MapRef> | undefined
  wellInfo: Well
  droneDeployImages: APIPlans
  currentActiveMarker: number
  setCurrentActiveMarker: Dispatch<SetStateAction<number>>
  filterVisibility: boolean
  activeButton: string
  setActiveButton: Dispatch<SetStateAction<string>>
  setRetireFromMarker: Dispatch<SetStateAction<Well>>
}
const ActiveMapMarker: React.FC<Props> = ({
  mapRef,
  wellInfo,
  droneDeployImages,
  currentActiveMarker,
  setCurrentActiveMarker,
  filterVisibility,
  activeButton,
  setActiveButton,
  setRetireFromMarker,
}) => {
  const [showPopup, setShowPopup] = useState(false)
  const windowSize = useWindowSize()

  const handleMarkerClick = (e: mapboxgl.MapboxEvent<MouseEvent>) => {
    e.originalEvent.stopPropagation()

    if (!showPopup) {
      setCurrentActiveMarker(wellInfo.id)
    } else {
      setShowPopup(false)
      setCurrentActiveMarker(-1)
    }
  }

  const handleCloseModal = () => {
    setShowPopup(false)
    setCurrentActiveMarker(-1)
  }

  useEffect(() => {
    const showPopupAndZoomIn = () => {
      if (mapRef && mapRef.current) {
        const map = mapRef.current.getMap()
        map.setCenter({ lat: wellInfo.shlLatitude, lng: 360 - wellInfo.shlLongitude })
        map.zoomTo(18)
      }
      setShowPopup(true)
    }

    if (currentActiveMarker === wellInfo.id) {
      showPopupAndZoomIn()
    } else {
      setShowPopup(false)
    }
  }, [currentActiveMarker, mapRef, wellInfo])

  return (
    <>
      <Marker
        onClick={handleMarkerClick}
        longitude={360 - wellInfo.shlLongitude}
        latitude={wellInfo.shlLatitude}
        anchor="top"
        style={{ cursor: 'pointer' }}
      >
        <MarkerIcon className={classNames('visible', { invisible: !filterVisibility })} />
      </Marker>

      {showPopup &&
        (windowSize.width < MIN_DESKTOP_WIDTH ? (
          <MapPopupMobile
            wellInfo={wellInfo}
            droneDeployImages={droneDeployImages}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            onClose={() => handleCloseModal()}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            setRetireFromMarker={setRetireFromMarker}
          />
        ) : (
          <MapPopup
            wellInfo={wellInfo}
            droneDeployImages={droneDeployImages}
            onClose={() => handleCloseModal()}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            setRetireFromMarker={setRetireFromMarker}
          />
        ))}
    </>
  )
}

export default ActiveMapMarker
