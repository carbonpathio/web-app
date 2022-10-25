import { createRef } from 'react'
import { MapRef } from 'react-map-gl'
import Slider from 'react-slick'
import LeftArrowIcon from '../../../../assets/icons/LeftArrowIcon'
import RightArrowIcon from '../../../../assets/icons/RightArrowIcon'
import MapButtonLayerCarouselItem from '../../CarouselItems/MapButtonLayerCarouselItem'

type Props = {
  mapRef: React.MutableRefObject<MapRef> | undefined
}
const MapButtonLayerCarousel: React.FC<Props> = ({ mapRef }) => {
  const carouselRef = createRef<Slider>()

  const carouselSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
  }

  return (
    <>
      <Slider className="w-40" ref={carouselRef} {...carouselSettings}>
        <MapButtonLayerCarouselItem
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          mapRef={mapRef}
          imageStyle="bg-satellite-map-icon "
          textStyle="ml-0.5"
          text="Satellite"
        />

        <MapButtonLayerCarouselItem
          mapStyle="mapbox://styles/mapbox/dark-v10"
          mapRef={mapRef}
          imageStyle="bg-base-map-icon"
          textStyle="ml-4"
          text="Base"
        />
      </Slider>
      <button
        className="absolute top-0 bottom-0 hidden md:flex items-center justify-center p-1.5 m-auto text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline -left-7 bg-carbon-path-green rounded-full w-fit h-fit z-10"
        type="button"
        onClick={() => carouselRef.current.slickPrev()}
      >
        <LeftArrowIcon className="h-3 w-3" />
      </button>
      <button
        className="absolute top-0 bottom-0 hidden md:flex items-center justify-center p-1.5 m-auto text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline -right-2 bg-carbon-path-green rounded-full w-fit h-fit z-10"
        type="button"
        onClick={() => carouselRef.current.slickNext()}
      >
        <RightArrowIcon className="h-3 w-3" />
      </button>
    </>
  )
}

export default MapButtonLayerCarousel
