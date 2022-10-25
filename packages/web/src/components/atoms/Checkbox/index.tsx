import classNames from 'classnames'
import React from 'react'
import CheckIcon from '../../../assets/icons/CheckIcon'

type Props = React.InputHTMLAttributes<HTMLElement> & {
  checkboxLabel?: string
}

const Checkbox: React.FC<Props> = ({
  className: extraClassName,
  checked: isChecked,
  onChange: setIsChecked,
  id: checkboxID,
  checkboxLabel,
  ...rest
}) => {
  return (
    <div className={extraClassName}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={setIsChecked}
        id={checkboxID}
        className="hidden"
        {...rest}
      />
      <label htmlFor={checkboxID} className="flex justify-start align-center cursor-pointer">
        <div
          className={classNames('inline-flex w-[20px] h-[20px] mr-2 border-2 rounded-[4px]', {
            'bg-[#ECEFFA] border-[#333333]': !isChecked,
            'bg-[#333333] border-[#333333]': isChecked,
          })}
        >
          <CheckIcon className="self-center stroke-[#EFEFEF] fill-transparent w-8 h-8 rounded-md p-1" />
        </div>
        <span className="self-center text-[#333333]">{checkboxLabel}</span>
      </label>
    </div>
  )
}

Checkbox.displayName = 'Checkbox'
export default Checkbox
