import classNames from 'classnames'
import dynamic from 'next/dynamic'
import React from 'react'

const ReactTooltip = dynamic(() => import('./shim'), {
  ssr: false,
})

type Props = {
  id: string
  text?: string | React.ReactNode
  hoverText: string
  textStyle?: string
  className?: string
  breakAll?: boolean
  width?: string
  place?: 'top' | 'right' | 'bottom' | 'left'
  afterShow?: () => void
  afterHide?: () => void
}

const Tooltip: React.FC<Props> = ({
  id,
  text,
  hoverText,
  textStyle,
  className,
  breakAll,
  place = 'bottom',
  afterShow,
  afterHide,
}) => {
  return (
    <span className={classNames('cursor-pointer', className)}>
      <span data-tip data-for={id} className="break-normal">
        <span className={classNames('underline', textStyle)}>
          <span>{text}</span>
        </span>
      </span>

      <ReactTooltip
        id={id}
        backgroundColor="#385877"
        delayShow={150}
        delayUpdate={150}
        place={place}
        multiline
        className="react-tooltip max-w-[70vw] md:max-w-sm"
        afterShow={afterShow}
        afterHide={afterHide}
      >
        <div
          className={classNames(
            'text-left',
            'font-lato',
            'text-sm',
            'font-normal',
            'text-white',
            breakAll ? 'break-all' : 'break-normal my-3'
          )}
        >
          {hoverText}
        </div>
      </ReactTooltip>
    </span>
  )
}

export default Tooltip
