const MenuIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 40,
  height = 40,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 40 40"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M32 12H8M32 20H8M32 28H21.7143"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default MenuIcon
