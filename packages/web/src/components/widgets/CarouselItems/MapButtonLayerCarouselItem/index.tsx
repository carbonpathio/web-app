import classNames from 'classnames'
import { MapRef } from 'react-map-gl'

type Props = {
  mapRef: React.MutableRefObject<MapRef> | undefined
  mapStyle: string
  text: string
  imageStyle?: string
  textStyle?: string
}
const MapButtonLayerCarouselItem: React.FC<Props> = ({
  mapRef,
  mapStyle,
  text,
  imageStyle,
  textStyle,
}) => {
  const handleClick = () => {
    if (mapRef && mapRef.current) {
      const map = mapRef.current.getMap()
      map.setStyle(mapStyle)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={classNames(
        'border-[#939393] rounded-xl border cursor-pointer h-16 w-16 bg-contain bg-no-repeat',
        imageStyle
      )}
    >
      <div className={classNames('mt-6 text-white', textStyle)}>{text}</div>
    </div>
  )
}

export default MapButtonLayerCarouselItem
