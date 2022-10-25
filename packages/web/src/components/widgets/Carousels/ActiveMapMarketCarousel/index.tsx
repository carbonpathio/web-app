import classNames from 'classnames'
import { createRef } from 'react'
import Slider from 'react-slick'
import LeftArrowButtonIcon from '../../../../assets/icons/LeftArrowButtonIcon'
import ActiveMapMarketCarouselItem from '../../CarouselItems/ActiveMapMarketCarouselItem'

type WellImage = {
  image: string
  description: string
}

type Props = {
  show?: boolean
  expand?: boolean
  images: WellImage[]
}

const ActiveMapMarketCarousel: React.FC<Props> = ({ show = false, expand = false, images }) => {
  const carouselRef = createRef<Slider>()
  const carouselContainerRef = createRef<HTMLDivElement>()

  const carouselSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div ref={carouselContainerRef} className="relative rounded-2xl h-full">
      <Slider ref={carouselRef} {...carouselSettings}>
        {images.map((item: WellImage, index: number) => (
          <ActiveMapMarketCarouselItem
            key={index}
            imgSrc={item['image']}
            id={`${index}`}
            description={item['description']}
            expand={expand}
          />
        ))}
      </Slider>
      <div
        className={classNames(
          'absolute bottom-0 z-10 h-[56px] w-full md:w-[340px] content-center rounded-b-2xl',
          { hidden: !show }
        )}
      >
        <div className="flex flex-row p-4">
          <button
            className="bg-carbon-path-cyan rounded-full"
            type="button"
            onClick={() => carouselRef.current.slickPrev()}
          >
            <LeftArrowButtonIcon />
          </button>
          <span className="w-full flex-grow" />
          <button
            className="bg-carbon-path-cyan rounded-full"
            type="button"
            onClick={() => carouselRef.current.slickNext()}
          >
            <LeftArrowButtonIcon className="rotate-180" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ActiveMapMarketCarousel
