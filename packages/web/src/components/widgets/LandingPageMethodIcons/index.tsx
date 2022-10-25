import React from 'react'
import MethodCycleIcon from '../../../assets/icons/MethodCycleIcon'
import MethodEllipsesIcon from '../../../assets/icons/MethodEllipsesIcon'
import MethodPurchaseIcon from '../../../assets/icons/MethodPurchaseIcon'
import MethodRigIcon from '../../../assets/icons/MethodRigIcon'
import MethodTokenIcon from '../../../assets/icons/MethodTokenIcon'
import Tooltip from '../../atoms/Tooltip'

const LandingMethodIcons: React.FC<React.PropsWithChildren> = () => {
  return (
    <div className="hidden md:flex flex-row justify-center w-full gap-x-0 items-start px-0">
      <div className="max-w-[282px] flex flex-col items-center flex-1 text-center font-lato mx-auto md:mx-0">
        <MethodRigIcon />
        <div className="text-2xl font-bold py-6">Safely and permanently shut down well</div>
        <div className="font-lato font-medium text-sm text-[#606060]">
          Through a multi-step validation process, we ensure that each well has been safely and
          permanently shut down according to state and federal regulations and the surface repaired
          to local environmental standards including the potential for new carbon sinks.
        </div>
      </div>
      <div className="mx-auto mb-16 md:mt-[60px] items-center">
        <MethodEllipsesIcon />
      </div>

      <div className="max-w-[282px] flex flex-col items-center flex-1 text-center font-lato mx-auto md:mx-0">
        <MethodCycleIcon />
        <span className="text-2xl font-bold py-6">
          Convert methane emissions and unused resources to carbon tokens
        </span>
        <span className="font-lato font-medium text-sm text-[#606060]">
          Using field tested chemical composition and historical data from each well, we are able to
          calculate future emissions and quantify impact. To ensure accuracy, we leverage 3rd party
          licensed professional engineers to appraise each well as part of our stringent validation
          process.
        </span>
      </div>
      <div className="mx-auto mb-16 md:mt-[60px] items-center">
        <MethodEllipsesIcon />
      </div>

      <div className="max-w-[282px] flex flex-col items-center flex-1 text-center font-lato mx-auto md:mx-0">
        <MethodTokenIcon />
        <br />
        <span className="text-2xl font-bold pt-4 pb-6">1 tonne = 1 token</span>
        <span className="font-lato font-medium text-sm text-[#606060] md:mt-4">
          Using thermodynamic conversion at the beginning of our process, we ensure that one tonne
          of avoided emissions is always equal to one CarbonPath token.
        </span>
      </div>
      <div className="mx-auto mb-16 md:mt-[60px] items-center">
        <MethodEllipsesIcon />
      </div>

      <div className="max-w-[282px] flex flex-col items-center flex-1 text-center font-lato mx-auto md:mx-0">
        <MethodPurchaseIcon />
        <span className="text-xl font-bold py-6 md:mt-2">Purchase, retire, and sell tokens</span>
        <span className="font-lato font-medium text-sm text-[#606060] md:mt-4">
          Because we are using the{' '}
          <Tooltip
            id="Ethereum ERC-20 standard"
            hoverText="ERC-20  is an open standard that describes how to build Fungible Tokens on EVM (Ethereum Virtual Machine) compatible blockchains. ERC-20 Tokens have a property that makes each Token exactly the same (in type and value) as another. CarbonPath uses ERC-20 Tokens to represent 1 tonne of carbon emission removed."
            text="Ethereum ERC-20 standard"
          />
          , our fungible tokens will be easily purchased and retired on our marketplace with future
          plans for listing on{' '}
          <Tooltip
            id="decentralized exchanges (DEXs)."
            hoverText="A decentralized exchange (DEX) is a peer-to-peer marketplace where users can trade cryptocurrencies without the need for an intermediary to facilitate the transfer."
            text="decentralized exchanges (DEXs)."
          />
        </span>
      </div>
    </div>
  )
}

export default LandingMethodIcons
