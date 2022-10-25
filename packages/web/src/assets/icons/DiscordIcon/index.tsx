const DiscordIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 30,
  height = 30,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <path
      d="M17.4419 2.26397C16.1303 1.62253 14.7427 1.16675 13.3158 0.908691C13.138 1.24455 12.9304 1.69629 12.7872 2.05566C11.2487 1.81387 9.72445 1.81387 8.21429 2.05566C8.07117 1.69637 7.85882 1.24455 7.67945 0.908691C6.25116 1.16687 4.86239 1.6238 3.55015 2.26732C0.938901 6.3918 0.23101 10.4137 0.584916 14.3787C2.31687 15.7306 3.99531 16.5518 5.64546 17.0892C6.05557 16.4997 6.41809 15.8756 6.72929 15.2234C6.13681 14.9876 5.56564 14.6971 5.02257 14.3552C5.16549 14.2445 5.30504 14.1291 5.44101 14.0092C8.73179 15.618 12.3074 15.618 15.559 14.0092C15.6955 14.1283 15.835 14.2437 15.9773 14.3552C15.4334 14.698 14.8612 14.9891 14.2675 15.2251C14.5805 15.88 14.9423 16.5047 15.3513 17.0908C17.003 16.5535 18.683 15.7323 20.415 14.3787C20.8303 9.78233 19.7056 5.79725 17.4419 2.26389V2.26397ZM7.17765 11.9403C6.18976 11.9403 5.3796 10.9763 5.3796 9.8025C5.3796 8.62867 6.17249 7.66306 7.17765 7.66306C8.18289 7.66306 8.99296 8.62695 8.9757 9.8025C8.97726 10.9763 8.18289 11.9403 7.17765 11.9403ZM13.8223 11.9403C12.8344 11.9403 12.0243 10.9763 12.0243 9.8025C12.0243 8.62867 12.8171 7.66306 13.8223 7.66306C14.8275 7.66306 15.6376 8.62695 15.6203 9.8025C15.6203 10.9763 14.8275 11.9403 13.8223 11.9403Z"
      fill="current"
    />
  </svg>
)
export default DiscordIcon
