import config from '@carbonpath/shared/lib/config'
import React from 'react'
import Lottie from 'react-lottie'
import arrow from '../../../assets/animations/arrow.json'
import opacityA from '../../../assets/animations/opacityA.json'
import opacityB from '../../../assets/animations/opacityB.json'
import CarbonPathWhiteIcon from '../../../assets/icons/CarbonPathWhiteIcon'
import ContactUsIcon from '../../../assets/icons/ContactUsIcon'
import LinkedInIcon from '../../../assets/icons/LinkedInIcon'
import RightSmallArrowIcon from '../../../assets/icons/RightSmallArrowIcon'
import ScrollIcon from '../../../assets/icons/ScrollIcon'
import TwitterIcon from '../../../assets/icons/TwitterIcon'
import { MIN_DESKTOP_WIDTH } from '../../../constants/width'
import useWindowSize from '../../../hooks/useWindowSize'
import Button from '../../atoms/Button'
import Tooltip from '../../atoms/Tooltip'
import BasicLayout from '../../layout/BasicLayout'
import BasicSection from '../../layout/BasicSection'
import LandingAdvantagesCarousel from '../../widgets/Carousels/LandingAdvantagesCarousel'
import LandingForYouCarouselSet from '../../widgets/Carousels/LandingForYouCarouselSet'
import LandingImpactCarousel from '../../widgets/Carousels/LandingImpactCarousel'
import LandingMethodologyCarousel from '../../widgets/Carousels/LandingMethodologyCarousel'
import LandingFaqs from '../../widgets/LandingPageFaqs'
import LandingMethodIcons from '../../widgets/LandingPageMethodIcons'
import LandingPartnerIcons from '../../widgets/LandingPagePartnerIcons'

