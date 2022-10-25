const ScrollIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
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
      d="M5 13V5C5 3.89543 5.89543 3 7 3H19C20.1046 3 21 3.89543 21 5V18C21 19 20.4 21 18 21M18 21H6C5 21 3 20.4 3 18V16H15V18C15 20.4 17 21 18 21Z"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default ScrollIcon
