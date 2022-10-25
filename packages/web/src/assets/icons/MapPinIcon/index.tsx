const MapPinIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 24,
  height = 24,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M18 16.0156C19.2447 16.5445 20 17.2392 20 18C20 19.6568 16.4183 21 12 21C7.58172 21 4 19.6568 4 18C4 17.2392 4.75527 16.5445 6 16.0156"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 8.44444C17 11.5372 12 17 12 17C12 17 7 11.5372 7 8.44444C7 5.35165 9.23858 3 12 3C14.7614 3 17 5.35165 17 8.44444Z"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="8"
      r="1"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default MapPinIcon
