import classNames from 'classnames'
import React from 'react'

interface Props {
  cardHeight: string
  titleAccesory: string
  title: string
  description: string | React.ReactNode
}

const LandingForYouCarouselItem: React.FC<React.PropsWithChildren<Props>> = ({
  cardHeight,
  titleAccesory,
  title,
  description,
}) => {
  return (
    <div className="lg:h-[450px]">
      <div
        className={classNames(
          'bg-carbon-path-bluegrey rounded-2xl m-8 shadow-md px-6 py-10 lg:p-12 lg:rounded-none lg:bg-transparent lg:shadow-none lg:m-0',
          cardHeight
        )}
      >
        <div className="pb-4 font-lato font-bold text-white lg:text-black lg:text-2xl">
          {titleAccesory}
        </div>
        <div className="font-lato font-bold text-3xl text-white lg:w-4/5 lg:text-black lg:text-5xl">
          {title}
        </div>
        <div className="font-lato text-sm lg:text-base font-medium pt-4 text-white lg:leading-[26px] lg:pt-10 lg:w-4/5 lg:text-[#606060]">
          {description}
        </div>
      </div>
    </div>
  )
}

export default LandingForYouCarouselItem
