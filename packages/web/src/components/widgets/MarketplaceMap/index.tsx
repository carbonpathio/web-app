import * as api from '@carbonpath/shared/lib/api'
import { APIPlans } from '@carbonpath/shared/lib/api/dronedeploy'
import config from '@carbonpath/shared/lib/config'
import Well from '@carbonpath/shared/lib/models/Well'
import { useStore } from '@carbonpath/shared/lib/stores'
import { debounce } from 'lodash'
import 'mapbox-gl/dist/mapbox-gl.css'
import { observer } from 'mobx-react-lite'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import ReactMapGL, {
  GeolocateControl,
  GeolocateControlRef,
  Layer,
  MapRef,
  Source,
  ViewStateChangeEvent,
} from 'react-map-gl'
import ActiveMapMarker from './ActiveMapMarker'
import CustomMapButtons from './CustomMapButtons'

type Props = {
  mapRef: React.MutableRefObject<MapRef> | undefined
  onMapReady: () => void
  currentActiveMarker: number
  setCurrentActiveMarker: Dispatch<SetStateAction<number>>
  finalFiltered: object[]
  activeButton: string
  setActiveButton: Dispatch<SetStateAction<string>>
  setRetireFromMarker: Dispatch<SetStateAction<Well>>
}

const MarketplaceMap: React.FC<Props> = ({
  mapRef,
  onMapReady,
  currentActiveMarker,
  setCurrentActiveMarker,
  finalFiltered,
  activeButton,
  setActiveButton,
  setRetireFromMarker,
}) => {
  const geolocationControlRef = useRef<GeolocateControlRef>(undefined)

  const [droneDeployImages, setDroneDeployImages] = useState<APIPlans>(null)
  const [currentZoom, setCurrentZoom] = useState(0)
  const [currentBounds, setCurrentBounds] = useState([0, 0, 0, 0]) //north, east, south, west
  const [currentMapPlans, setCurrentMapPlans] = useState<number[]>([])
  const gdsToken = config.enverusApiKey
  const { wellStore, authStore } = useStore()
  const [activeLayers, setActiveLayers] = useState({
    landgrid: true,
    foundationWells: false,
    mintedWells: true,
    droneImagery: true,
  })

  const markerFilter = (checkWell) => {
    try {
      return finalFiltered[1]['filterItems'].some((item) => {
        return item.id === checkWell.id
      })
    } catch (e) {
      return false
    }
  }

  const handleMapMove = useCallback((e: ViewStateChangeEvent) => {
    setCurrentZoom(e.target.getZoom())
    setCurrentBounds([
      e.target.getBounds()['_ne']['lat'],
      e.target.getBounds()['_ne']['lng'],
      e.target.getBounds()['_sw']['lat'],
      e.target.getBounds()['_sw']['lng'],
    ])
  }, [])

  const handleStyleDataChange = useCallback(() => {
    if (droneDeployImages !== null) {
      setDroneDeployImages(null)
    }
    setCurrentMapPlans([])
  }, [droneDeployImages])

  const removeAllDroneImagery = useCallback(
    (map) => {
      currentMapPlans.forEach((id) => {
        //remove image source and layer of map plans if not on screen/not on zoom level > 14 anymore
        let source = map.getSource(`drone-deploy-raster-${id}`)
        if (typeof source !== 'undefined') {
          try {
            map.removeLayer(`drone-deploy-layer-${id}`)
            map.removeSource(`drone-deploy-raster-${id}`)
            setCurrentMapPlans((prev) => {
              let cur = prev
              cur.splice(cur.indexOf(id), 1)
              return cur
            })
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    [currentMapPlans]
  )

  useEffect(() => {
    if ((!activeLayers.droneImagery || currentZoom < 14) && mapRef.current) {
      const map = mapRef.current.getMap()
      removeAllDroneImagery(map)
    }
  }, [activeLayers.droneImagery, currentZoom, mapRef, removeAllDroneImagery])

  useEffect(() => {
    if (mapRef.current && droneDeployImages !== null && !!activeLayers.droneImagery) {
      const map = mapRef.current.getMap()
      let [mapNorth, mapEast, mapSouth, mapWest] = currentBounds

      const mapPlans = droneDeployImages['mapPlans'] //add new image source and layer for new map plans on screen
      mapPlans.forEach((plan, index) => {
        let url = plan['jpegFileUrl']
        let bounds = plan['jpegBounds']
        let north = Number(bounds['north'])
        let south = Number(bounds['south'])
        let east = Number(bounds['east'])
        let west = Number(bounds['west'])

        if (!currentMapPlans.includes(plan.id)) {
          if (currentZoom >= 14) {
            if (
              ((mapNorth > north && north > mapSouth) ||
                (mapNorth > south && south > mapSouth) ||
                (north > mapNorth && mapSouth > south)) &&
              ((mapEast > west && west > mapWest) ||
                (mapEast > east && east > mapWest) ||
                (east > mapEast && mapWest > west))
            ) {
              try {
                setCurrentMapPlans((prev) => {
                  let cur = prev
                  cur.push(plan.id)
                  return cur
                })
                map.addSource(`drone-deploy-raster-${plan.id}`, {
                  type: 'image',
                  url: url,
                  coordinates: [
                    [west, north],
                    [east, north],
                    [east, south],
                    [west, south],
                  ],
                })
                map.addLayer({
                  id: `drone-deploy-layer-${plan.id}`,
                  type: 'raster',
                  source: `drone-deploy-raster-${plan.id}`,
                })
              } catch (e) {
                console.debug(e)
              }
            }
          }
        }
      })
    }
  }, [
    currentZoom,
    currentBounds,
    droneDeployImages,
    mapRef,
    currentMapPlans,
    removeAllDroneImagery,
    activeLayers.droneImagery,
  ])

  useEffect(() => {
    ;(async () => {
      if (mapRef.current && droneDeployImages === null) {
        const imageLinks = await api.fetchImageLinks()
        if (imageLinks['response']['entities']) {
          setDroneDeployImages(imageLinks['response']['entities'])
        }
      }
    })()
  }, [mapRef, onMapReady, droneDeployImages, authStore.token])

  const debouncedHandleMapMove = debounce(handleMapMove, 500)

  return (
    <>
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken={`${config.mapboxApiKey}`}
        initialViewState={{
          latitude: 37.0902,
          longitude: -95.7129,
          zoom: 4,
          bearing: 0,
          pitch: 0,
        }}
        interactiveLayerIds={['data']}
        mapStyle="mapbox://styles/miurelle/cl7y96q16004n14r3zmno8fhb"
        onLoad={onMapReady}
        onMove={(e) => debouncedHandleMapMove(e)}
        onStyleData={(e) => handleStyleDataChange()}
      >
        {activeLayers.mintedWells &&
          Array.from(wellStore.wells.values()).map((well) => {
            return (
              <ActiveMapMarker
                key={well.id}
                mapRef={mapRef}
                wellInfo={well}
                droneDeployImages={droneDeployImages}
                currentActiveMarker={currentActiveMarker}
                setCurrentActiveMarker={setCurrentActiveMarker}
                filterVisibility={markerFilter(well)}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                setRetireFromMarker={setRetireFromMarker}
              />
            )
          })}

        {!!gdsToken && activeLayers.landgrid && (
          <Source
            id="wms-landgrid-raster"
            type="raster"
            tiles={[
              `https://gds.enverus.com/arcgis/rest/services/v3/Enverus_Landgrid/MapServer/export?bbox={bbox-epsg-3857}&bboxSR=EPSG%3A3857&layers=&layerDefs=&size=512%2C512&imageSR=&historicMoment=&format=png&transparent=true&dpi=&time=&layerTimeOptions=&dynamicLayers=&gdbVersion=&mapScale=&rotation=&datumTransformations=&layerParameterValues=&mapRangeValues=&layerRangeValues=&f=image&token=${gdsToken}`,
            ]}
          >
            <Layer
              id={'wms-landgrid-layer'}
              type="raster"
              source={'wms-landgrid-raster'}
              paint={{ 'raster-opacity': 0.4 }}
            />
          </Source>
        )}

        <GeolocateControl
          ref={geolocationControlRef}
          style={{ visibility: 'hidden' }}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
          showUserLocation
        />
      </ReactMapGL>
      <CustomMapButtons
        mapRef={mapRef}
        geolocationControlRef={geolocationControlRef}
        activeLayers={activeLayers}
        setActiveLayers={setActiveLayers}
      />
    </>
  )
}

export default observer(MarketplaceMap)
