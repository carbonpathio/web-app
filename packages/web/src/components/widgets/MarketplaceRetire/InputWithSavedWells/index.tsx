import Well from '@carbonpath/shared/lib/models/Well'
import { useStore } from '@carbonpath/shared/lib/stores'
import classNames from 'classnames'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import OutsideClickHandler from 'react-outside-click-handler'
import { useAsync } from 'react-use'
import BookmarkIcon from '../../../../assets/icons/BookmarkIcon'
import DropWaveIcon from '../../../../assets/icons/DropWaveIcon'
import SearchIcon from '../../../../assets/icons/SearchIcon'
import { MIN_DESKTOP_WIDTH } from '../../../../constants/width'
import useWindowSize from '../../../../hooks/useWindowSize'

type Props = React.InputHTMLAttributes<HTMLElement> & {
  setValue: Dispatch<SetStateAction<string>>
  filterData: object[]
  focused: boolean
  setFocused: Dispatch<SetStateAction<boolean>>
  setCurrentFavorites: Dispatch<SetStateAction<number[]>>
  currentFavorites: number[]
  onSearch: (name?: string) => void
  setCurrentActiveMarker: Dispatch<SetStateAction<number>>
  wellSelect: (retireToWell: Well) => void
  toggle: boolean
  selectFromMarker: Well
}

const InputRetire: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      setValue,
      placeholder = 'Select specific well to retire to',
      filterData,
      focused,
      setFocused,
      currentFavorites,
      setCurrentFavorites,
      onSearch, // mapbox loc
      setCurrentActiveMarker,
      wellSelect,
      toggle,
      selectFromMarker,
    },
    ref
  ) => {
    const [outsideClick, setOutsideClick] = useState(false)
    const [inputFocused, setInputFocused] = useState(false)
    const [filtered, setFiltered] = useState([])
    const inputRef = useRef<DebounceInput>()
    const width = useWindowSize().width
    const isMobile = width < MIN_DESKTOP_WIDTH
    const { wellStore } = useStore()
    
    useAsync(async () => {
      await inputRef.current.setState({ ...inputRef.current.state, value: '' })
      if (!!selectFromMarker) handleWellClick(selectFromMarker, false)
    }, [selectFromMarker])

    useEffect(() => {
      setFiltered([...filterData])
    }, [filterData])

    useAsync(async () => {
      if (!toggle) await inputRef.current.setState({ ...inputRef.current.state, value: '' })
    }, [toggle])

    useAsync(async () => {
      const holdSavedWells = await wellStore.mySavedWells()
      if (holdSavedWells !== undefined) {
        const hold = holdSavedWells.extra.results
        const tmp: number[] = []
        hold.map((well) => {
          tmp.push(well.id)
        })
        setCurrentFavorites(tmp)
      }
    }, [wellStore, inputFocused])

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
      let input = inputRef.current.state['value'].toLowerCase()
      setFiltered(
        filterData
          .filter(
            (a) =>
              a['name'].toLowerCase().indexOf(input) > -1 ||
              a['location'].toLowerCase().indexOf(input) > -1
          )
          .sort((j, k) =>
            j['name'].toLowerCase().indexOf(input) > k['name'].toLowerCase().indexOf(input)
              ? 1
              : j['name'].toLowerCase().indexOf(input) < k['name'].toLowerCase().indexOf(input)
              ? -1
              : 0
          )
          .filter((a) => a !== undefined)
      )
      setValue(inputRef.current.state['value'].toLowerCase())
    }

    const handleWellClick = async (well, modal=true) => {
      setFocused(false)
      await inputRef.current.setState({ ...inputRef.current.state, value: well.name })
      handleChange()
      if(modal) setCurrentActiveMarker(well.id) // prevents mobile modal loop on search select
      wellSelect(well)
    }

    const handleFavoriteToggle = async (favId) => {
      setCurrentFavorites((prev) => {
        let tmp = [...prev]
        let index = tmp.indexOf(favId)
        if (index === -1) {
          tmp.push(favId)
        } else {
          tmp.splice(index, 1)
        }
        return tmp
      })

      if (favId >= 0) {
        const checkSavedWell = await wellStore.isSavedWell(favId)
        if (!checkSavedWell.extra.result) {
          await wellStore.saveWell(favId)
        } else {
          await wellStore.removeSavedWell(favId)
        }
      }
    }

    return (
      <div className="relative">
        <OutsideClickHandler onOutsideClick={() => setOutsideClick(true)}>
          <div className="flex flex-row justify-between items-center w-full">
            <div
              className={classNames(
                'flex flex-row w-full items-center rounded-xl px-6 py-3 md:py-4',
                {
                  'bg-[#ECEFFA] border-[1px] border-[#6AEAEA]': !isMobile && !focused,
                  'bg-[#ECEFFA] border-[1px] border-carbon-path-bluegrey': !isMobile && focused,
                  'bg-white border-[1px] border-[#6AEAEA]': isMobile && !focused,
                  'bg-white border-[1px] border-carbon-path-bluegrey': isMobile && focused,
                }
              )}
            >
              <SearchIcon width={20} height={20} className="stroke-[#182B51]" />
              <DebounceInput
                ref={inputRef}
                className={classNames(
                  'text-sm pl-2 w-full text-carbon-path-bluestroke focus:outline-none',
                  {
                    'bg-[#ECEFFA]': !isMobile,
                    'bg-white': isMobile,
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
          </div>

          <div
            className={classNames(
              'absolute rounded-xl border-[1px] border-carbon-path-bluestroke py-2 mt-1 bg-white flex-col justify-start items-start w-full h-fit max-h-48',
              {
                hidden: !focused,
              }
            )}
          >
            <div className="w-full rounded-none font-semibold bg-white overflow-y-scroll alert-scrollbar">
              {filtered.map((wellChoose, index) => (
                <div
                  key={wellChoose.name + 'filteritem' + index}
                  className="rounded-xl mx-1 my-1 px-3 py-1 flex flex-row justify-between items-center bg-white text-[#182B51]"
                >
                  <div
                    className="flex flex-row w-full justify-start items-center pr-auto cursor-pointer"
                    onClick={() => handleWellClick(wellChoose)}
                  >
                    <DropWaveIcon
                      width={24}
                      height={24}
                      className="stroke-carbon-path-bluestroke mr-2 my-auto"
                    />
                    <div className="flex flex-col items-start font-lato">
                      <div className="text-[16px] leading-5">{wellChoose.name}</div>
                      <div className="text-xs tracking-normal">Location: {wellChoose.location}</div>
                    </div>
                  </div>
                  <BookmarkIcon
                    className={classNames(
                      'm-0 stroke-2 cursor-pointer transition-all duration-300',
                      {
                        'fill-carbon-path-bluegrey stroke-carbon-path-bluegrey':
                          currentFavorites.includes(wellChoose.id),
                        'fill-white stroke-[#BDBFC7]': !currentFavorites.includes(wellChoose.id),
                      }
                    )}
                    onClick={() => handleFavoriteToggle(wellChoose.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    )
  }
)

InputRetire.displayName = 'InputRetire'
export default InputRetire
