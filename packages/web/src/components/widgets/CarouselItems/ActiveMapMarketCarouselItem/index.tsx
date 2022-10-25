import classNames from 'classnames'
import React from 'react'

interface Props {
  id: string
  imgSrc: string
  description: string
  expand: boolean
}

const ActiveMapMarketCarouselItem: React.FC<React.PropsWithChildren<Props>> = ({
  id,
  description,
  imgSrc,
  expand,
}) => {
  return (
    <div id={id} className="relative h-full">
      <img
        src={imgSrc}
        alt="popup_photos"
        className={classNames('rounded-2xl w-full md:w-[340px] object-cover', {
          'h-[330px]': !expand,
          'h-[440px]': expand,
        })}
      />
      <div className="absolute bg-black/60 bottom-0 h-[56px] w-full md:w-[340px] content-center rounded-b-2xl">
        <div className="flex flex-row py-4 px-4">
          <span className=" w-full  flex-grow text-center font-bold text-white">{description}</span>
        </div>
      </div>
    </div>
  )
}

export default ActiveMapMarketCarouselItem
