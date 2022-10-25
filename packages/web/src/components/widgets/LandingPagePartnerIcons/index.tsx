import React from 'react'
import Partner2099Icon from '../../../assets/icons/Partner2099Icon'
import PartnerAllegoryIcon from '../../../assets/icons/PartnerAllegoryIcon'
import PartnerBldAiIcon from '../../../assets/icons/PartnerBldAiIcon'
import PartnerClimateCollectiveIcon from '../../../assets/icons/PartnerClimateCollectiveIcon'
import PartnerFloriIcon from '../../../assets/icons/PartnerFloriIcon'
import PartnerFlywalletIcon from '../../../assets/icons/PartnerFlywalletIcon'
import PartnerSpiralsIcon from '../../../assets/icons/PartnerSpiralsIcon'

const LandingPartnerIcons: React.FC<React.PropsWithChildren> = () => {
  return (
    <div className="flex flex-wrap flex-row place-items-center justify-evenly 2xl:justify-between gap-y-4 md:gap-x-4">
      <div className="min-h-[100px] place-self-center">
        <a
          href="https://www.allegory.capital/"
          rel="noreferrer"
          target="_blank"
          className="cursor-pointer"
        >
          <PartnerAllegoryIcon />
        </a>
      </div>
      <div className="min-h-[100px] place-self-center">
        <a
          href="https://www.floriventures.com/"
          rel="noreferrer"
          target="_blank"
          className="cursor-pointer"
        >
          <PartnerFloriIcon />
        </a>
      </div>
      <div className="min-h-[100px] place-self-center">
        <a
          href="https://www.spirals.so/"
          rel="noreferrer"
          target="_blank"
          className="cursor-pointer"
        >
          <PartnerSpiralsIcon />
        </a>
      </div>
      <div className="min-h-[100px] place-self-center">
        <a
          href="https://climatecollective.org/"
          rel="noreferrer"
          target="_blank"
          className="cursor-pointer"
        >
          <PartnerClimateCollectiveIcon />
        </a>
      </div>
      <div className="min-h-[100px] place-self-center">
        <a
          href="https://www.think2099.io/"
          rel="noreferrer"
          target="_blank"
          className="cursor-pointer"
        >
          <Partner2099Icon />
        </a>
      </div>
      <div className="min-h-[100px] place-self-center">
        <a
          href="https://www.flywallet.io/"
          rel="noreferrer"
          target="_blank"
          className="cursor-pointer"
        >
          <PartnerFlywalletIcon />
        </a>
      </div>
      <div className="min-h-[100px] place-self-center">
        <a href="https://www.bld.ai/" rel="noreferrer" target="_blank" className="cursor-pointer">
          <PartnerBldAiIcon />
        </a>
      </div>
    </div>
  )
}

export default LandingPartnerIcons
