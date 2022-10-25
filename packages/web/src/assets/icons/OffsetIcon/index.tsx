const OffsetIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 56,
  height = 56,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <rect width="56" height="56" rx="12" fill="current" stroke="none"/>
    <g clipPath="url(#clip0_639_5189)">
      <path
        d="M22.7498 33.2501C25.2352 35.7354 29.3393 35.6608 31.9167 33.0834C35.2467 29.7534 35.6281 24.6087 35.5887 22.0521C35.5745 21.136 34.8639 20.4254 33.9478 20.4113C31.3912 20.3718 26.2465 20.7532 22.9165 24.0832C20.3391 26.6606 20.2645 30.7648 22.7498 33.2501ZM22.7498 33.2501L20.4998 35.5001M22.7498 33.2501L28.75 27.25M31 24.9999L28.75 27.25M28.75 27.25L31 28M28.75 27.25L27.9999 24.9999M27.9999 31L26.6986 30.5663C26.1014 30.3672 25.6327 29.8986 25.4337 29.3013L24.9999 28"
        stroke="current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_639_5189">
        <rect width="24" height="24" fill="white" transform="translate(16 16)" />
      </clipPath>
    </defs>
  </svg>
)
export default OffsetIcon
