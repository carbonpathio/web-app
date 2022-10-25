const ContactUsIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
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
      d="M8 18.7192C6.33865 20.1353 4.81983 21 2 21C3 20 4.27088 18.65 4.80115 16.5528C3.06674 15.114 2 13.1567 2 11C2 6.58172 6.47715 3 12 3C17.0995 3 21.3075 6.05369 21.9226 10"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 19.8889C12.6863 19.8889 10 17.899 10 15.4444C10 12.9898 12.6863 11 16 11C19.3137 11 22 12.9898 22 15.4444C22 16.6426 21.36 17.73 20.3193 18.5293C20.6375 19.6944 21.4 20.4444 22 21C20.2 21 19.2835 20.4563 18.2077 19.5784C17.5244 19.7788 16.7795 19.8889 16 19.8889Z"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default ContactUsIcon
