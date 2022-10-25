const MapTickIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 32,
  height = 32,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M24.0006 21.3542C25.6603 22.0594 26.6673 22.9856 26.6673 24.0001C26.6673 26.2092 21.8917 28.0001 16.0007 28.0001C10.1096 28.0001 5.33398 26.2092 5.33398 24.0001C5.33398 22.9856 6.34102 22.0594 8.00065 21.3542"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.6673 11.2593C22.6673 15.383 16.0007 22.6667 16.0007 22.6667C16.0007 22.6667 9.33398 15.383 9.33398 11.2593C9.33398 7.13553 12.3188 4 16.0007 4C19.6825 4 22.6673 7.13553 22.6673 11.2593Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="15.9993"
      cy="10.6666"
      r="1.33333"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default MapTickIcon
