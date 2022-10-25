import { useStore } from '@carbonpath/shared/lib/stores'
import { useCelo } from '@celo/react-celo'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import OutsideClickHandler from 'react-outside-click-handler'
import BookmarkIcon from '../../../../assets/icons/BookmarkIcon'
import CloseIcon from '../../../../assets/icons/CloseIcon'
import DropWaveIcon from '../../../../assets/icons/DropWaveIcon'
import MapPinIcon from '../../../../assets/icons/MapPinIcon'
import SearchIcon from '../../../../assets/icons/SearchIcon'
import { MIN_DESKTOP_WIDTH } from '../../../../constants/width'
import useWindowSize from '../../../../hooks/useWindowSize'
import CollapsibleDisplay from '../../../atoms/CollapsibleDisplay'
type Props = React.InputHTMLAttributes<HTMLElement> & {
  setValue: Dispatch<SetStateAction<string>>
  filterData: object[]
  filterDropdownData: object[]
  finalFiltered: object[]
  setFinalFiltered: Dispatch<SetStateAction<object[]>>
  onSearch: (name?: string) => void
  focused: boolean
  setFocused: Dispatch<SetStateAction<boolean>>
  setCurrentActiveMarker: Dispatch<SetStateAction<number>>
}

const InputWithFilter: React.FC<React.PropsWithChildren<Props>> = React.forwardRef<
  HTMLInputElement,
  Props
