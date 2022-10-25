const ImpactIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
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
      d="M12 13C8 13 7 9.66667 7 8V4L9.5 6L12 3L14.5 6L17 4V8C17 9.66667 16 13 12 13ZM12 13V21M13 21C18.6 21 20 16.3333 20 14C14.4 14 13 18.6667 13 21ZM13 21H12M11 21C5.4 21 4 16.3333 4 14C9.6 14 11 18.6667 11 21ZM11 21H12"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default ImpactIcon
