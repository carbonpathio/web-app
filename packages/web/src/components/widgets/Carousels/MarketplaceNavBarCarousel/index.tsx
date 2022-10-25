import { createRef } from 'react'
import Slider from 'react-slick'
import LeftSmallArrowIcon from '../../../../assets/icons/LeftSmallArrowIcon'
import RightSmallArrowIcon from '../../../../assets/icons/RightSmallArrowIcon'
import Button from '../../../atoms/Button'

const MarketplaceNavBarCarousel: React.FC = () => {
  const ref = createRef<Slider>()

  const carouselSettings = {
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <>
      <Slider ref={ref} {...carouselSettings}>
        <div
          id="mini-carousel-1"
          className="scale-90 h-36 active rounded-xl py-4 px-2 bg-landing-pic-3 bg-cover bg-no-repeat"
        >
          <div className="py-1 px-4">
            <h2 className="text-2xl mb-2">17 Million</h2>
            <h5 className="font-medium">
              Total tonnes of carbon precented from entering the atmosphere
            </h5>
          </div>
        </div>

        <div
          id="mini-carousel-2"
          className="scale-90 h-36 rounded-xl py-4 px-2 bg-landing-pic-2 bg-cover bg-no-repeat"
        >
          <div className="py-1 px-4">
            <h2 className="text-2xl mb-2">Header</h2>
            <h5 className="font-medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h5>
          </div>
        </div>
      </Slider>
      <Button
        onClick={() => ref.current.slickPrev()}
        variant="cyan"
        icon={<LeftSmallArrowIcon />}
        iconAlign="iconOnly"
        className="absolute top-0 bottom-0 left-0 px-1 py-1 m-auto rounded-full w-fit h-fit z-10 border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline "
      >
        <span className="visually-hidden">Previous</span>
      </Button>

      <Button
        onClick={() => ref.current.slickNext()}
        variant="cyan"
        icon={<RightSmallArrowIcon />}
        iconAlign="iconOnly"
        className="absolute top-0 bottom-0 right-0 px-1 py-1 m-auto rounded-full w-fit h-fit z-10 border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline "
      >
        <span className="visually-hidden">Next</span>
      </Button>
    </>
  )
}

export default MarketplaceNavBarCarousel
