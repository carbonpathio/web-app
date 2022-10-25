import classNames from 'classnames'
import React, { useState } from 'react'
import { GeolocateControlRef, MapRef } from 'react-map-gl'
import ActiveLayersIcon from '../../../../assets/icons/ActiveLayersIcon'
import PlusIcon from '../../../../assets/icons/AddIcon'
import ArrowExpandIcon from '../../../../assets/icons/ArrowExpandIcon'
import LayersIcon from '../../../../assets/icons/LayersIcon'
import MinusIcon from '../../../../assets/icons/MinusIcon'
import VectorIcon from '../../../../assets/icons/VectorIcon'
import { MIN_SWIPE_DISTANCE } from '../../../../constants/swipe'
import { MIN_DESKTOP_WIDTH } from '../../../../constants/width'
import useWindowSize from '../../../../hooks/useWindowSize'
import MobileSliderModal from '../../../atoms/MobileSliderModal'
import MapButtonLayerCarousel from '../../Carousels/MapButtonLayerCarousel'
import ActiveLayerToggles from './ActiveLayerToggles'

type Props = {
  mapRef: React.MutableRefObject<MapRef> | undefined
  geolocationControlRef: React.MutableRefObject<GeolocateControlRef> | undefined
  activeLayers: {
    landgrid: boolean
    foundationWells: boolean
    mintedWells: boolean
    droneImagery: boolean
  }
  setActiveLayers: React.Dispatch<
    React.SetStateAction<{
      landgrid: boolean
      foundationWells: boolean
      mintedWells: boolean
      droneImagery: boolean
    }>
  >
}

const CustomMapButtons: React.FC<Props> = ({
  mapRef,
  geolocationControlRef,
  activeLayers,
  setActiveLayers,
}) => {
  const [showLayers, setShowLayers] = useState(false)
  const [showActiveLayers, setShowActiveLayers] = useState(false)

  const handleLayers = () => {
    if (!showLayers) {
      setShowActiveLayers(false)
    }
    setShowLayers((prev) => !prev)
  }

  const handleActiveLayers = () => {
    if (!showActiveLayers) {
      setShowLayers(false)
    }
    setShowActiveLayers((prev) => !prev)
  }

  const handleZoomIn = () => {
    if (mapRef && mapRef.current) {
      const map = (mapRef.current as MapRef).getMap()
      map.zoomIn()
    }
  }

  const handleZoomOut = () => {
    if (mapRef && mapRef.current) {
      const map = (mapRef.current as MapRef).getMap()
      map.zoomOut()
    }
  }

  const handleFullScreen = () => {
    if (mapRef && mapRef.current) {
      const map = (mapRef.current as MapRef).getMap()
      map.getContainer().requestFullscreen()
    }
  }

  const handleCurrentLocation = () => {
    if (mapRef && mapRef.current && geolocationControlRef && geolocationControlRef.current) {
      geolocationControlRef.current.trigger()
    }
  }

  //swipe down detection
  const windowSize = useWindowSize()
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientY)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance < -MIN_SWIPE_DISTANCE) {
      setShowActiveLayers(false)
    }
  }

  return (
    <div className="absolute bottom-16 right-0 px-3 py-6 m-5 md:bottom-0 ">
      <div
        onClick={handleCurrentLocation}
        className="cursor-pointer my-2 flex items-center justify-center w-14 h-14 rounded-[28px] bg-carbon-path-cyan"
      >
        <VectorIcon />
      </div>
      <div
        onClick={handleZoomIn}
        className="hidden cursor-pointer my-2 items-center justify-center w-14 h-14 rounded-[28px] bg-carbon-path-cyan md:flex"
      >
        <PlusIcon />
      </div>
      <div
        onClick={handleZoomOut}
        className="hidden cursor-pointer my-2 items-center justify-center w-14 h-14 rounded-[28px] bg-carbon-path-cyan md:flex"
      >
        <MinusIcon />
      </div>
      <div
        onClick={handleFullScreen}
        className="cursor-pointer my-2 flex items-center justify-center w-14 h-14 rounded-[28px] bg-carbon-path-cyan"
      >
        <ArrowExpandIcon />
      </div>
      <div className="flex">
        {showLayers && (
          <div className="absolute right-20">
            <MapButtonLayerCarousel mapRef={mapRef} />
          </div>
        )}

        <div
          onClick={handleLayers}
          className={classNames(
            'cursor-pointer my-2 flex items-center justify-center w-14 h-14 rounded-[28px]',
            {
              'bg-carbon-path-blue': showLayers,
              'bg-white': !showLayers,
            }
          )}
        >
          <LayersIcon color={showLayers ? 'white' : '#1C3568'} />
        </div>
      </div>
      <div className="flex">
        {showActiveLayers && (
          <div className="absolute right-20 bottom-10 flex">
            {windowSize.width > MIN_DESKTOP_WIDTH ? (
              <div className="flex flex-col justify-evenly items-center rounded-2xl p-6 bg-white w-[250px]">
                <ActiveLayerToggles activeLayers={activeLayers} setActiveLayers={setActiveLayers} />
              </div>
            ) : (
              <MobileSliderModal
                isModalOpen={showActiveLayers}
                setIsModalOpen={setShowActiveLayers}
                width={100}
                height={50}
                measure={'%'}
                animation={'slideUp'}
                className="flex flex-col justify-between items-center px-3 py-2 pointer-events-auto"
              >
                <div
                  className="w-full flex flex-col justify-between items-start"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <div className="w-full pb-6">
                    <div className="border-[#9EA1AE] border-2 rounded-lg w-8 mx-auto" />
                  </div>
                  <div className="text-[28px] leading-7 text-[#333333] align-middle font-lato font-bold pb-6 tracking-normal">
                    Active Layers
                  </div>
                  <ActiveLayerToggles
                    activeLayers={activeLayers}
                    setActiveLayers={setActiveLayers}
                  />
                </div>
              </MobileSliderModal>
            )}
          </div>
        )}

        <div
          onClick={handleActiveLayers}
          className={classNames(
            'cursor-pointer my-2 flex items-center justify-center w-14 h-14 rounded-[28px]',
            {
              'bg-carbon-path-blue': showActiveLayers,
              'bg-white': !showActiveLayers,
            }
          )}
        >
          <ActiveLayersIcon color={showActiveLayers ? 'white' : '#1C3568'} />
        </div>
      </div>
    </div>
  )
}

export default CustomMapButtons
