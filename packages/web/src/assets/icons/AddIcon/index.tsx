const PlusIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
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
      d="M5 12H12M19 12H12M12 12V5M12 12V19"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default PlusIcon
