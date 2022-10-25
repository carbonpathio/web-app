import classNames from 'classnames'
import React from 'react'

interface Props {
  className: string
  topText: string
  topTextLink?: string
  bottomText: string | React.ReactNode
  source1Title: string
  source1: string
  source2Title: string
  source2: string
}

const LandingImpactCarouselItem: React.FC<React.PropsWithChildren<Props>> = ({
  className: extraClassName,
  topText,
  topTextLink,
  bottomText,
  source1Title,
  source1,
  source2Title,
  source2,
}) => {
  const className = classNames(
    [
      'w-auto',
      'bg-no-repeat',
      'rounded-3xl',
      'flex',
      'flex-col',
      'h-[580px]',
      'mt-16',
      'mb-10',
      'mx-1',
      'py-14',
      'bg-cover',
      'lg:w-[95%]',
      'lg:flex-row',
      'lg:py-0',
    ],
    extraClassName
  )

  return (
    <div className={classNames('p-10', className)}>
      <div className="w-full lg:h-full lg:flex lg:flex-col lg:w-[55%] lg:pt-16">
        <h6 className="font-montserrat text-sm md:text-lg font-bold leading-none text-white">
          WHAT IS
        </h6>
        <h1 className="font-montserrat text-6xl lg:text-[5.5rem] leading-tight font-bold text-white align pb-2">
          2.4 Billion
        </h1>
        <h6 className="font-montserrat text-sm md:text-lg font-bold leading-none text-white">
          METRIC TONS OF CARBON &#40;mtCO<sub>2</sub>e&#41;
          <br />
          <span className="italic font-medium">6,000/well x 400,000 wells</span>
        </h6>

        <div className="hidden font-inter font-bold text-[10px] leading-[19px] tracking-normal h-full relative w-[105%] text-white break-all lg:flex lg:flex-col lg:justify-end lg:pb-[20px]">
          <span>Sources:</span>
          <div>
            <span>{source1Title} - </span>
            <span className="font-normal">{source1}</span>
          </div>
          <div>
            <span>{source2Title} - </span>
            <span className="font-normal">{source2}</span>
          </div>
        </div>
      </div>

      <div className="mt-10 mb-2 self-center lg:pt-16 xl:pt-20 lg:pl-14 lg:mt-72 lg:mb-8">
        <div className="relative lg:max-w-[480px]">
          <div className="bg-black/40 rounded-3xl backdrop-blur-sm absolute w-full h-full z-0" />
          <div className="p-6 h-full z-10 relative md:p-8">
            {topTextLink ? (
              <a
                href={topTextLink}
                rel="noreferrer"
                target="_blank"
                className="font-lato font-bold text-3xl text-white underline decoration-2 underline-offset-4"
              >
                {topText}
              </a>
            ) : (
              <div className="font-lato font-bold text-3xl text-white">{topText}</div>
            )}

            <div className="font-lato font-medium text-sm text-white pt-6">{bottomText}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingImpactCarouselItem
