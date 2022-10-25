const GlobeIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 24,
  height = 24,
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
      d="M27.3333 12.046C25.699 7.36122 21.2421 4 16 4C11.2884 4 7.21096 6.71542 5.24736 10.6667C5.0263 11.1115 4.83203 11.572 4.66667 12.046M27.3333 12.046C27.7652 13.2841 28 14.6146 28 16C28 17.3854 27.7652 18.7159 27.3333 19.954M27.3333 12.046H4.66667M4.66667 12.046C4.23476 13.2841 4 14.6146 4 16C4 17.3854 4.23476 18.7159 4.66667 19.954M4.66667 19.954C6.30095 24.6388 10.7579 28 16 28C21.2421 28 25.699 24.6388 27.3333 19.954M4.66667 19.954H27.3333"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.3137 4.68629L16 4L16.6863 4.68629C22.9347 10.9347 22.9347 21.0653 16.6863 27.3137L16 28L15.3137 27.3137C9.06532 21.0653 9.06532 10.9347 15.3137 4.68629Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default GlobeIcon
