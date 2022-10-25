import classNames from 'classnames'
import React, { Dispatch, SetStateAction } from 'react'
import Rodal from 'rodal'

// include styles
import 'rodal/lib/rodal.css'

type Props = {
  className?: string
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  animation?: string
  width?: number
  height?: number
  measure?: string
}

const MobileSliderModal: React.FC<React.PropsWithChildren<Props>> = ({
  className: extraClassName,
  children,
  isModalOpen,
  setIsModalOpen,
  animation = 'slideUp',
  width = 100,
  height = 60,
  measure = '%',
}) => {
  return (
    <Rodal
      className={classNames('width-full height-[60vh] mb-0', extraClassName)}
      visible={isModalOpen}
      animation={animation}
      width={width}
      height={height}
      measure={measure}
      showCloseButton={false}
      onClose={() => setIsModalOpen(false)}
    >
      <div className={classNames(extraClassName)}>{children}</div>
    </Rodal>
  )
}

MobileSliderModal.displayName = 'MobileSliderModal'
export default MobileSliderModal
