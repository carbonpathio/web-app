import classNames from 'classnames'
import React from 'react'

interface Props {
  title: string
  description: string
  backgroundClassName: string
}

const LandingForYouPhotoText: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  description,
  backgroundClassName,
}) => {
  return (
    <div
      className={classNames(
        'relative h-0 mx-6 pb-[80%] bg-contain bg-no-repeat px-10 pt-6 lg:pb-[86%] lg:mx-0',
        backgroundClassName
      )}
    >
      <span className="font-montserrat font-bold text-3xl pt-10 text-white md:text-5xl lg:pt-16">
        {title}
      </span>
      <p className="font-lato text-lg text-white absolute hidden bottom-10 pr-10 lg:block">
        {description}
      </p>
    </div>
  )
}

export default LandingForYouPhotoText
