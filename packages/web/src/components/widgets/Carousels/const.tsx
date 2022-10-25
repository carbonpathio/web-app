// TODO: make this const.ts by removing React Nodes
export const carouselSettingsDesktopBase = {
  dots: true,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  vertical: true,
  verticalSwiping: true,
  appendDots: (dots) => (
    <ul className="slick-dots" style={{ top: '50%', right: '-100%' }}>
      {dots.map((item, index) => {
        return (
          <li key={index} style={{ display: 'list-item' }}>
            {item.props.children}
          </li>
        )
      })}
    </ul>
  ),
}

export const carouselSettingsMobile = {
  dots: true,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
}