>(
  (
    {
      value,
      setValue,
      placeholder,
      filterData,
      filterDropdownData,
      finalFiltered,
      setFinalFiltered,
      onSearch,
      focused,
      setFocused,
      setCurrentActiveMarker,
    },
    ref
  ) => {
    const [inputFocused, setInputFocused] = useState(false)
    const [outsideClick, setOutsideClick] = useState(false)
    const [filtered, setFiltered] = useState([...filterData])

    const { wellStore } = useStore()

    const width = useWindowSize().width
    const isMobile = width < MIN_DESKTOP_WIDTH

    const defaultDropdownFilters = {
      type: [],
      source: [],
    }

    const [currentDropdownFilters, setCurrentDropdownFilters] = useState({
      ...defaultDropdownFilters,
    })

    const inputRef = useRef<DebounceInput>()

    const { authStore } = useStore()
    const { address } = useCelo()
    const isLogin = !!address && !!authStore.token

    useEffect(() => {
      //initialize
      setFiltered([...filterData])
      setFinalFiltered([...filterData])
    }, [filterData, setFinalFiltered])

    const handleFilterClick = async (
      filterName: string,
      filterItem: { id: number; name: string }
    ) => {
      setFocused(false)
      await inputRef.current.setState({ ...inputRef.current.state, value: filterItem.name })
      handleChange()
      if (filterName === 'locations') {
        onSearch(filterItem.name) //call mapbox geocode
      } else if (filterName === 'wells') {
        setCurrentActiveMarker(filterItem.id)
      }
    }

    useEffect(() => {
      if (inputFocused) {
        setFocused(true)
      } else if (!inputFocused && outsideClick) {
        setFocused(false)
      }
      setOutsideClick(false)
    }, [inputFocused, outsideClick, setFocused])

    const handleChange = () => {
      //runs when user types in searchbar
      setFiltered(
        filterData
          .map((item, index) => {
            let tmp = item['filterItems']
            let input = inputRef.current.state['value'].toLowerCase()
            //filter with keyword then sort by index position
            tmp = tmp
              .filter((a) => a['name'].toLowerCase().indexOf(input) > -1)
              .sort((j, k) =>
                j['name'].toLowerCase().indexOf(input) > k['name'].toLowerCase().indexOf(input)
                  ? 1
                  : j['name'].toLowerCase().indexOf(input) < k['name'].toLowerCase().indexOf(input)
                  ? -1
                  : 0
              )
            if (filterData[index]['filterName'] === 'wells') {
              //add location filter for wells, append on initial name filter result
              tmp.push(
                ...item['filterItems']
                  .filter(
                    (a) => a['location'].toLowerCase().indexOf(input) > -1 && tmp.indexOf(a) === -1
                  )
                  .sort((j, k) =>
                    j['location'].toLowerCase().indexOf(input) >
                    k['location'].toLowerCase().indexOf(input)
                      ? 1
                      : j['location'].toLowerCase().indexOf(input) <
                        k['location'].toLowerCase().indexOf(input)
                      ? -1
                      : 0
                  )
              )
            }
            return { ...item, filterItems: tmp }
          })
          .filter((a) => a !== undefined)
      )
      setValue(inputRef.current.state['value'].toLowerCase())
    }

    const handleDropdownToggle = (filterGroup, filterItem) => {
      //runs whenever user clicks dropdown checkboxes
      let tmp = { ...currentDropdownFilters }
      let index = tmp[filterGroup].indexOf(filterItem)

      if (index === -1) {
        tmp[filterGroup].push(filterItem)
      } else {
        tmp[filterGroup].splice(index, 1)
      }
      setCurrentDropdownFilters(tmp)
    }

    const handleFavoriteToggle = async (filterGroup, filterItem) => {
      if (filterItem.id >= 0) {
        const checkSavedWell = await wellStore.isSavedWell(filterItem.id)
        if (!checkSavedWell.extra.result) {
          await wellStore.saveWell(filterItem.id)
        } else {
          await wellStore.removeSavedWell(filterItem.id)
        }
      }
    }

    useEffect(() => {
      setFinalFiltered(
        filtered.map((item, index) => {
          let tmp = item['filterItems']
          if (filtered[index]['filterName'] === 'wells') {
            Object.keys(currentDropdownFilters).map((key) => {
              if (currentDropdownFilters[key].length > 0) {
                tmp = tmp.filter((a) => a[key].some((b) => currentDropdownFilters[key].includes(b)))
              }

              if (wellStore.showSaved) {
                tmp = tmp.filter((a) => !!a.isSavedWell)
              }
            })
          }

          return { ...item, filterItems: tmp }
        })
      )
    }, [
      currentDropdownFilters,
      filtered,
      setFinalFiltered,
      wellStore.showSaved,
      wellStore.updatedWell,
    ])

    return (
      <div
        className={classNames('flex-col items-start justify-center w-full mr-2 md:w-7/12', {
          'absolute z-[100] w-[100vw] h-[calc(100vh-168px)] bg-white top-[-7rem] mx-0 overflow-hidden':
            focused && isMobile,
        })}
      >
        <OutsideClickHandler onOutsideClick={() => setOutsideClick(true)}>
          <div
            className={classNames('flex flex-row justify-between items-center', {
              'mx-7 mt-4 mb-10': focused && isMobile,
            })}
          >
            <div
              className={classNames('rounded-xl py-4 px-6 flex flex-row items-center', {
                'bg-white w-full': !focused,
                'bg-carbon-path-bluegrey': focused,
                'rounded-b-none': focused && !isMobile,
                'w-full': !isMobile,
              })}
            >
              <SearchIcon
                width={24}
                height={24}
                className={classNames({
                  'm-[2px] stroke-white': focused,
                  'stroke-[#182B51]': !focused,
                })}
              />
              <DebounceInput
                ref={inputRef}
                className={classNames(
                  'text-sm pl-2 w-full font-lato font-bold tracking-wide placeholder:font-medium placeholder:text-[#606060] focus:outline-none',
                  {
                    'bg-white': !focused,
                    'bg-carbon-path-bluegrey': focused,
                    'text-white placeholder:text-carbon-path-bluegrey': focused,
                    'text-carbon-path-bluestroke': !focused,
                  }
                )}
                placeholder={placeholder}
                onChange={(e) => handleChange()}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setFocused(false)
                  }
                }}
              />
            </div>
            {isMobile && focused && (
              <div
                className="w-fit h-fit"
                onClick={() => {
                  setFocused(false)
                }}
              >
                <CloseIcon width={30} height={30} className="stroke-black" />
              </div>
            )}
          </div>

          <div
            className={classNames(
              'accordion rounded-none bg-white flex-col justify-start items-start w-full h-[calc(100vh-324px)] md:h-fit md:max-h-96 overflow-y-scroll',
              {
                hidden: !focused,
              }
            )}
          >
            {finalFiltered.map((filterGroup: any, index) => (
              <div className="" key={`filtergroup-${index}`}>
                <div className="accordion-header mb-0" id={`filtergroup-header-${index}`}>
                  <button
                    className={classNames(
                      'relative flex items-center w-full py-1 pl-7 md:py-2 md:pl-6 md:text-base text-black font-bold font-lato text-left capitalize bg-carbon-path-lightgray transition focus:outline-none'
                    )}
                    type="button"
                    id={`filtergroup-button-${index}`}
                  >
                    {`${filterGroup.filterName}`}
                  </button>
                </div>
                <div
                  id={`filtergroup-body-${index}`}
                  className={classNames('accordion-collapse collapse show')}
                >
                  {filterGroup.filterName === 'wells' && (
                    <div className="flex flex-row justify-start items-center px-4 pt-4">
                      {filterDropdownData.map(
                        (filterDropdownGroup: { filterName: string; filterItems: string[] }) => (
                          <CollapsibleDisplay
                            headerData={`${filterDropdownGroup.filterName}: ${
                              currentDropdownFilters[filterDropdownGroup.filterName].length > 0
                                ? currentDropdownFilters[filterDropdownGroup.filterName].join(', ')
                                : 'All'
                            }`}
                            headerClassName="text-base py-1 pl-1 capitalize"
                            bodyClassName="absolute z-[1000] w-full"
                            key={`${filterDropdownGroup.filterName}`}
                            className="mx-2 relative flex-1 accordion-mp"
                          >
                            <div className="flex-col justify-evenly items-start p-2 shadow-md rounded-b-2xl">
                              {filterDropdownGroup.filterItems.map((filterDropdownItem: string) => (
                                <div
                                  key={`${filterDropdownItem}`}
                                  className="flex flex-row justify-between items-center p-2"
                                >
                                  <div className="text-base text-carbon-path-bluegrey font-medium">
                                    {filterDropdownItem}
                                  </div>
                                  <div
                                    onClick={() =>
                                      handleDropdownToggle(
                                        filterDropdownGroup.filterName,
                                        filterDropdownItem
                                      )
                                    }
                                    className="w-4 h-4 flex-shrink-0 rounded-sm border-carbon-path-bluegrey border-2 p-[2px]"
                                  >
                                    <div
                                      className={classNames(
                                        'bg-carbon-path-bluegrey w-full h-full',
                                        {
                                          hidden:
                                            currentDropdownFilters[
                                              filterDropdownGroup.filterName
                                            ].indexOf(filterDropdownItem) === -1,
                                        }
                                      )}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CollapsibleDisplay>
                        )
                      )}
                    </div>
                  )}
                  <div className="accordion-body bg-white rounded-b-2xl py-4">
                    {filterGroup.filterItems.map((filterItem: any, index2) => {
                      if (wellStore.showSaved && !filterItem.isSavedWell) {
                        return <div key={filterGroup.filterName + 'filteritem' + String(index2)} />
                      }
                      return (
                        <div
                          key={filterGroup.filterName + 'filteritem' + String(index2)}
                          className="rounded-lg mx-1 px-3 flex flex-row justify-between items-center bg-white text-[#182B51]"
                        >
                          <div
                            className="flex flex-row justify-start items-center pr-auto cursor-pointer"
                            onClick={() => handleFilterClick(filterGroup.filterName, filterItem)}
                          >
                            {index === 0 && (
                              <MapPinIcon width={24} height={24} className="stroke-[#182B51]" />
                            )}
                            {index === 1 && (
                              <DropWaveIcon width={24} height={24} className="stroke-[#182B51]" />
                            )}
                            <div className="py-2">
                              <p className="font-lato font-bold text-base px-2">
                                {filterItem.name}
                              </p>
                              {filterGroup.filterName === 'wells' && (
                                <p className="font-lato font-bold text-xs px-2">
                                  {`Location: ${filterItem.location}`}
                                </p>
                              )}
                            </div>
                          </div>
                          {/* {index === 0 && isLogin && (
                            <BookmarkIcon
                              className={classNames('m-0 stroke-2 cursor-pointer transition-all duration-300', {
                                'fill-carbon-path-bluegrey stroke-carbon-path-bluegrey':
                                  currentFavorites.includes(
                                    JSON.stringify({
                                      filterGroup: filterGroup.filterName,
                                      filterItem: filterItem.name,
                                    })
                                  ),
                                'fill-white stroke-[#BDBFC7]': !currentFavorites.includes(
                                  JSON.stringify({
                                    filterGroup: filterGroup.filterName,
                                    filterItem: filterItem.name,
                                  })
                                ),
                              })}
                              onClick={() => handleFavoriteToggle(filterGroup, filterItem, 0)}
                            />
                          )} */}
                          {index === 1 && isLogin && (
                            <BookmarkIcon
                              className={classNames(
                                'm-0 stroke-2 cursor-pointer transition-all duration-300',
                                {
                                  'fill-carbon-path-bluegrey stroke-carbon-path-bluegrey':
                                    filterItem.isSavedWell,
                                  'fill-white stroke-[#BDBFC7]': !filterItem.isSavedWell,
                                }
                              )}
                              onClick={() => handleFavoriteToggle(filterGroup, filterItem)}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className={classNames(
              'py-4 px-6 flex flex-row justify-between items-center w-full bg-carbon-path-bluegrey',
              {
                hidden: !focused,
                'rounded-b-2xl': !isMobile,
              }
            )}
          >
            <div className={classNames('font-lato font-bold text-white', { hidden: !isLogin })}>
              Show only Saved Wells
            </div>
            <div
              onClick={() => wellStore.toggleShowSavedWells()}
              className={classNames(
                'w-4 h-4 flex-shrink-0 rounded-sm border-white border-2 p-[2px] mr-2',
                { hidden: !isLogin }
              )}
            >
              <div
                className={classNames('bg-white w-full h-full', {
                  hidden: !wellStore.showSaved || !isLogin,
                })}
              />
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    )
  }
)

InputWithFilter.displayName = 'InputWithFilter'
export default observer(InputWithFilter)
