import classNames from 'classnames'
import Link, { LinkProps } from 'next/link'
import React, { ReactNode } from 'react'

type Props = React.ButtonHTMLAttributes<HTMLElement> & {
  variant?:
    | 'primary'
    | 'blueGrey'
    | 'cyan'
    | 'grayOut'
    | 'lightBlue'
    | 'white'
    | 'blue'
    | 'quickWhite'
  href?: LinkProps['href']
  icon?: ReactNode
  iconAlign?: 'left' | 'right' | 'iconOnly'
  contentJustify?: 'center' | 'left'
  target?: HTMLAnchorElement['target']
  caps?: boolean
  square?: boolean
}

const Button: React.FC<React.PropsWithChildren<Props>> = React.forwardRef<HTMLAnchorElement, Props>(
  (
    {
      children,
      className: extraClassName,
      variant,
      onClick,
      href,
      icon,
      iconAlign = 'right',
      contentJustify = 'center',
      type = 'button',
      square = false,
      disabled,
      target,
      caps,
      ...rest
    },
    ref
  ) => {
    const className = classNames(
      ['rounded-lg', 'hover:brightness-105', 'flex', 'items-center'],
      { '!uppercase': caps },
      contentJustify === 'center' && 'justify-center',
      contentJustify === 'left' && 'justify-start',
      variant === 'primary' && 'bg-carbon-path-green text-carbon-path-blue',
      variant === 'blueGrey' && 'bg-carbon-path-bluegrey text-white',
      variant === 'cyan' && 'bg-carbon-path-cyan',
      variant === 'grayOut' && 'bg-white md:bg-carbon-path-lightgray text-carbon-path-graytext',
      variant === 'lightBlue' && 'bg-carbon-path-lightblue text-white',
      variant === 'white' && 'bg-white text-carbon-path-blue',
      variant === 'blue' && 'bg-carbon-path-blue text-white',
      variant === 'quickWhite' &&
        'bg-carbon-path-white text-carbon-path-bluestroke border-2 border-carbon-path-cyan',
      !square && 'px-8 py-4',
      square && 'p-4',
      extraClassName
    )

    if (href) {
      return (
        <Link href={href}>
          <a
            aria-disabled={disabled}
            ref={ref}
            target={target}
            className={className}
            onClick={onClick}
            onKeyPress={(e) => {
              onClick(e as any)
            }}
            role="button"
            tabIndex={0}
          >
            {icon && iconAlign === 'iconOnly' && <span>{icon}</span>}
            {icon && iconAlign === 'left' && <span className="pr-2">{icon}</span>}
            {children}
            {icon && iconAlign === 'right' && <span className="pl-2">{icon}</span>}
          </a>
        </Link>
      )
    }

    return (
      <button className={className} onClick={onClick} type={type} disabled={disabled} {...rest}>
        {icon && iconAlign === 'iconOnly' && <span>{icon}</span>}
        {icon && iconAlign === 'left' && <span className="pr-2">{icon}</span>}
        {children}
        {icon && iconAlign === 'right' && <span className="pl-2">{icon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
