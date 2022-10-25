const ItemTagIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 48,
  height = 48,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <rect width="48" height="48" rx="24" fill="#385877" />
    <path
      d="M15 23.1716V17C15 15.8954 15.8954 15 17 15H23.1716C23.702 15 24.2107 15.2107 24.5858 15.5858L32.5858 23.5858C33.3668 24.3668 33.3668 25.6332 32.5858 26.4142L26.4142 32.5858C25.6332 33.3668 24.3668 33.3668 23.5858 32.5858L15.5858 24.5858C15.2107 24.2107 15 23.702 15 23.1716Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 19H19.001"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default ItemTagIcon
