import classNames from 'classnames'
import React, { createRef, useImperativeHandle, useState } from 'react'
import Slider from 'react-slick'
import { MAX_TABLET_WIDTH } from '../../../../constants/width'
import useWindowSize from '../../../../hooks/useWindowSize'
import LandingForYouCarouselItem from '../../CarouselItems/LandingForYouCarouselItem'
import { carouselSettingsDesktopBase, carouselSettingsMobile } from '../const'

interface Props {
  carouselCardHeight: string
  textData: {
    title: string
    description: string | React.ReactNode
  }[]
}

type RefType = {
  reset: () => void
}

const LandingForYouCarousel = React.forwardRef<RefType, Props>(
  ({ carouselCardHeight, textData }, ref) => {
    const [companiesCarouselSlide, setCompaniesCarouselSlide] = useState(0)
    const whoCarouselRef = createRef<Slider>()

    const windowSize = useWindowSize()
    const customDots = {
      customPaging: (index) => (
        <div
          className={classNames(
            'h-2 w-2 rounded-full -mt-4 sm:mt-0',
            index === companiesCarouselSlide ? 'bg-carbon-path-bluegrey' : 'bg-[#DADADA]'
          )}
        />
      ),
      afterChange: (current) => setCompaniesCarouselSlide(current),
    }

    useImperativeHandle(ref, () => ({
      reset: () => {
        whoCarouselRef.current.slickGoTo(0)
        setCompaniesCarouselSlide(0)
      },
    }))

    const companiesCarouselSettingsDesktop = {
      ...carouselSettingsDesktopBase,
      autoplaySpeed: 8500,
      ...customDots,
    }

    const companiescarouselSettingsMobile = {
      ...carouselSettingsMobile,
      autoplaySpeed: 8500,
      ...customDots,
    }
    const companiesCarouselSettings = () => {
      if (windowSize.width <= MAX_TABLET_WIDTH) {
        return companiescarouselSettingsMobile
      } else {
        return companiesCarouselSettingsDesktop
      }
    }

    return (
      <Slider
        ref={whoCarouselRef}
        {...companiesCarouselSettings()}
        className="pb-6 -mx-2 lg:mx-0 lg:pt-8 lg:w-[95%] lg:ml-4"
      >
        {textData.map((item, index) => (
          <LandingForYouCarouselItem
            key={index}
            cardHeight={carouselCardHeight}
            titleAccesory={`${index + 1}/${textData.length}`}
            title={item.title}
            description={item.description}
          />
        ))}
      </Slider>
    )
  }
)

LandingForYouCarousel.displayName = 'LandingForYouCarousel'
export default LandingForYouCarousel
