const TransactionIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
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
      d="M8 8L10 6M8 8L10 10M8 8H14C15.1046 8 16 8.89543 16 10V11M16 16L14 18M16 16L14 14M16 16H10C8.89543 16 8 15.1046 8 14V13"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      r="10"
      transform="matrix(-1 0 0 1 12 12)"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default TransactionIcon
