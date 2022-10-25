import classNames from 'classnames'
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

type Props = {
  headerData: string
  icon?: ReactNode
  className?: string
  headerClassName?: string
  bodyClassName?: string
  displaySplit?: boolean
  buyAffect?: boolean // for Marketplace Buy only
  buyOpen?: boolean
  setBuyOpen?: Dispatch<SetStateAction<boolean>>
}

type CollapsibleDisplayProps = React.PropsWithChildren<Props>

type RefType = {
  reset: () => void
}

const CollapsibleDisplay = React.forwardRef<RefType, CollapsibleDisplayProps>(
  (
    {
      children,
      headerData,
      headerClassName,
      bodyClassName,
      icon,
      className: extraClassName,
      displaySplit = false,
      buyAffect = false,
      buyOpen = false,
      setBuyOpen,
    },
    ref
  ) => {
    const [toggle, setToggle] = useState(false)

    useImperativeHandle(ref, () => ({
      reset: () => {
        setToggle(false)
      },
    }))

    useEffect(() => {
      // impact 'Buy Token' -> open dialog
      if (buyAffect && buyOpen && !toggle) setToggle(true)

      // close dialog -> reset buyOpen
      if (buyAffect && buyOpen && toggle) setBuyOpen(false)
    }, [toggle, buyOpen, buyAffect, setBuyOpen])

    return (
      <div className={extraClassName}>
        <div className="md:accordion">
          <h2 className="accordion-header">
            <button
              className={classNames(
                'accordion-button flex flex-row px-1 mr-6 justify-between items-center w-full shadow-sm text-lg tracking-wide font-bold font-lato text-left bg-white rounded-xl transition focus:outline-none',
                {
                  collapsed: !toggle,
                  'accordion-button-faq': !displaySplit,
                  'accordion-button-split bg-white md:bg-[#ECEFFA] border-[1px] border-[#6AEAEA]':
                    displaySplit,
                }
              )}
              type="button"
              onClick={() => {
                setToggle(!toggle)
              }}
            >
              <div className="flex flex-row justify-start items-center pr-4 rounded-xl">
                {icon && (
                  <span
                    className={classNames(
                      { 'stroke-carbon-path-bluestroke': !toggle || displaySplit },
                      { 'stroke-white': toggle }
                    )}
                  >
                    {icon}
                  </span>
                )}
                <p
                  className={classNames(
                    {
                      'text-carbon-path-bluestroke': !toggle || displaySplit,
                      'text-white': toggle,
                    },
                    headerClassName
                  )}
                >
                  {headerData}
                </p>
              </div>
            </button>
          </h2>

          <div
            className={classNames('accordion-collapse collapse', { show: toggle }, bodyClassName)}
          >
            <div
              className={classNames('accordion-body bg-white rounded-b-2xl', {
                'rounded-xl bg-white border-[1px] border-carbon-path-blue py-3': displaySplit,
              })}
            >
              <div
                className={classNames({
                  'py-1 px-4 max-h-[40vh] overflow-y-auto alert-scrollbar': displaySplit,
                })}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

CollapsibleDisplay.displayName = 'CollapsibleDisplay'
export default CollapsibleDisplay
