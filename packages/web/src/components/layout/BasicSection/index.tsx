import classNames from 'classnames'
import React from 'react'

interface Props {
  className: any
  widthAdj?: string
  sectionTitleWidth?: string
  bottomTextWidth?: string
  topText: any
  bottomText: any | React.ReactNode
  sectionTitle: any
}

const BasicSection: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
  widthAdj,
  sectionTitleWidth,
  bottomTextWidth,
  topText,
  sectionTitle,
  bottomText,
}) => {
  return (
    <div className={classNames(className)}>
      <div className={classNames('px-6 md:pr-28 md:px-0', widthAdj)}>
        <div className="w-fit font-montserrat py-1 text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-carbon-path-green to-carbon-path-blue">
          {topText}
        </div>
        <div
          className={classNames(
            'w-fit font-montserrat text-4xl md:text-[4rem] leading-[1.25] font-bold text-transparent bg-clip-text bg-gradient-to-r from-carbon-path-green to-carbon-path-blue',
            sectionTitleWidth
          )}
        >
          {sectionTitle}
        </div>
        <div
          className={classNames(
            'font-lato font-medium text-base text-[#606060] pt-6 md:pb-0 md:max-w-[680px]',
            bottomTextWidth
          )}
        >
          {bottomText}
        </div>
      </div>
      {children}
    </div>
  )
}

export default BasicSection
