const LinkMoreIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 20,
  height = 20,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <path
      d="M14.5 11V14.4C14.5 14.8243 14.3314 15.2313 14.0314 15.5314C13.7313 15.8314 13.3243 16 12.9 16H4.1C3.67565 16 3.26869 15.8314 2.96863 15.5314C2.66857 15.2313 2.5 14.8243 2.5 14.4V5.6C2.5 5.17565 2.66857 4.76869 2.96863 4.46863C3.26869 4.16857 3.67565 4 4.1 4H8.5"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 2.5H17.5V7.5"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 10L16.5 4"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default LinkMoreIcon
