const DownloadIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 22,
  height = 25,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <path
      d="M20 15.25V19.25C20 19.7804 19.8127 20.2891 19.4793 20.6642C19.1459 21.0393 18.6937 21.25 18.2222 21.25H5.77778C5.30628 21.25 4.8541 21.0393 4.5207 20.6642C4.1873 20.2891 4 19.7804 4 19.25V15.25"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 10.25L12 15.25L17 10.25"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15.25V4.25"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default DownloadIcon
