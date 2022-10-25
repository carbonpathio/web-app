const RightSmallArrowIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
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
    className={className}
    {...rest}
  >
    <path
      d="M6.66699 11.3334L10.0003 8.00004L6.66699 4.66671"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default RightSmallArrowIcon
