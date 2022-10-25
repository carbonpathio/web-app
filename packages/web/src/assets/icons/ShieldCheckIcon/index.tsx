const ShieldCheckIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 21,
  height = 21,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <path
      d="M3.28125 9.40898V4.59375C3.28125 4.4197 3.35039 4.25278 3.47346 4.12971C3.59653 4.00664 3.76345 3.9375 3.9375 3.9375H17.0625C17.2365 3.9375 17.4035 4.00664 17.5265 4.12971C17.6496 4.25278 17.7188 4.4197 17.7188 4.59375V9.40898C17.7188 16.2996 11.8699 18.5801 10.7051 18.9656C10.5727 19.0146 10.4273 19.0146 10.2949 18.9656C9.13008 18.5801 3.28125 16.2996 3.28125 9.40898Z"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.1094 8.53125L9.29414 13.125L6.89062 10.8281"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default ShieldCheckIcon
