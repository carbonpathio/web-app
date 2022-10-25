import classNames from 'classnames'
import { useState } from 'react'
import Slider from 'react-slick'
import { MAX_TABLET_WIDTH } from '../../../../constants/width'
import useWindowSize from '../../../../hooks/useWindowSize'
import LandingImpactCarouselItem from '../../CarouselItems/LandingImpactCarouselItem'
import { carouselSettingsDesktopBase, carouselSettingsMobile } from '../const'

const LandingImpactCarousel: React.FC = () => {
  const [impactCarouselSlide, setImpactCarouselSlide] = useState(0)

  const customDots = {
    customPaging: (index) => (
      <div
        className={classNames(
          '-translate-x-[20px] h-2 w-2 mt-4 rounded-full md:mt-0',
          index === impactCarouselSlide ? 'bg-carbon-path-bluegrey' : 'bg-[#DADADA]'
        )}
      />
    ),
    afterChange: (current) => setImpactCarouselSlide(current),
  }

  const impactCarouselSettingsDesktop = {
    ...carouselSettingsDesktopBase,
    autoplaySpeed: 6000,
    ...customDots,
  }

  const impactCarouselSettingsMobile = {
    ...carouselSettingsMobile,
    autoplaySpeed: 6000,
    ...customDots,
  }

  const windowSize = useWindowSize()
  const impactCarouselSettings = () => {
    if (windowSize.width <= MAX_TABLET_WIDTH) {
      return impactCarouselSettingsMobile
    } else {
      return impactCarouselSettingsDesktop
    }
  }

  return (
    <Slider {...impactCarouselSettings()} className="w-full px-5 md:max-w-[1260px]">
      <LandingImpactCarouselItem
        className={`bg-impact-1`}
        topText="46% of the U.S. Population"
        topTextLink="https://www.eia.gov/environment/emissions/state/"
        bottomText="The annual carbon footprint of 151.2 million Americans in 40 states!"
        source1Title="Emissions Data"
        source1="U.S. Energy Information Association https://www.eia.gov/environment/emissions/state/"
        source2Title="Census Data"
        source2="U.S. Census Bureau https://www.census.gov/data/tables/time-series/demo/popest/2020s-state-total.html"
      />
      <LandingImpactCarouselItem
        className={`bg-impact-2`}
        topText="590,000,000 Electric Cars"
        topTextLink="https://www.spglobal.com/marketintelligence/en/news-insights/latest-news-headlines/global-electric-vehicle-sales-doubled-us-made-ev-comeback-in-2021-70489884"
        bottomText="35x the number of electric vehicles on the road worldwide in 2021!"
        source1Title="Cars equivalent"
        source1="U.S. Energy Protection Agency GHG Equivalency Calculator"
        source2Title="EVs on road in 2021"
        source2="S&P Global - https://www.spglobal.com/marketintelligence/en/news-insights/latest-news-headlines/global-electric-vehicle-sales-doubled-us-made-ev-comeback-in-2021-70489884"
      />
      <LandingImpactCarouselItem
        className={`bg-impact-3`}
        topText="3.5x All U.S. Forests"
        topTextLink="https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator"
        bottomText={
          <>
            Has the potential to sequester more carbon than do{' '}
            <a
              href="https://www.fs.fed.us/sites/default/files/fs_media/fs_document/publication-15817-usda-forest-service-fia-annual-report-508.pdf"
              rel="noreferrer"
              target="_blank"
              className="underline underline-offset-2"
            >
              all U.S. Forest
            </a>{' '}
            combined in a year 3.5 times over!
          </>
        }
        source1Title="Forest equivalent (2.84 billion acres) - U.S. Energy Protection Agency GHG Equivalency Calculator"
        source1="https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator"
        source2Title="Amount of forest in US (818.8 million acres) - US Forest Service which is a division of the US Department of Agriculture (USDA)"
        source2="https://www.fs.fed.us/sites/default/files/fs_media/fs_document/publication-15817-usda-forest-service-fia-annual-report-508.pdf"
      />
    </Slider>
  )
}

export default LandingImpactCarousel
