interface Props {
  id: string
  icon: React.ReactNode
  title: string
  description: string | React.ReactNode
  image: string
}

const LandingAdvantagesCarouselItem: React.FC<React.PropsWithChildren<Props>> = ({
  id,
  icon,
  title,
  description,
  image,
}) => {
  return (
    <div id={id} className="pb-16 md:min-h-[500px]">
      <div className="px-6 lg:px-8 flex flex-col lg:flex-row justify-center items-center">
        <div className="hidden lg:block min-w-[300px] mr-[24px] rounded-3xl shadow-[0px_4px_14px_rgba(96, 86, 86, 0.1)]">
          <img src={image} alt={`${title} pic`} className="rounded-3xl " />
        </div>
        <div className="flex text-center items-start align-middle bg-white h-[520px] sm:h-[370px] md:h-auto min-h-[300px] shadow-[0px_4px_14px_rgba(96, 86, 86, 0.1)] pt-[40px] pb-[48px] px-6 lg:px-[40px] rounded-3xl lg:text-left md:max-w-[60%]">
          <div className="flex items-center flex-col lg:flex-row lg:justify-evenly lg:items-start">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-carbon-path-bluegrey lg:mr-5 lg:mt-2">
              {icon}
            </div>
            <div className="flex-col flex-1">
              <h2 className="mt-4 font-lato font-bold text-2xl text-black pb-4 pt-3 lg:mt-0 lg:text-3xl">
                {title}
              </h2>
              <div className="font-lato font-medium text-sm leading-[22px] text-[#606060]">
                {description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingAdvantagesCarouselItem
