const GradientDownIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 72,
  height = 72,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <path
      d="M36.0006 48L34.5609 49.3883C34.9378 49.7792 35.4575 50 36.0006 50C36.5436 50 37.0633 49.7792 37.4402 49.3883L36.0006 48ZM56.726 29.3883C57.4927 28.5932 57.4697 27.327 56.6745 26.5603C55.8794 25.7936 54.6133 25.8166 53.8466 26.6117L56.726 29.3883ZM18.1545 26.6117C17.3878 25.8166 16.1217 25.7936 15.3266 26.5603C14.5315 27.327 14.5084 28.5932 15.2752 29.3883L18.1545 26.6117ZM37.4402 49.3883L56.726 29.3883L53.8466 26.6117L34.5609 46.6117L37.4402 49.3883ZM37.4402 46.6117L18.1545 26.6117L15.2752 29.3883L34.5609 49.3883L37.4402 46.6117Z"
      fill="url(#paint0_linear_2090_9622)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_2090_9622"
        x1="16.7148"
        y1="48"
        x2="54.4146"
        y2="23.0201"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#69DAB9" />
        <stop offset="0.807292" stopColor="#1C3568" />
      </linearGradient>
    </defs>
  </svg>
)
export default GradientDownIcon
