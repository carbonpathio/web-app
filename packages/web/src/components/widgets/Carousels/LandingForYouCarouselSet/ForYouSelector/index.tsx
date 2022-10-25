import classNames from 'classnames'
import React from 'react'
import CollapsibleDisplay from '../../../../atoms/CollapsibleDisplay'

interface Props {
  forYouSelect: string
  handleForYouSelect: (selected: string) => void
  selectForYouRef: React.MutableRefObject<any>
}

const LandingForYouSelector: React.FC<React.PropsWithChildren<Props>> = ({
  forYouSelect,
  handleForYouSelect,
  selectForYouRef,
}) => {
  return (
    <>
      <div className="w-9/12 flex-wrap flex-row relative justify-between items-center gap-2 p-2 bg-white text-carbon-path-bluegrey shadow-md rounded-2xl mx-8 hidden lg:flex">
        <div className="flex flex-row justify-center min-w-fit flex-1 items-center">
          <div
            className={classNames(
              'w-1/4 min-w-fit z-10 flex-1 text-center px-2 py-2 md:px-10 md:py-3 cursor-pointer rounded-xl',
              {
                'text-white bg-carbon-path-bluegrey': forYouSelect === 'individuals',
              }
            )}
            onClick={() => handleForYouSelect('individuals')}
          >
            <h6 className="font-montserrat font-bold text-sm md:text-base">INDIVIDUALS</h6>
          </div>
          <div
            className={classNames(
              'w-1/4 min-w-fit z-10 flex-1 text-center px-2 py-2 md:px-10 md:py-3 cursor-pointer rounded-xl',
              {
                'text-white bg-carbon-path-bluegrey': forYouSelect === 'companies',
              }
            )}
            onClick={() => handleForYouSelect('companies')}
          >
            <h6 className="font-montserrat font-bold text-sm md:text-base">COMPANIES</h6>
          </div>
        </div>
        <div className="flex flex-row justify-center min-w-fit flex-1 items-center">
          <div
            className={classNames(
              'w-1/4 min-w-fit z-10 flex-1 text-center px-2 py-2 md:px-10 md:py-3 cursor-pointer rounded-xl',
              {
                'text-white bg-carbon-path-bluegrey': forYouSelect === 'allies',
              }
            )}
            onClick={() => handleForYouSelect('allies')}
          >
            <h6 className="font-montserrat font-bold text-sm md:text-base">ALLIES</h6>
          </div>
          <div
            className={classNames(
              'w-1/4 min-w-fit z-10 flex-1 text-center px-2 py-2 md:px-10 md:py-3 cursor-pointer rounded-xl',
              {
                'text-white bg-carbon-path-bluegrey': forYouSelect === 'partners',
              }
            )}
            onClick={() => handleForYouSelect('partners')}
          >
            <h6 className="font-montserrat font-bold text-sm md:text-base">PARTNERS</h6>
          </div>
        </div>
      </div>
      <div className="w-full px-6 block lg:hidden">
        <CollapsibleDisplay
          ref={selectForYouRef}
          headerData={forYouSelect}
          headerClassName="text-base font-montserrat py-3 pl-6 uppercase"
          bodyClassName="absolute z-[1000] w-full"
          className="rounded-xl shadow-md mt-10 w-full relative flex-1 accordion-foryou"
        >
          <div
            className={classNames('flex-1 text-left pr-2 pl-6 py-2 md:px-6 md:py-3 cursor-pointer')}
            onClick={() => handleForYouSelect('individuals')}
          >
            <h6 className="font-montserrat font-bold text-base">INDIVIDUALS</h6>
          </div>
          <div
            className={classNames('flex-1 text-left pr-2 pl-6 py-2 md:px-6 md:py-3 cursor-pointer')}
            onClick={() => handleForYouSelect('companies')}
          >
            <h6 className="font-montserrat font-bold text-base">COMPANIES</h6>
          </div>
          <div
            className={classNames('flex-1 text-left pr-2 pl-6 py-2 md:px-6 md:py-3 cursor-pointer')}
            onClick={() => handleForYouSelect('allies')}
          >
            <h6 className="font-montserrat font-bold text-base">ALLIES</h6>
          </div>
          <div
            className={classNames('flex-1 text-left pr-2 pl-6 py-2 md:px-6 md:py-3 cursor-pointer')}
            onClick={() => handleForYouSelect('partners')}
          >
            <h6 className="font-montserrat font-bold text-base">PARTNERS</h6>
          </div>
          <p className="font-lato font-medium text-base text-[#606060] block lg:hidden my-10 mx-8">
            {
              {
                companies:
                  'As a company, CarbonPath can help you meet your ESG goals. Adding CarbonPath carbon credit tokens to your existing nature-based portfolio will provide high quality offsets from source carbon.',
                individuals:
                  'As an individual, you can now be an active participant in making a difference in an arena where you might not have been able to in the past.',
                allies:
                  'As an ally, you can fund a project to shut down a large group of orphaned and abandoned wells ensuring dramatic impact on this problem. Allies will have verifiable and immutable proof of their contribution for each well within a project.',
                partners:
                  'As a partner, you can offer CarbonPath token retirement through your business to allow consumers to offset their purchases, travel, or shipping costs.',
              }[forYouSelect]
            }
          </p>
        </CollapsibleDisplay>
      </div>
    </>
  )
}

export default LandingForYouSelector
