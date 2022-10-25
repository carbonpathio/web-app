const CarbonPathWhiteIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 60,
  height = 48,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 60 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <path
      id="carbonPathWhite"
      d="M26.66 41.61a.765.765 0 0 1-.384.66l-9.37 5.322a3.127 3.127 0 0 1-3.094 0L1.546 40.628A3.05 3.05 0 0 1 0 37.988V24.06c0-1.084.594-2.097 1.547-2.64l12.265-6.965a3.146 3.146 0 0 1 3.099 0l9.37 5.322c.24.136.384.387.384.66v4.842l-11.301-6.42-10.712 6.082v12.164l10.712 6.082 11.301-6.42v4.843h-.005ZM58.448 7.373 46.183.408a3.136 3.136 0 0 0-3.094 0L30.825 7.372a3.04 3.04 0 0 0-1.547 2.64v30.616l4.262-2.419a.755.755 0 0 0 .384-.66v-9.82h.01v-4.681h-.01v-12.16l10.712-6.08 10.712 6.08v12.165l-10.645 6.046-8.15-5.154v5.023c0 .257.132.5.353.64l6.08 3.845a3.146 3.146 0 0 0 3.223.075l12.244-6.953A3.04 3.04 0 0 0 60 23.935V10.006a3.04 3.04 0 0 0-1.547-2.64l-.005.005Z"
      fill="#fff"
    />
  </svg>
)
export default CarbonPathWhiteIcon
