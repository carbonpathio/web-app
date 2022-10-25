const ArrowExpandIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 24,
  height = 24,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <path
      d="M15 19H19M19 19V15M19 19L15 15M9 5H5M5 5V9M5 5L9 9"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 5H19M19 5V9M19 5L15 9M9 19H5M5 19V15M5 19L9 15"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default ArrowExpandIcon
