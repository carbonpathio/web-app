import Humanize from 'humanize-plus'
import { createRef } from 'react'
import Slider from 'react-slick'
import LeftSmallArrowIcon from '../../../../assets/icons/LeftSmallArrowIcon'
import RightSmallArrowIcon from '../../../../assets/icons/RightSmallArrowIcon'
import {
  ACRES_US_FORESTS,
  COAL_POUNDS,
  GASOLINE_GALLONS,
  NUM_GASPOWERED_VEHICLE,
} from '../../../../constants/impact'
import Button from '../../../atoms/Button'

type Props = {
  numberOfRetiredTokens: number
}

const MarketplaceImpactCarousel: React.FC<Props> = ({ numberOfRetiredTokens }) => {
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
          className="active rounded-t-xl bg-impact-2-rect bg-auto bg-no-repeat"
        >
          <div className="rounded-t-xl py-4 px-8 bg-gradient-to-r from-[#1a2947]/50 to-[#1a2947]/20">
            <div className="py-1 px-4">
              <h5 className="text-sm">Equivalent to getting off the road</h5>
              <h2 className="text-4xl font-bold py-1">
                {!!numberOfRetiredTokens
                  ? `${(numberOfRetiredTokens * NUM_GASPOWERED_VEHICLE).toFixed(3)}`
                  : 0}{' '}
                {Humanize.pluralize(
                  numberOfRetiredTokens == null ? 0 : numberOfRetiredTokens,
                  'car'
                )}
              </h2>
              <h5 className="text-sm">gasoline-powered, driven in a year</h5>
            </div>
          </div>
        </div>

        <div
          id="mini-carousel-2"
          className="active rounded-t-xl bg-impact-3-rect bg-auto bg-no-repeat"
        >
          <div className="rounded-t-xl py-4 px-8 bg-gradient-to-r from-[#1a2947]/50 to-[#1a2947]/20">
            <div className="py-1 px-4">
              <h5 className="text-sm">Equivalent carbon sequestered by</h5>
              <h2 className="text-4xl font-bold py-1">
                {!!numberOfRetiredTokens
                  ? `${(numberOfRetiredTokens * ACRES_US_FORESTS).toFixed(3)}`
                  : 0}{' '}
                {Humanize.pluralize(
                  numberOfRetiredTokens == null ? 0 : numberOfRetiredTokens,
                  'acre'
                )}
              </h2>
              <h5 className="text-sm">of U.S. forest in a year</h5>
            </div>
          </div>
        </div>

        <div
          id="mini-carousel-3"
          className="active rounded-t-xl bg-impact-2-rect bg-auto bg-no-repeat"
        >
          <div className="rounded-t-xl py-4 px-8 bg-gradient-to-r from-[#1a2947]/50 to-[#1a2947]/20">
            <div className="py-1 px-4">
              <h5 className="text-sm">Equivalent to preventing</h5>
              <h2 className="text-4xl font-bold py-1">
                {!!numberOfRetiredTokens
                  ? `${(numberOfRetiredTokens * GASOLINE_GALLONS).toFixed(3)}`
                  : 0}{' '}
                {Humanize.pluralize(
                  numberOfRetiredTokens == null ? 0 : numberOfRetiredTokens,
                  'gallon'
                )}
              </h2>
              <h5 className="text-sm">of gasoline from getting consumed</h5>
            </div>
          </div>
        </div>

        <div
          id="mini-carousel-4"
          className="active rounded-t-xl bg-impact-3-rect bg-auto bg-no-repeat"
        >
          <div className="rounded-t-xl py-4 px-8 bg-gradient-to-r from-[#1a2947]/50 to-[#1a2947]/20">
            <div className="py-1 px-4">
              <h5 className="text-sm">Equivalent to stopping</h5>
              <h2 className="text-4xl font-bold py-1">
                {!!numberOfRetiredTokens
                  ? `${(numberOfRetiredTokens * COAL_POUNDS).toFixed(2)}`
                  : 0}{' '}
                {Humanize.pluralize(
                  numberOfRetiredTokens == null ? 0 : numberOfRetiredTokens,
                  'lb'
                )}
              </h2>
              <h5 className="text-sm">of coal from getting burned</h5>
            </div>
          </div>
        </div>
      </Slider>
      <Button
        onClick={() => ref.current.slickPrev()}
        variant="cyan"
        icon={<LeftSmallArrowIcon />}
        iconAlign="iconOnly"
        className="absolute -top-3 bottom-0 -left-3 px-1 py-1 m-auto rounded-full w-fit h-fit z-10 border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline md:top-0"
      >
        <span className="visually-hidden">Previous</span>
      </Button>

      <Button
        onClick={() => ref.current.slickNext()}
        variant="cyan"
        icon={<RightSmallArrowIcon />}
        iconAlign="iconOnly"
        className="absolute -top-3 bottom-0 -right-3 px-1 py-1 m-auto rounded-full w-fit h-fit z-10 border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline md:top-0"
      >
        <span className="visually-hidden">Next</span>
      </Button>
    </>
  )
}

export default MarketplaceImpactCarousel
