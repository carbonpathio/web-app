const ExpandIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 30,
  height = 30,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 7H13M4 12H20M20 12L17 9M20 12L17 15M4 17H13"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default ExpandIcon
