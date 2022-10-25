const ShrinkIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 30,
  height = 30,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 25 25"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M20 7.5H11M20 12.5H4M4 12.5L7 9.5M4 12.5L7 15.5M20 17.5H11"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default ShrinkIcon
