import classNames from 'classnames'
import { createRef, useState } from 'react'
import Slider from 'react-slick'
import ArticleSearchIcon from '../../../../assets/icons/ArticleSearchIcon'
import ItemTagIcon from '../../../../assets/icons/ItemTagIcon'
import LeftArrowIcon from '../../../../assets/icons/LeftArrowIcon'
import MapPinIcon from '../../../../assets/icons/MapPinIcon'
import OffsetIcon from '../../../../assets/icons/OffsetIcon'
import RetireIcon from '../../../../assets/icons/RetireIcon'
import RightArrowIcon from '../../../../assets/icons/RightArrowIcon'
import SettingsIcon from '../../../../assets/icons/SettingsIcon'
import Tooltip from '../../../atoms/Tooltip'

import LandingAdvantagesCarouselItem from '../../CarouselItems/LandingAdvantageCarouselItem'

const LandingAdvantagesCarousel: React.FC = () => {
  const advantagesCarouselRef = createRef<Slider>()
  const [advantagesCarouselSlide, setAdvantangesCarouselSlide] = useState(0)
  const [hideDots, setHideDots] = useState(false)

  const advantagesCarouselSettings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 9500,
    customPaging: (index) => (
      <div
        className={classNames(
          'h-2 w-2 rounded-full md:-mt-28',
          index === advantagesCarouselSlide ? 'bg-carbon-path-bluegrey' : 'bg-[#DADADA]',
          { hidden: hideDots }
        )}
      />
    ),
    afterChange: (current) => setAdvantangesCarouselSlide(current),
  }

  const onTooltipShow = () => {
    setHideDots(true)
  }

  const onTooltipHide = () => {
    setHideDots(false)
  }

  return (
    <div className="relative md:max-w-[1260px] pt-[120px]">
      <Slider ref={advantagesCarouselRef} {...advantagesCarouselSettings}>
        <LandingAdvantagesCarouselItem
          id="carousel-1"
          icon={<MapPinIcon width={24} height={24} className="stroke-white"/>}
          title="Real"
          image="images/carousel-adv-1.png"
          description={
            <>
              Carbon credit tokens are only issued upon project completion when{' '}
              <Tooltip
                id="plug and abandonment"
                hoverText="Plug and abandonment (P&A) means to place a series of cement plugs into a wellbore, cut casing strings and remove the wellhead to permanently decommission the well."
                text="plug and abandonment (P&A)"
              />{' '}
              certifications are received from the applicable governmental regulatory bodies.
            </>
          }
        />
        <LandingAdvantagesCarouselItem
          id="carousel-2"
          icon={<OffsetIcon width={64} height={64} className="stroke-white scale-110" />}
          title="Permanent"
          image="images/carousel-adv-2.png"
          description="Once wells have been properly plugged and abandoned (P&A), they will no longer emit methane and market prices approaching $1,000/barrel of oil would be required for another oil and gas operator to access those hydrocarbon reserves and thus permanently sequestering the carbon."
        />
        <LandingAdvantagesCarouselItem
          id="carousel-3"
          icon={<RetireIcon width={24} height={24} className="stroke-white scale-110" strokeWidth={2} />}
          title="Quantifiable"
          image="images/carousel-adv-3.png"
          description={
            <>
              There are long-standing, widely accepted engineering standards, the Petroleum
              Resources Management System (PRMS), by which future oil and natural gas reserve
              volumes and their intrinsic value are estimated and published. In addition, there are
              scientific measurement standards and equations to determine the chemical properties of
              oil and natural gas which can then be used to calculate the carbon dioxide equivalent
              for sequestered oil and natural gas volumes. The U.S. Environmental Protection Agency
              (EPA) uses an estimate of 0.43 tonnes of CO<sub>2</sub> generated from a typical
              barrel of oil produced in the U.S.
            </>
          }
        />
        <LandingAdvantagesCarouselItem
          id="carousel-4"
          icon={<ArticleSearchIcon width={24} height={24} />}
          title="Additional"
          image="images/carousel-adv-4.png"
          description="Without the CarbonPath carbon credit token as a financial incentive, the oil and gas operator will continue to produce the well or sell the well to someone who will, until the well reaches the end of its productive life (often much less than one barrel of oil per day)."
        />
        <LandingAdvantagesCarouselItem
          id="carousel-5"
          icon={<ItemTagIcon />}
          title="Unique"
          image="images/carousel-adv-5.png"
          description={
            <>
              CarbonPath uses a{' '}
              <Tooltip
                id="Proof-of-stake"
                hoverText="CarbonPath uses a Proof-of-stake consensus mechanism (POS) on the Celo blockchain to create a unique ERC-721 non-fungible token (NFT) for each well. Once the number of tonnes has been calculated and verified, ERC-20 fungible tokens (CarbonPath carbon credit tokens) are airdropped from the well NFT. Each token represents one tonne of carbon emission removed, thereby preserving the unique nature, open transparency, and invulnerability to fraud for the credits while allowing them to be bought, sold, or retired as a fungible token."
                text="Proof-of-stake consensus mechanism (POS)"
                afterShow={onTooltipShow}
                afterHide={onTooltipHide}
              />{' '}
              on the Celo blockchain to create a unique{' '}
              <Tooltip
                id="ERC-721 non-fungible token (NFT)"
                hoverText="ERC-721 is an open standard that describes how to build Non-Fungible Tokens (NFTs) on EVM (Ethereum Virtual Machine) compatible blockchains. NFTs are exclusively unique and one NFT cannot replace another. CarbonPath uses NFTs to represent individual oil and gas wells."
                text="ERC-721 non-fungible token (NFT)"
                afterShow={onTooltipShow}
                afterHide={onTooltipHide}
              />{' '}
              for each well. Once the number of tonnes has been calculated and verified,{' '}
              <Tooltip
                id="ERC-20 fungible tokens"
                hoverText="ERC-20 is an open standard that describes how to build Fungible Tokens on EVM (Ethereum Virtual Machine) compatible blockchains. ERC-20 Tokens have a property that makes each Token exactly the same (in type and value) as another. CarbonPath uses ERC-20 Tokens to represent 1 tonne of carbon emission removed."
                text="ERC-20 fungible tokens"
              />{' '}
              &#40;CarbonPath carbon credit tokens&#41; are airdropped from the well NFT. Each token
              represents one tonne of carbon emission removed, thereby preserving the unique nature,
              open transparency, and invulnerability to fraud for the credits while allowing them to
              be bought, sold, or retired as a fungible token.
            </>
          }
        />
        <LandingAdvantagesCarouselItem
          id="carousel-6"
          icon={<SettingsIcon width={24} height={24} />}
          title="Verifiable"
          image="images/carousel-adv-6.png"
          description={
            <>
              CarbonPath will rely on a two-step independent certification of the oil and natural
              gas reserve volumes and their carbon dioxide equivalency impact for each project by
              licensed and experienced{' '}
              <Tooltip
                id="3rd party auditors"
                hoverText="A 3rd party petroleum reserves auditor is a licensed professional engineer that receives credentials from a state regulatory body because they demonstrate a commitment to the highest standard of engineering practice. Each has experience with calculating petroleum quantities in the ground and the associated recoverable portion of those quantities from individual wells. These auditors routinely provide petroleum quantities for use by governments, regulatory authorities, and banks across the globe."
                text="3rd party petroleum reserves auditors"
                afterShow={onTooltipShow}
                afterHide={onTooltipHide}
              />{' '}
              and{' '}
              <Tooltip
                id="chemical lab"
                hoverText="Chemical laboratories have all the necessary equipment for preparation of samples of gas, liquid and solid which includes oil and natural gas.  These laboratories adhere to standards for various qualitative (what is present) and quantitative (how much of each component is present) sample analyses. Analysis of a sample reveals the chemical composition of a substance with absolute certainty."
                text="chemical laboratories."
                afterShow={onTooltipShow}
                afterHide={onTooltipHide}
              />
            </>
          }
        />
      </Slider>
      <button
        className="absolute top-0 bottom-20 hidden lg:flex items-center justify-center p-2 md:p-4 m-auto text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0  bg-carbon-path-cyan rounded-full w-fit h-fit z-10"
        type="button"
        onClick={() => advantagesCarouselRef.current.slickPrev()}
      >
        <LeftArrowIcon className="h-6 w-6" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="absolute top-0 bottom-20 hidden lg:flex items-center justify-center p-2 md:p-4 m-auto text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0 bg-carbon-path-cyan rounded-full w-fit h-fit z-10"
        type="button"
        onClick={() => advantagesCarouselRef.current.slickNext()}
      >
        <RightArrowIcon className="h-6 w-6" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}

export default LandingAdvantagesCarousel
