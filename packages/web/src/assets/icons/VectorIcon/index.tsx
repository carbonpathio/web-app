const VectorIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
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
    <path
      d="M5.03419 5.80476L9.46121 18.5948C9.65007 19.1462 10.4358 19.1311 10.6095 18.5721L12.3924 12.7852C12.4193 12.6906 12.4704 12.6047 12.5406 12.5358C12.6108 12.4669 12.6977 12.4175 12.7928 12.3924L18.5721 10.6095C19.1311 10.4358 19.1462 9.65007 18.5948 9.46121L5.80476 5.03419C5.6973 4.99642 5.58135 4.98979 5.47029 5.01506C5.35922 5.04033 5.25756 5.09647 5.17702 5.17702C5.09647 5.25756 5.04033 5.35922 5.01506 5.47029C4.98979 5.58135 4.99642 5.6973 5.03419 5.80476V5.80476Z"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default VectorIcon
