import classNames from 'classnames'
import { createRef, useState } from 'react'
import Slider from 'react-slick'
import LeftArrowIcon from '../../../../assets/icons/LeftArrowIcon'
import MethodCycleIcon from '../../../../assets/icons/MethodCycleIcon'
import MethodPurchaseIcon from '../../../../assets/icons/MethodPurchaseIcon'
import MethodRigIcon from '../../../../assets/icons/MethodRigIcon'
import MethodTokenMobileIcon from '../../../../assets/icons/MethodTokenMobileIcon'
import RightArrowIcon from '../../../../assets/icons/RightArrowIcon'
import Tooltip from '../../../atoms/Tooltip'
import LandingMethodologyCarouselItem from '../../CarouselItems/LandingMethodologyCarouselItem'

const LandingMethodologyCarousel: React.FC = () => {
  const methodologyCarouselRef = createRef<Slider>()
  const [methodologyCarouselSlide, setMethodologyCarouselSlide] = useState(0)
  const [hideDots, setHideDots] = useState(false)

  const methodologyCarouselSettings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (index) => (
      <div
        className={classNames(
          'h-2 w-2 rounded-full -mt-24 md:mt-0',
          index === methodologyCarouselSlide ? 'bg-carbon-path-bluegrey' : 'bg-[#DADADA]',
          { hidden: hideDots }
        )}
      />
    ),
    afterChange: (current) => setMethodologyCarouselSlide(current),
  }

  const onTooltipShow = () => {
    setHideDots(true)
  }

  const onTooltipHide = () => {
    setHideDots(false)
  }

  return (
    <div className="relative md:hidden">
      <Slider ref={methodologyCarouselRef} {...methodologyCarouselSettings} >
        <LandingMethodologyCarouselItem
          id="methodology-1"
          icon={<MethodRigIcon />}
          title="Safely and permanently shut down well"
          description="Through a multi-step validation process, we ensure that each well has been safely
                and permanently shut down according to state and federal regulations and the surface
                repaired to local environmental standards including the potential for new carbon
                sinks."
        />
        <LandingMethodologyCarouselItem
          id="methodology-2"
          icon={<MethodCycleIcon />}
          title="Convert methane emissions and unused resources to carbon tokens"
          description="Using field tested chemical composition and historical data from each well, we are
                able to calculate future emissions and quantify impact. To ensure accuracy, we
                leverage 3rd party licensed professional engineers to appraise each well as part of
                our stringent validation process."
        />
        <LandingMethodologyCarouselItem
          id="methodology-3"
          icon={<MethodTokenMobileIcon />}
          title="1 tonne = 1 token"
          description="Using thermodynamic conversion at the beginning of our process, we ensure that one
                tonne of avoided emissions is always equal to one CarbonPath token."
        />
        <LandingMethodologyCarouselItem
          id="methodology-4"
          icon={<MethodPurchaseIcon />}
          title="Purchase, retire, and sell tokens"
          description={
            <>
              Because we are using the{' '}
              <Tooltip
                id="Ethereum ERC-20 standard,"
                hoverText="ERC-20  is an open standard that describes how to build Fungible Tokens on EVM (Ethereum Virtual Machine) compatible blockchains. ERC-20 Tokens have a property that makes each Token exactly the same (in type and value) as another. CarbonPath uses ERC-20 Tokens to represent 1 tonne of carbon emission removed."
                text="Ethereum ERC-20 standard,"
                afterShow={onTooltipShow}
                afterHide={onTooltipHide}
                className="max-w-[70vw]"
              />
              {' '}our fungible tokens will be easily purchased and retired on our marketplace with
              future plans for listing on{' '}
              <Tooltip
                id="decentralized exchanges (DEXs)."
                hoverText="A decentralized exchange (DEX) is a peer-to-peer marketplace where users can trade cryptocurrencies without the need for an intermediary to facilitate the transfer."
                text="decentralized exchanges (DEXs)."
                afterShow={onTooltipShow}
                afterHide={onTooltipHide}
              />
            </>
          }
        />
      </Slider>
      <button
        className="absolute top-0 bottom-0 hidden md:flex items-center justify-center p-2 md:p-4 m-auto text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0  bg-carbon-path-cyan rounded-full w-fit h-fit z-10 3xl:left-[5%]"
        type="button"
        onClick={() => methodologyCarouselRef.current.slickPrev()}
      >
        <LeftArrowIcon className="h-6 w-6" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="absolute top-0 bottom-0 hidden md:flex items-center justify-center p-2 md:p-4 m-auto text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0 bg-carbon-path-cyan rounded-full w-fit h-fit z-10 3xl:right-[5%]"
        type="button"
        onClick={() => methodologyCarouselRef.current.slickNext()}
      >
        <RightArrowIcon className="h-6 w-6" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}

export default LandingMethodologyCarousel
