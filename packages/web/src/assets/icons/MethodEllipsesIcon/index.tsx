const MethodEllipsesIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 47,
  height = 20,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 47 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <circle cx="3" cy="10" r="3" fill="#DADADA" />
    <circle cx="21" cy="10" r="3" fill="#DADADA" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M35.5348 0.525706C36.248 -0.175235 37.4042 -0.175235 38.1173 0.525706L46.4652 8.73083C47.1783 9.43178 47.1783 10.5682 46.4652 11.2692L38.1173 19.4743C37.4042 20.1752 36.248 20.1752 35.5348 19.4743C34.8217 18.7734 34.8217 17.6369 35.5348 16.936L42.5914 10L35.5348 3.06404C34.8217 2.3631 34.8217 1.22665 35.5348 0.525706Z"
      fill="#DADADA"
    />
  </svg>
)
export default MethodEllipsesIcon
