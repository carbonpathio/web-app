const CloseIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 56,
  height = 56,
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)
export default CloseIcon
