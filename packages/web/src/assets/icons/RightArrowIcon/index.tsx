const RightArrowIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width,
  height,
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    height={height}
    width={width}
    fill="none"
    viewBox="0 0 24 24"
    stroke="#000"
    strokeWidth={2}
    {...rest}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
)

export default RightArrowIcon
