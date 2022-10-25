const MoreInfoIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 16,
  height = 16,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <path
      d="M12.5 8.66667V12.6667C12.5 13.0203 12.3595 13.3594 12.1095 13.6095C11.8594 13.8595 11.5203 14 11.1667 14H3.83333C3.47971 14 3.14057 13.8595 2.89052 13.6095C2.64048 13.3594 2.5 13.0203 2.5 12.6667V5.33333C2.5 4.97971 2.64048 4.64057 2.89052 4.39052C3.14057 4.14048 3.47971 4 3.83333 4H7.83333"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 2H14.5V6"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.16797 9.33333L14.5013 2"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default MoreInfoIcon
