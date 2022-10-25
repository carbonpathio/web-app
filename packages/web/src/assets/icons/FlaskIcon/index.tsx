const FlaskIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 22,
  height = 22,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <path
      d="M8.7348 2.6875V7.87773C8.734 7.99853 8.70219 8.11709 8.64242 8.22207L3.30101 17.1244C3.24039 17.226 3.20766 17.3417 3.20611 17.46C3.20457 17.5783 3.23427 17.6948 3.29221 17.7979C3.35015 17.901 3.43429 17.987 3.53611 18.0472C3.63794 18.1074 3.75384 18.1396 3.87211 18.1406H17.6287C17.747 18.1396 17.8629 18.1074 17.9647 18.0472C18.0666 17.987 18.1507 17.901 18.2086 17.7979C18.2666 17.6948 18.2963 17.5783 18.2947 17.46C18.2932 17.3417 18.2605 17.226 18.1998 17.1244L12.8584 8.22207C12.7987 8.11709 12.7669 7.99853 12.7661 7.87773V2.6875"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.39062 2.6875H14.1094"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.25781 13.8575C6.24883 13.1268 7.95371 12.7153 10.7504 14.1094C13.7486 15.6128 15.4955 15.0165 16.4529 14.2018"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default FlaskIcon
