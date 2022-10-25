import classNames from 'classnames'
import { useState } from 'react'
import OffsetIcon from '../../../../assets/icons/OffsetIcon'
import Button from '../../../atoms/Button'

const OffsetPage: React.FC = () => {
  const [showSearchResults, setShowSearchResults] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const prefix = input[0] === '$' ? '$ ' : ''
    if (isNaN(parseInt(input[input.length - 1]))) {
      input.slice(0, -1)
    }
    e.target.value = prefix + input
  }
  return (
    <div
      id="OffsetPage"
      className="absolute top-0 left-0 h-full w-full z-10 transition-all ease-in-out duration-300 bg-[#F4F4F6] md:bg-transparent md:h-fit md:w-5/12 md:mt-8 md:ml-8"
    >
      <div
        className={classNames(
          'flex flex-col flex-start w-full h-fit font-lato pb-4 bg-[#F4F4F6] md:bg-white md:max-w-[25rem] md:rounded-xl md:drop-shadow-xl'
        )}
      >
        <div className="hidden md:flex md:ml-2 md:mr-4 md:mt-2">
          <OffsetIcon
            className="stroke-carbon-path-bluestroke scale-105 shrink-0"
            width={70}
            height={70}
          />
          <span className="flex align-middle items-center font-bold text-2xl text-carbon-path-bluestroke -ml-2">
            Calculate your offset
          </span>
        </div>
        <div className="mx-8 mb-2 mt-8 md:mt-4">
          <h3 className="font-bold text-md md:text-lg">Enter your ZIP code</h3>
        </div>

        <div className="flex flex-col w-full px-8 md:flex-row md:gap-4 md:items-start">
          <div className="drop-shadow-xl md:drop-shadow-none">
            <input
              placeholder="10010"
              className="w-full bg-white rounded-xl px-6 py-4 mb-4 md:mb-0 md:bg-[#EFEFEF]"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <Button
            variant="cyan"
            onClick={() => setShowSearchResults(true)}
            className="font-bold font-montserrat text-carbon-path-bluestroke rounded-xl w-full md:w-2/3"
          >
            CALCULATE
          </Button>
        </div>

        <div
          className={classNames(
            'rounded-xl text-white bg-carbon-path-bluegrey md:text-carbon-path-bluestroke md:bg-white',
            {
              hidden: !showSearchResults,
              'mx-6 mt-8 md:mt-4': showSearchResults,
            }
          )}
        >
          <div className="text-center mb-4 mt-8 md:font-bold md:mt-4">
            <span
              className={classNames({
                hidden: !showSearchResults,
                'absolute top-[11.5rem] -mx-6 border-[1.5rem] border-transparent border-b-carbon-path-bluegrey md:hidden':
                  showSearchResults,
              })}
            />
            <h1 className="text-5xl">400</h1>
            <h5>tC02e per year</h5>
          </div>
          <div className="flex justify-center mb-8 md:mb-0">
            <Button
              variant="cyan"
              className="font-bold font-montserrat text-carbon-path-bluestroke w-full mx-4 sm:mx-8 md:mx-0 md:w-auto"
            >
              OFFSET NOW
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OffsetPage
