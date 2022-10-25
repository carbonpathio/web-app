const ChevronDownIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 20,
  height = 20,
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    width={width}
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)
export default ChevronDownIcon
