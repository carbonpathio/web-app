import React, { useRef, useState } from 'react'
import Tooltip from '../../../atoms/Tooltip'
import LandingForYouCarousel from '../LandingForYouCarousel'
import LandingForYouPhotoText from '../LandingForYouCarousel/PhotoText'
import LandingForYouSelector from './ForYouSelector'

const LandingForYouCarouselSet: React.FC<React.PropsWithChildren> = () => {
  const [forYouSelect, setForYouSelect] = useState('companies')
  const selectForYouRef = useRef<any>()

  const handleForYouSelect = (whoSelected) => {
    setForYouSelect(whoSelected)
    if (selectForYouRef.current) {
      selectForYouRef.current.reset()
    }
  }

  return (
    <div className="flex flex-col items-center justify-between pt-2 md:items-center md:pt-[120px]">
      <LandingForYouSelector
        forYouSelect={forYouSelect}
        handleForYouSelect={handleForYouSelect}
        selectForYouRef={selectForYouRef}
      />

      {/* WHO CAROUSELS */}
      <div className="mt-4 w-full overflow-hidden md:mt-[20px] md:max-w-[1260px]">
        {
          {
            companies: (
              <div className="flex flex-col justify-between items-center lg:flex-row">
                <div className="lg:w-5/12 lg:mt-12">
                  <LandingForYouPhotoText
                    title="MEET YOUR NET ZERO PLEDGE"
                    description="As a company, CarbonPath can help you meet your ESG goals. Adding CarbonPath carbon credit tokens to your existing nature-based portfolio will provide high quality offsets from source carbon."
                    backgroundClassName="bg-companies-bg"
                  />
                </div>
                <div className="my-auto w-full overflow-hidden text-black lg:w-7/12 lg:mx-0">
                  <LandingForYouCarousel
                    ref={selectForYouRef}
                    carouselCardHeight="h-[350px] sm:h-[290px] md:h-auto"
                    textData={[
                      {
                        title: 'Consistent supply to meet your goals',
                        description:
                          'Avoid having to find or renew your carbon token pipeline every year. Work with CarbonPath to secure reliable, high-quality tokens that help you meet your net zero pledges. CarbonPath can tailor multi-year plans to ensure supply for the years ahead.',
                      },
                      {
                        title: 'Best in class metrics and data delivery',
                        description:
                          'To ensure transparency, CarbonPath tokens live on the Celo blockchain. Use the CarbonPath platform to visualize data, governance and validation on demand and build custom reports based on your individual interests and organizational needs.',
                      },
                      {
                        title: 'Guaranteed Permanent',
                        description:
                          'We understand the competing priorities around sustainability and net-zero. We designed the CarbonPath token so that once issued, that carbon will never enter the atmosphere.',
                      },
                    ]}
                  />
                </div>
              </div>
            ),
            individuals: (
              <div className="flex flex-col justify-between items-center lg:flex-row">
                <div className="lg:w-5/12 lg:mt-12">
                  <LandingForYouPhotoText
                    title="MAXIMISE YOUR PERSONAL IMPACT"
                    description="As an individual, you can now be an active participant in making a
                              difference in an arena where you might not have been able to in the
                              past."
                    backgroundClassName="bg-individuals-bg"
                  />
                </div>
                <div className="my-auto w-full max-w-[100vw] overflow-hidden lg:w-7/12 lg:mx-0 text-black">
                  <LandingForYouCarousel
                    ref={selectForYouRef}
                    carouselCardHeight="h-[350px] sm:h-[290px] md:h-auto"
                    textData={[
                      {
                        title: "Tokens for what you can't avoid",
                        description:
                          'We are human. We will always leave a footprint. CarbonPath carbon credit tokens help you reduce that footprint while you continue your journey towards a greener future.',
                      },
                      {
                        title: 'Multiply your impact',
                        description:
                          'Work with CarbonPath to design projects that meet your environmental goals from shutting down oil and natural gas wells to restoring natural ecosystems. We always make every effort to work with landowners and land stewards to restore and reclaim sites.',
                      },
                      {
                        title: 'Join the movement',
                        description: (
                          <>
                            <Tooltip
                              id="ReFi (Regenerative Finance)"
                              hoverText="ReFi or Regenerative Finance is the process of using various forms of capital to drive systematic, sustainable, and positive change for all stakeholders and the natural environment."
                              text="ReFi (Regenerative Finance)"
                            />{' '}
                            is a group of mission-driven organizations, communities, and individuals
                            empowered by blockchain technology with the goal of addressing climate
                            change, biodiversity loss and the underlying social structures that got
                            us here in the first place. In regenerative finance, circulation
                            replaces accumulation.
                          </>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
            ),
            allies: (
              <div className="flex flex-col justify-between items-center lg:flex-row">
                <div className="lg:w-5/12 lg:mt-12">
                  <LandingForYouPhotoText
                    title="HIGH IMPACT CARBON PROJECTS"
                    description="As an ally, you can fund a project to shut down a large group of orphaned and abandoned wells ensuring dramatic impact on this problem. Allies will have verifiable and immutable proof of their contribution for each well within a project."
                    backgroundClassName="bg-allies-bg"
                  />
                </div>
                <div className="my-auto w-full max-w-[100vw] overflow-hidden lg:w-7/12 lg:mx-0 text-black">
                  <LandingForYouCarousel
                    ref={selectForYouRef}
                    carouselCardHeight="h-[370px] sm:h-[260px] md:h-auto"
                    textData={[
                      {
                        title: 'Facilitate impact at scale',
                        description:
                          'Through our partnerships, we can tackle orphan well projects of almost any size, from 20 to over 400 wells. Scale allows for significant impact and you can take comfort knowing the impact of your contribution is verified, validated, and secured with the CarbonPath carbon credit token.',
                      },
                      {
                        title: 'Get in depth reporting',
                        description:
                          'To ensure transparency, our tokens live on the Celo blockchain. Use the CarbonPath platform to visualize data, governance and validation on demand and build custom reports based on your  interests and organizational needs.',
                      },
                      {
                        title: 'Add value for your stakeholders',
                        description:
                          'We no longer live in a single-bottom-line world. Environmental and social impact affect supply chain, sustainability, revenue and more. A carbon token plan creates immediate and long-term value for your foundation, business and key stakeholders.',
                      },
                    ]}
                  />
                </div>
              </div>
            ),
            partners: (
              <div className="flex flex-col justify-between items-center lg:flex-row lg:flex-1">
                <div className="lg:w-5/12 lg:mt-12">
                  <LandingForYouPhotoText
                    title="SHARE IMPACT WITH YOUR CUSTOMERS"
                    description="As a partner, you can offer CarbonPath token retirement through your business to allow consumers to offset their purchases, travel, or shipping costs."
                    backgroundClassName="bg-partners-bg self-center items-center justify-center"
                  />
                </div>
                <div className="my-auto w-full max-w-[100vw] overflow-hidden lg:w-7/12 lg:mx-0 text-black">
                  <LandingForYouCarousel
                    ref={selectForYouRef}
                    carouselCardHeight="h-[370px] sm:h-[260px] md:h-auto"
                    textData={[
                      {
                        title: 'Reliable source of tokens',
                        description:
                          'Work with CarbonPath to design projects that meet your environmental goals from shutting down leaking wells to restoring natural ecosystems. Every effort will be made to work with land stewards to restore and reclaim sites.',
                      },
                      {
                        title: 'Help your customers make a difference',
                        description:
                          'To ensure transparency and tracking, our tokens live on the Celo blockchain. As a partner, you will be able to purchase tokens directly from our platform or we will source tokens monthly, quarterly, or yearly based on your needs.',
                      },
                      {
                        title: 'Add value for your customers',
                        description:
                          'Tackling climate change is a team effort. People can become overwhelmed when they consider how they can have an impact as an individual. When companies do good, and share that opportunity with their customers, they notice and join the movement.',
                      },
                    ]}
                  />
                </div>
              </div>
            ),
          }[forYouSelect]
        }
      </div>
    </div>
  )
}

export default LandingForYouCarouselSet
