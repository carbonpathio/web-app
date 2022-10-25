const RetireIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
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
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M17 7C14.9294 7 13.1528 8.25861 12.3935 10.0525C11.9629 11.0697 12.8954 12 14 12H20C21.1046 12 22.0371 11.0697 21.6065 10.0525C20.8472 8.25861 19.0706 7 17 7Z"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 17C17 14.9294 15.7414 13.1528 13.9475 12.3935C12.9303 11.9629 12 12.8954 12 14L12 20C12 21.1046 12.9303 22.0371 13.9475 21.6065C15.7414 20.8472 17 19.0706 17 17Z"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 17C9.07059 17 10.8472 15.7414 11.6065 13.9475C12.0371 12.9303 11.1046 12 10 12L4 12C2.89543 12 1.96289 12.9303 2.39346 13.9475C3.15279 15.7414 4.92941 17 7 17Z"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 7C7 9.07059 8.25861 10.8472 10.0525 11.6065C11.0697 12.0371 12 11.1046 12 10L12 4C12 2.89543 11.0697 1.96289 10.0525 2.39346C8.25861 3.1528 7 4.92941 7 7Z"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default RetireIcon
