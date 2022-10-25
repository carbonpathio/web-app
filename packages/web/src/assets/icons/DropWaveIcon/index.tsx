const DropWaveIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 24,
  height = 24,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M15 8.82353C15 11.455 13 12 12 12C11 12 9 11.455 9 8.82353C9 6.19206 12 3 12 3C12 3 15 6.19206 15 8.82353Z"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 15L3.87171 15.6974C4.7987 16.439 6.13505 16.3649 6.97448 15.5255V15.5255C7.83529 14.6647 9.21373 14.6118 10.138 15.404L10.3176 15.5579C11.2857 16.3878 12.7143 16.3878 13.6824 15.5579L13.862 15.404C14.7863 14.6118 16.1647 14.6647 17.0255 15.5255V15.5255C17.8649 16.3649 19.2013 16.439 20.1283 15.6974L21 15"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.5 19L20.0576 19.4424C19.1974 20.3026 17.8026 20.3026 16.9424 19.4424V19.4424C16.1285 18.6285 14.8252 18.5784 13.9512 19.3275L13.6824 19.5579C12.7143 20.3878 11.2857 20.3878 10.3176 19.5579L10.0488 19.3275C9.17484 18.5784 7.87151 18.6285 7.05761 19.4424V19.4424C6.19736 20.3026 4.80264 20.3026 3.94239 19.4424L3.5 19"
      stroke="#182B51"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default DropWaveIcon
