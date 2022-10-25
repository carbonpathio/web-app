const BellFilledIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  width = 20,
  height = 20,
  className,
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      d="M4.75 9.11111C4.75 4.84444 8.25 3.77778 10 3.77778C14.2 3.77778 15.25 7.33333 15.25 9.11111V12.6667L17 14.4444H12.625H7.375H3L4.75 12.6667V9.11111Z"
      fill="#182B51"
    />
    <path
      d="M10 3.77778C8.25 3.77778 4.75 4.84444 4.75 9.11111V12.6667L3 14.4444H7.375H12.625H17L15.25 12.6667V9.11111C15.25 7.33333 14.2 3.77778 10 3.77778ZM10 3.77778V2M7.375 15.3333C7.375 16.2222 7.9 18 10 18C12.1 18 12.625 16.2222 12.625 15.3333"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default BellFilledIcon
