const LeftSmallArrowIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 16,
  height = 16,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M9.33301 11.3334L5.99967 8.00004L9.33301 4.66671"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default LeftSmallArrowIcon
