const MarkerIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 48,
  height = 48,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <rect
      x="24"
      width="33.9411"
      height="33.9411"
      transform="rotate(45 24 0)"
      fill="#05DEC9"
      fillOpacity="0.2"
    />
    <rect
      x="24"
      y="14.3024"
      width="13.7142"
      height="13.7142"
      transform="rotate(45 24 14.3024)"
      fill="#05DEC9"
    />
  </svg>
)
export default MarkerIcon
