const MoneyIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
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
      d="M3 10L3 8C3 6.89543 3.89543 6 5 6L7 6M3 10C4.33333 10 7 9.2 7 6M3 10L3 14M21 10V8C21 6.89543 20.1046 6 19 6H17M21 10C19.6667 10 17 9.2 17 6M21 10V14M7 6L17 6M21 14V16C21 17.1046 20.1046 18 19 18H17M21 14C19.6667 14 17 14.8 17 18M17 18H7M3 14L3 16C3 17.1046 3.89543 18 5 18H7M3 14C4.33333 14 7 14.8 7 18"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="12"
      r="2"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default MoneyIcon
