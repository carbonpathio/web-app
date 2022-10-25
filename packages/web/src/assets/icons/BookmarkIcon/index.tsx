const BookmarkIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 16,
  height = 16,
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 16 16"
    strokeWidth={2}
    {...rest}
  >
    <path
      d="M11 1H5C3.89543 1 3 1.89543 3 3V13.8773C3 14.3102 3.51272 14.5386 3.83448 14.249L6.66207 11.7041C7.42268 11.0196 8.57732 11.0196 9.33793 11.7041L12.1655 14.249C12.4873 14.5386 13 14.3102 13 13.8773V3C13 1.89543 12.1046 1 11 1Z"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default BookmarkIcon
