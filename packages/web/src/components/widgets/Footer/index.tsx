import CarbonPathWhiteIcon from "../../../assets/icons/CarbonPathWhiteIcon"
import LinkedInIcon from "../../../assets/icons/LinkedInIcon"
import TwitterIcon from "../../../assets/icons/TwitterIcon"

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1B1B27]">
      <div className="max-w-[2560px] mx-auto">
        <div className="w-full bg-[#1B1B27] static bottom-0 z-10">
          <div className="pb-[80px] md:pb-[120px] pt-[80px] md:pt-[100px] px-[30px] md:px-[100px] text-white font-lato tracking-normal leading-none whitespace-pre-line">
            <div className="w-full items-center flex flex-col border-b border-white/[16%] pb-4 md:pb-4 mb-4 order-last md:flex-row md:justify-between md:order-first">
              <CarbonPathWhiteIcon className="scale-[.8] md:scale-100" />
              <div className="flex flex-col-reverse md:flex-row items-center md:justify-between gap-y-6 md:gap-x-[60px] font-montserrat font-bold py-10 md:py-0">
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

              <ul className="flex flex-row mx-auto gap-x-8 items-center md:hidden">
                <li className="inline-flex my-4 md:mr-4">
                  <a
                    href="https://www.linkedin.com/company/carbon-path/"
                    rel="noreferrer"
                    target="_blank"
                    className="inline-flex cursor-pointer"
                  >
                    <LinkedInIcon className="mr-2" fill="#333333" stroke="white" />
                    <span className="my-auto font-bold font-lato text-sm">LinkedIn</span>
                  </a>
                </li>
                <li className="inline-flex my-4 md:mr-4">
                  <a
                    href="https://twitter.com/CarbonPath_io"
                    rel="noreferrer"
                    target="_blank"
                    className="inline-flex cursor-pointer"
                  >
                    <TwitterIcon className="mr-2" fill="white" />
                    <span className="my-auto font-bold font-lato text-sm pt-[2px]">Twitter</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-full items-center flex flex-col text-center align-middle md:flex-row md:justify-between">
              <div className="text-xs md:my-1">© 2022 Carbonpath. All rights reserved.</div>

              <ul className="hidden items-center md:flex md:flex-row md:gap-x-2">
                <li className="inline-flex my-4 md:mr-4">
                  <a
                    href="https://www.linkedin.com/company/carbon-path/"
                    rel="noreferrer"
                    target="_blank"
                    className="inline-flex cursor-pointer"
                  >
                    <LinkedInIcon className="mr-2" fill="#333333" stroke="white" />
                    <span className="my-auto font-bold font-lato text-sm">LinkedIn</span>
                  </a>
                </li>
                <li className="inline-flex my-4">
                  <a
                    href="https://twitter.com/CarbonPath_io"
                    rel="noreferrer"
                    target="_blank"
                    className="inline-flex cursor-pointer"
                  >
                    <TwitterIcon className="mr-2" fill="white" />
                    <span className="my-auto font-bold font-lato text-sm pt-[2px]">Twitter</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
