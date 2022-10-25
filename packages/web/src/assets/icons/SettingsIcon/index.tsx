const SettingsIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 32,
  height = 32,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M18.6658 28H13.3325L12.5978 24.6942C11.7163 24.3491 10.9001 23.8738 10.1728 23.2919L6.9401 24.3094L4.27344 19.6906L6.77016 17.4004C6.70143 16.9436 6.6658 16.476 6.6658 16C6.6658 15.524 6.70143 15.0563 6.77017 14.5995L4.27344 12.3094L6.94011 7.69058L10.1729 8.70808C10.9001 8.12623 11.7163 7.65092 12.5978 7.3058L13.3325 4H18.6658L19.4004 7.3058C20.2819 7.65092 21.0981 8.12622 21.8254 8.70806L25.058 7.69059L27.7247 12.3094L25.2281 14.5994C25.2968 15.0563 25.3325 15.524 25.3325 16C25.3325 16.476 25.2968 16.9437 25.2281 17.4005L27.7247 19.6906L25.058 24.3094L21.8254 23.2919C21.0981 23.8738 20.2819 24.3491 19.4004 24.6942L18.6658 28Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15.9999L14.6667 18.6666L20 13.3333"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default SettingsIcon
