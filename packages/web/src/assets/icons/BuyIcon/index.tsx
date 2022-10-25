const BuyIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 56,
  height = 56,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 44 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <path
      d="M30 25.0002V23.0002C30 20.7911 28.2091 19.0002 26 19.0002H25C24.4477 19.0002 24 18.5525 24 18.0002V13.0002C24 11.8957 23.1046 11.0002 22 11.0002V11.0002C20.8954 11.0002 20 11.8957 20 13.0002V22.0002L17.6 18.8002C17.2223 18.2966 16.6295 18.0002 16 18.0002H15.5662C14.7012 18.0002 14 18.7015 14 19.5664V19.5664C14 19.8503 14.0771 20.1288 14.2232 20.3722L17 25.0002"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 8.00024V7.00024"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28 14.0002L29 14.0002"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 14.0002L16 14.0002"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.3438 9.34334L16.6367 8.63623"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.6562 9.34334L27.3633 8.63623"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default BuyIcon
