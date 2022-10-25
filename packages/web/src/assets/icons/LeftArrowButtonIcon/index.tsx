const LeftArrowButtonIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
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
    <g clipPath="url(#clip0_639_5390)">
      <path
        d="M14 7L9 12L14 17"
        stroke="#182B51"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_639_5390">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 24 24)"
        />
      </clipPath>
    </defs>
  </svg>
)
export default LeftArrowButtonIcon