const Home: React.FC = () => {
  const isProd = config.appConfig === 'prod'
  const windowSize = useWindowSize()

  const lottieHeight =
    windowSize.width < MIN_DESKTOP_WIDTH ? windowSize.width * 1.3 : 0.74 * 0.6733 * windowSize.width
  const lottieWidth =
    windowSize.width < MIN_DESKTOP_WIDTH ? windowSize.width * 1.3 : 0.74 * windowSize.width

  const opacityAOptions = {
    loop: true,
    autoplay: true,
    animationData: opacityA,
  }

  const opacityBOptions = {
    loop: true,
    autoplay: true,
    animationData: opacityB,
  }

  const arrowOptions = {
    loop: true,
    autoplay: true,
    animationData: arrow,
  }

  return (
    <BasicLayout>
      <div className="bg-white">
        {/* HERO */}
        <div className="bg-white relative bg-contain bg-top bg-no-repeat w-full overflow-hidden max-w-[2560px] mx-auto min-h-[95vh] sm:bg-hero-bg md:bg-[length:65%] md:flex md:flex-col md:bg-right-top md:min-h-[90vh]">
          <div className="absolute block z-[20] right-[-1rem] sm:z-0 sm:right-[-5rem] sm:top-[-5rem] 3xl:right-[-8rem] 3xl:top-[-8rem]">
            <Lottie options={opacityAOptions} height={lottieHeight} width={lottieWidth} />
          </div>
          <div className="absolute block z-[20] right-[-1rem] sm:z-0 sm:right-[-5rem] sm:top-[-5rem] 3xl:right-[-8rem] 3xl:top-[-8rem]">
            <Lottie options={opacityBOptions} height={lottieHeight} width={lottieWidth} />
          </div>
          <img
            className="w-full relative -top-28 sm:hidden"
            src="images/hero-bg-mobile.png"
            alt="hero_background"
          />

          <div className="px-6 -mt-12 sm:pt-64 md:px-24 xl:mt-20 2xl:mt-30 relative z-10">
            <div className="w-fit font-montserrat text-xl sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-carbon-path-green to-carbon-path-blue">
              WELCOME TO
            </div>
            <div className="w-fit font-montserrat text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-carbon-path-green to-carbon-path-blue pt-1">
              CARBON
              <br className="lg:hidden" />
              PATH
            </div>
            <div className="flex font-lato font-medium text-[#606060] mt-8 max-w-[680px]">
              <span className="block">
                We are attacking climate change by reducing{' '}
                <Tooltip
                  id="carbon dioxide"
                  hoverText="Carbon Dioxide is a colorless, odorless gas that is present in the atmosphere and is formed when any fuel containing carbon is burned. It is also the product of respiration and consumed by plants during photosynthesis."
                  text={<span className="underline">carbon dioxide</span>}
                  textStyle="font-lato font-medium no-underline"
                />{' '}
                (CO<sub>2</sub>) and{' '}
                <Tooltip
                  id="methane"
                  hoverText="Methane is emitted during the production and transport of coal, natural gas, and oil. Methane emissions also result from livestock and other agricultural practices, land use and by the decay of organic waste in municipal solid waste landfills."
                  text={<span className="underline">methane</span>}
                  textStyle="font-lato font-medium no-underline"
                />{' '}
                (CH<sub>4</sub>) emissions in the atmosphere at the source, by providing a framework
                to permanently shutting down low-producing, orphaned, and abandoned oil and natural
                gas wells.
              </span>
            </div>
            <div className="flex flex-col gap-y-[18px] align-middle items-start md:items-center pt-[40px] md:pt-[60px] md:flex-row">
              <a
                href="https://carbonpath.notion.site/CarbonPath-Lite-Paper-v0-64c69efd06a44adc986f0ebcfdeb66b8"
                rel="noreferrer"
                target="_blank"
                className="cursor-pointer mr-[30px]"
              >
                <ScrollIcon className="inline stroke-carbon-path-bluestroke mb-1 mr-2" />
                <span className="text-carbon-path-bluestroke font-lato font-bold text-[16px] leading-5 tracking-normal">
                  Read our lite paper
                </span>
              </a>

              <a
                href="https://fstrdy98iph.typeform.com/to/zYMNF8tV"
                rel="noreferrer"
                target="_blank"
                className="cursor-pointer mr-10"
              >
                <ContactUsIcon className="inline stroke-carbon-path-bluestroke mb-1 mr-2" />
                <span className="text-carbon-path-bluestroke font-lato font-bold text-[16px] leading-5 tracking-normal">
                  Contact us
                </span>
              </a>

              <div className="flex flex-row">
                <a
                  href="https://www.linkedin.com/company/carbon-path/"
                  rel="noreferrer"
                  target="_blank"
                  className="cursor-pointer order-2 md:order-1 mr-2 md:mr-6"
                >
                  <LinkedInIcon className="inline mb-1" />
                </a>

                <a
                  href="https://twitter.com/CarbonPath_io"
                  rel="noreferrer"
                  target="_blank"
                  className="cursor-pointer order-1 md:order-2 mr-[17px] md:mr-2"
                >
                  <TwitterIcon className="inline fill-carbon-path-bluestroke mb-1" />
                </a>
              </div>
            </div>
            <div className="text-center pt-[60px] sm:hidden">
              {isProd ? (
                <Button variant="cyan" className="w-full transition prod-button rounded-xl">
                  <span className="font-montserrat font-bold uppercase prod-launch text-carbon-path-blue">
                    Launch App
                  </span>
                  <span className="font-montserrat font-bold uppercase hidden prod-soon text-white">
                    Coming Soon
                  </span>
                </Button>
              ) : (
                <Button href={'/marketplace'} variant="cyan" className="w-full rounded-xl">
                  <span className="font-montserrat font-bold uppercase text-carbon-path-blue">
                    Launch App
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="sm:hidden w-12 h-0 border-carbon-path-green border-2 mx-auto mt-28" />
        <div className="hidden bg-white md:flex w-full max-w-[2560px] mx-auto py-2 flex-col items-center">
          <div className="absolute z-20">
            <Lottie options={arrowOptions} height={24} width={43} />
          </div>
        </div>

        {/* METHODOLOGY */}
        <BasicSection
          className="bg-white max-w-[2560px] mx-auto flex flex-col md:flex-row items-center px-0 md:px-24 3xl:px-36 pt-14 md:pt-48 md:pb-[120px] shadow-[0px_4px_14px_rgba(96, 86, 86, 0.1)] 2xl:rounded-b-3xl"
          bottomTextWidth="md:min-w-1/2 md:max-w-[680px]"
          topText="METHODOLOGY"
          sectionTitle="HOW IT WORKS?"
          bottomText="We have developed a methodology that has been highly scrutinized, peer reviewed, and leverages existing best practices to create one of the highest quality carbon credit tokens available today!"
        ></BasicSection>

        {/* 4 icons */}
        <div className="bg-white mx-auto pt-24 md:pt-0 pb-[28px] text-center 2xl:rounded-3xl md:px-24">
          <LandingMethodIcons />
          <LandingMethodologyCarousel />
        </div>

        {/* ADVANTAGES */}
        <BasicSection
          className="w-full max-w-[2560px] mx-auto py-20 md:pt-44 md:pb-28 md:px-[6.25rem] bg-[#f4f4f4] "
          bottomTextWidth="md:min-w-1/2 md:max-w-[680px]"
          topText="ADVANTAGES"
          sectionTitle={['WHY CARBON', <br key="br" className="md:hidden" />, 'PATH?']}
          bottomText={
            <>
              We adhere to the strict standards set by{' '}
              <Tooltip
                id="ICROA"
                hoverText="ICROA (International Carbon Reduction & Offset Alliance) is a non-profit initiative housed within the International Emissions Trading Association (IETA)."
                text="ICROA"
                textStyle="font-lato font-medium text-sm md:text-base"
              />{' '}
              to provide assurance that the impact you are funding is real, permanent, quantifiable,
              additional, unique & verifiable.
            </>
          }
        >
          <div className="md:flex md:justify-center">
            <LandingAdvantagesCarousel />
          </div>
        </BasicSection>

        {/* IMPACT */}
        <BasicSection
          className="w-full max-w-[2560px] pt-20 pb-28 overflow-hidden bg-white shadow-[0px_4px_14px_rgba(96, 86, 86, 0.1)] md:py-44 md:px-[6.25rem] 2xl:rounded-3xl"
          bottomTextWidth="md:min-w-1/2 md:max-w-[680px]"
          topText="IMPACT"
          sectionTitle="WHY DOES IT MATTER?"
          bottomText={
            <>
              There are over 2.2 Million{' '}
              <Tooltip
                id="orphaned & abandoned wells"
                hoverText="Abandoned and orphaned wells are inactive oil and natural gas wells that are distinguished as either having an owner (abandoned) or not (orphaned). Orphaned wells have defaulted to the ownership of the state in which they reside or federal government, if they reside on federal lands."
                text="orphaned & abandoned wells"
              />
              , twice as many as active producing wells in the United States. There are another
              750,000 wells that produce less than 15 barrels of oil equivalent per day and every
              year over 4,000 of those wells become orphaned or abandoned. We estimate that
              low-producing, orphaned, & abandoned wells contribute 4.7 million tonnes of CH
              <sub>4</sub> each year and low producing wells will be responsible for 2.4 billion
              tonnes of future CO<sub>2</sub> emissions.
            </>
          }
        >
          <div className="md:pb-9" />
          <div className="md:flex md:justify-center">
            <LandingImpactCarousel />
          </div>
        </BasicSection>
        {/* WHO */}
        <BasicSection
          className="w-full max-w-[2560px] mx-auto pt-20 pb-20 md:pt-[180px] md:pb-[220px] md:px-[4.5rem] xl:px-[6rem] bg-[#f4f4f4]"
          bottomTextWidth="lg:min-w-1/2 lg:max-w-[680px]"
          topText="WHO"
          sectionTitle="CARBONPATH FOR YOU"
          bottomText="With CarbonPath, you can help stop the largest source of greenhouse gases at the source, by permanently shutting down low-producing, orphan, and abandoned oil and gas wells."
        >
          <LandingForYouCarouselSet />
        </BasicSection>

        <div className="bg-white max-w-[2560px] mx-auto">
          <div className="max-w-[1080px] px-6 xl:px-0 pt-14 md:pt-48 pb-28 md:pb-[220px] md:mx-auto">
            <div className="px-2 pb-9 md:pb-20">
              <h2 className="text-left md:text-center font-lato text-3xl md:text-[44px] leading-snug font-bold bg-clip-text bg-gradient-to-r from-carbon-path-green to-carbon-path-blue">
                <span className="text-transparent">CarbonPath</span> is building a bridge to the
                regenerative economy of tomorrow by addressing industrial carbon emissions.
              </h2>
            </div>
            <div className="flex flex-col md:flex-row justify-between pb-14 md:pb-0">
              <div className="px-0 pb-4 font-lato font-medium text-base text-[#606060] md:pr-7 md:pb-0 w-full md:w-6/12">
                To create immediate impact and disrupt the status quo, we offer a{' '}
                <Tooltip
                  id="Web3"
                  hoverText="Web3 represents the third iteration of the internet that incorporates concepts such as dencentralization, blockchain technologies, and token-based economics"
                  text="Web3"
                  textStyle="font-lato font-medium"
                />{' '}
                marketplace as a mechanism for businesses and individuals to buy, sell, and retire
                tokens. These tokens are created as tangible and immutable assets that validate the
                permanent decommisioning of oil and natural gas wells.
              </div>
              <div className="px-0 font-lato font-medium text-base text-[#606060] md:pl-7 w-full md:w-6/12">
                By placing these tokens on-chain, we are creating an elegant solution to provide
                transparency into the permanence,{' '}
                <Tooltip
                  id="additionality"
                  hoverText="In the context of environmental economics, additionality is the process of assessing whether emissions from a proposed activity will be different than baseline emissions, or “business as usual”."
                  text="additionality"
                  textStyle="font-lato font-medium"
                />
                , verification, and validation of the entire process. Through our easy to use
                platform, the impact of our projects will be widely accessible and easily
                understood.
              </div>
            </div>
            <div className="md:hidden w-12 h-0 border-carbon-path-green border-2 mx-auto" />
          </div>
        </div>

        {/* Celo Section */}
        <div className="bg-white max-w-[2560px] py-[80px] md:py-[180px] mx-auto text-center shadow-md 2xl:rounded-t-3xl">
          <div className="flex flex-col justify-center items-center">
            <div className="max-w-[680px] flex flex-row justify-center items-center pb-[24px] md:pb-[40px]">
              <span className="font-lato font-bold my-auto text-3xl text-carbon-path-gray pr-4 md:text-5xl">
                Built on
              </span>
              <img
                src={`images/celo-logo${
                  windowSize.width <= MIN_DESKTOP_WIDTH ? '-mobile' : ''
                }.png`}
                alt="celo-logo"
              />
            </div>
            <div className="max-w-[680px] font-lato font-bold text-base text-[#606060] pb-6 px-4 md:px-0">
              The worlds first carbon negative blockchain.
            </div>
            <div className="max-w-[700px] font-lato leading-[26px] font-medium text-sm md:text-base text-[#606060] px-8 md:px-0 mx-auto pb-12">
              Through our partnership with Celo, we have established amazing relationships within
              the community and ecosystem. We are commited to support our fellow{' '}
              <Tooltip
                id="ReFi (Regenerative Finance)"
                hoverText="ReFi or Regenerative Finance is the process of using various forms of capital to drive systematic, sustainable, and positive change for all stakeholders and the natural environment."
                text="ReFi (Regenerative Finance)"
                textStyle="break-all"
              />{' '}
              pioneers, offer our solution to fight climate change, and champion the wide variety of
              solutions that are necessary to make significant impact and save our planet.
            </div>
            <a
              className="max-w-[680px] flex flex-row justify-center items-center font-lato font-bold text-base text-[#182B51]"
              href="http://www.celo.org"
              rel="noreferrer"
              target="_blank"
            >
              <span className="mr-2">Visit www.celo.org</span>
              <RightSmallArrowIcon />
            </a>
          </div>
        </div>

        <div className="w-full max-w-[2560px] mx-auto">
          <div className="flex bg-landing-pic-3 bg-cover justify-center items-center h-[480px] md:h-[660px] 2xl:bg-center">
            <div className="mx-6 py-24 md:py-28 text-center">
              <CarbonPathWhiteIcon className="mx-auto mb-4 md:mb-10" />
              <h2 className="font-lato font-bold text-4xl mb-14 text-white md:mx-0">
                We would love to hear from you.
              </h2>
              <div className="w-full md:flex justify-center md:w-1/2 md:mx-auto">
                <Button
                  href={'https://fstrdy98iph.typeform.com/to/zYMNF8tV'}
                  variant="cyan"
                  className="rounded-xl"
                  target="_blank"
                >
                  <span className="font-montserrat font-bold text-carbon-path-blue">
                    GET IN TOUCH
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* BLOG ARTICLES */}
        {/* <BasicSection
            className="bg-[#f4f4f4] max-w-[2560px] mx-auto pt-16 px-0 pb-16 md:pt-44 md:pb-56 md:px-24"
            sectionTitle="LATEST FROM THE ECOSYSTEM"
            topText="NEWS"
            bottomText=""
          >
            <LandingPageBlogTile />

            <Button variant="cyan" className="font-montserrat font-bold rounded-xl mx-auto">
              VIEW ALL ARTICLES
            </Button>
          </BasicSection> */}

        {/* PARTNERS */}
        <BasicSection
          className="w-full max-w-[2560px] bg-white text-center md:text-left mx-auto py-20 md:py-28 px-8 md:px-[6.25rem]"
          topText="PARTNERSHIPS & INVESTORS"
          widthAdj="w-fit mx-auto md:mx-0"
          sectionTitle=""
          bottomText=""
        >
          <LandingPartnerIcons />
        </BasicSection>

        {/* FAQ */}
        <BasicSection
          className="w-full max-w-[2560px] mx-auto pt-20 pb-28 bg-[#f4f4f4] md:py-48 md:px-[6.25rem]"
          topText="FAQ"
          sectionTitle="LEARN MORE"
          bottomText=""
        >
          <LandingFaqs />
        </BasicSection>

        {/* CTA 2 */}
        <div className="bg-landing-pic-4-mobile md:bg-landing-pic-4 bg-cover">
          <div className="mx-7 md:w-5/12 md:mx-auto py-20 md:pt-[180px] md:pb-[220px] text-center">
            <h2 className="font-lato font-bold text-3xl md:text-4xl pb-6 text-white">
              Ready to Make an Impact?
            </h2>
            <p className="font-lato font-medium text-base text-white mb-14">
              We plug the dirtiest source of CO<sub>2</sub> by incentivising the early shutdown of
              oil and gas wells, stopping tons of source carbon from entering the atmosphere.
            </p>

            {isProd ? (
              <Button
                variant="cyan"
                className="text-carbon-path-blue rounded-xl w-full transition prod-button md:w-fit md:mx-auto"
              >
                <span className="font-montserrat font-bold uppercase prod-launch text-carbon-path-blue">
                  Launch App
                </span>
                <span className="font-montserrat font-bold uppercase hidden prod-soon text-white">
                  Coming Soon
                </span>
              </Button>
            ) : (
              <Button
                href={'/marketplace'}
                variant="cyan"
                className="rounded-xl text-carbon-path-blue md:w-fit md:mx-auto"
              >
                <span className="font-montserrat font-bold uppercase text-carbon-path-blue">
                  Launch App
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}

export default Home
