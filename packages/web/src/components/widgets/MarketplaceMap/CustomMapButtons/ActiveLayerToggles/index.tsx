import classNames from 'classnames'
import React from 'react'
type Props = {
  activeLayers: {
    landgrid: boolean
    foundationWells: boolean
    mintedWells: boolean
    droneImagery: boolean
  }
  setActiveLayers: React.Dispatch<
    React.SetStateAction<{
      landgrid: boolean
      foundationWells: boolean
      mintedWells: boolean
      droneImagery: boolean
    }>
  >
}
const ActiveLayerToggles: React.FC<Props> = ({ activeLayers, setActiveLayers }) => {
  const handleToggle = (item: string) => {
    setActiveLayers((prev) => {
      let ret = { ...prev }
      ret[item] = !ret[item]
      return ret
    })
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full my-[6px]">
        <div className="font-lato font-bold text-gray-normal">Landgrid</div>
        <div
          className={classNames('w-[34px] h-5 flex items-center rounded-full p-1 cursor-pointer', {
            'bg-gray-300': !activeLayers.landgrid,
            'bg-carbon-path-blue': activeLayers.landgrid,
          })}
          onClick={() => handleToggle('landgrid')}
        >
          <div
            className={classNames(
              'bg-white h-4 w-4 rounded-full shadow-md duration-300 ease-in-out',
              {
                'transform translate-x-3': activeLayers.landgrid,
              }
            )}
          ></div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center w-full my-[6px]">
        <div className="font-lato font-bold text-gray-normal">Foundation Wells</div>
        <div
          className={classNames('w-[34px] h-5 flex items-center rounded-full p-1 cursor-pointer', {
            'bg-gray-300': !activeLayers.foundationWells,
            'bg-carbon-path-blue': activeLayers.foundationWells,
          })}
          onClick={() => handleToggle('foundationWells')}
        >
          <div
            className={classNames(
              'bg-white h-4 w-4 rounded-full shadow-md duration-300 ease-in-out',
              {
                'transform translate-x-3': activeLayers.foundationWells,
              }
            )}
          ></div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center w-full my-[6px]">
        <div className="font-lato font-bold text-gray-normal">Minted Wells</div>
        <div
          className={classNames('w-[34px] h-5 flex items-center rounded-full p-1 cursor-pointer', {
            'bg-gray-300': !activeLayers.mintedWells,
            'bg-carbon-path-blue': activeLayers.mintedWells,
          })}
          onClick={() => handleToggle('mintedWells')}
        >
          <div
            className={classNames(
              'bg-white h-4 w-4 rounded-full shadow-md duration-300 ease-in-out',
              {
                'transform translate-x-3': activeLayers.mintedWells,
              }
            )}
          ></div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center w-full my-[6px]">
        <div className="font-lato font-bold text-gray-normal">Drone Imagery</div>
        <div
          className={classNames('w-[34px] h-5 flex items-center rounded-full p-1 cursor-pointer', {
            'bg-gray-300': !activeLayers.droneImagery,
            'bg-carbon-path-blue': activeLayers.droneImagery,
          })}
          onClick={() => handleToggle('droneImagery')}
        >
          <div
            className={classNames(
              'bg-white h-4 w-4 rounded-full shadow-md duration-300 ease-in-out',
              {
                'transform translate-x-3': activeLayers.droneImagery,
              }
            )}
          ></div>
        </div>
      </div>
    </>
  )
}

export default ActiveLayerToggles
