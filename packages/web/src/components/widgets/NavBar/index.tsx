import config from '@carbonpath/shared/lib/config'
import classNames from 'classnames'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CarbonPathIcon from '../../../assets/icons/CarbonPathIcon'
import CarbonPathWhiteNavIcon from '../../../assets/icons/CarbonPathWhiteNavIcon'
import CloseIcon from '../../../assets/icons/CloseIcon'
import MenuIcon from '../../../assets/icons/MenuIcon'
import useScrollDirection from '../../../hooks/useScrollDirection'
import Button from '../../atoms/Button'

const NavBar: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollUp = useScrollDirection()
  const [showMenu, setShowMenu] = useState(false)
  const isProd = config.appConfig === 'prod'

  const handleScroll = () => {
    setScrollPosition(window.scrollY)
    setShowMenu(false)
  }

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      className={classNames('w-full fixed top-0 z-[9999] transition-all ease-in-out duration-500', {
        '-translate-y-36': !scrollUp,
        'bg-white': (scrollUp && scrollPosition) || showMenu,
      })}
    >
      <div className="max-w-[2560px] mx-auto">
        <div className="w-full max-w-[2560px]">
          <div className="flex flex-wrap justify-between gap-x-20 mx-0 md:mx-4 py-2 items-center font-montserrat font-bold tracking-normal leading-none whitespace-pre-line md:flex-nowrap">
            <div
              className={classNames('w-1/5 my-2 ml-4 md:ml-16', {
                'hidden sm:block': !scrollPosition && !showMenu,
              })}
            >
              <CarbonPathIcon fill="currentColor" className="scale-75 md:scale-100" />
            </div>

            <div
              className={classNames('w-1/5 my-2 ml-6 sm:hidden', {
                hidden: scrollPosition || showMenu,
              })}
            >
              <CarbonPathWhiteNavIcon width={50} height={42} />
            </div>

            <div className="translate-x-4 md:hidden">
              <Button
                iconAlign="iconOnly"
                icon={
                  <MenuIcon
                    className={classNames('stroke-carbon-path-bluestroke', {
                      'stroke-white sm:stroke-carbon-path-bluestroke': !scrollPosition,
                    })}
                  />
                }
                className={classNames({ hidden: showMenu })}
                onClick={handleShowMenu}
              />

              <Button
                iconAlign="iconOnly"
                icon={
                  <CloseIcon className="stroke-carbon-path-bluestroke" width={40} height={40} />
                }
                className={classNames({ hidden: !showMenu })}
                onClick={handleShowMenu}
              />
            </div>

            <div
              className={classNames(
                'w-full md:w-auto md:h-auto transition-all ease-in-out duration-300 md:my-4 md:mr-8 md:block',
                {
                  'h-0': !showMenu,
                  'h-[95vh] bg-carbon-path-bluegrey md:bg-transparent': showMenu,
                }
              )}
            >
              <div className="flex flex-col md:flex-row justify-start md:justify-between gap-y-8 md:gap-y-0 text-center items-center h-[85%] md:h-auto md:space-x-12">
                <div className="h-[10%] md:hidden"></div>
                <div
                  className={classNames(
                    'cursor-pointer py-4 px-2 md:mr-8 bg-transparent border-underline hover:text-carbon-path-cyan text-white',
                    {
                      'border-underline-white hidden md:block': !showMenu,
                      'border-underline-white mr-0 text-2xl': showMenu,
                      'text-carbon-path-bluestroke border-underline-bluestroke':
                        scrollUp && scrollPosition && !showMenu,
                    }
                  )}
                >
                  <div>
                    <a
                      href="https://fstrdy98iph.typeform.com/to/zYMNF8tV"
                      rel="noreferrer"
                      target="_blank"
                      className="cursor-pointer"
                    >
                      CONTACT US
                    </a>
                  </div>
                </div>

                <div
                  className={classNames(
                    'cursor-pointer py-4 px-2 md:mr-8 bg-transparent border-underline hover:text-carbon-path-cyan text-white',
                    {
                      'border-underline-white hidden md:block': !showMenu,
                      'border-underline-white mr-0 text-2xl': showMenu,
                      'text-carbon-path-bluestroke border-underline-bluestroke':
                        scrollUp && scrollPosition && !showMenu,
                    }
                  )}
                >
                  <div>
                    <a
                      href="https://carbonpath.notion.site/CarbonPath-c8364058a59044d281f14c2e46333b72"
                      rel="noreferrer"
                      target="_blank"
                      className="cursor-pointer"
                    >
                      DOCS
                    </a>
                  </div>
                </div>
                <div
                  className={classNames(
                    'cursor-pointer py-4 px-6 rounded-xl text-carbon-path-blue bg-carbon-path-cyan hover:brightness-105 ',
                    {
                      'hidden md:block': !showMenu,
                      'mx-8': showMenu,
                      'transition prod-button': isProd,
                      'hover:text-[#1B1B27]': !isProd,
                    }
                  )}
                >
                  {isProd ? (
                    <div className="uppercase">
                      <span className="prod-launch">Launch App</span>
                      <span className="hidden prod-soon">Coming soon</span>
                    </div>
                  ) : (
                    <Link href={'/marketplace'} passHref>
                      <span className="uppercase">Launch App</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
