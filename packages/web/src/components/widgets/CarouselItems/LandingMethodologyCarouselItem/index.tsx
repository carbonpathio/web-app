interface Props {
  id: string
  icon: React.ReactNode
  title: string
  description: string | React.ReactNode
}

const LandingMethodologyCarouselItem: React.FC<React.PropsWithChildren<Props>> = ({
  id,
  icon,
  title,
  description,
}) => {
  return (
    <div id={id} className="md:hidden">
      <div className="flex text-center items-start align-middle bg-white rounded-3xl px-6 pb-36">
        <div className="flex flex-col items-center flex-1 text-center mx-auto">
          {icon}
          <div className="text-xl font-semibold py-8">{title}</div>
          <div className="font-lato font-medium text-sm text-[#606060]">{description}</div>
        </div>
      </div>
    </div>
  )
}

export default LandingMethodologyCarouselItem
