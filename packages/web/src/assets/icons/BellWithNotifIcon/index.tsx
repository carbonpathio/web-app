const BellWithNotifIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  width = 24,
  height = 24,
  className,
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      d="M12 5C10 5 6 6.2 6 11V15L4 17H9M12 5C16.8 5 18 9 18 11V15L20 17H15M12 5V3M9 17V18C9 19 9.6 21 12 21C14.4 21 15 19 15 18V17M9 17H15"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="18" cy="7" r="4" fill="#DC5454" stroke="white" strokeWidth="2" />
  </svg>
)
export default BellWithNotifIcon
