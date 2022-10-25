const InfoCircleIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 20,
  height = 20,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="#DC5454"
    {...rest}
  >
    <circle
      cx="10"
      cy="10"
      r="7.5"
      stroke="current"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 13.75L10 10"
      stroke="current"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 6.25V6.2499"
      stroke="current"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default InfoCircleIcon
