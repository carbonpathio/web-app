const CheckIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 13,
  height = 10,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 13 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <path d="M11.3037 1.625L4.55371 8.375L1.17871 5" fill="current" />
    <path
      d="M11.3037 1.625L4.55371 8.375L1.17871 5"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default CheckIcon
