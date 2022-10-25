const ExploreIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 56,
  height = 56,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="14 10 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...rest}
  >
    <rect x="14" y="10" width="56" height="56" rx="12" fill="current" stroke="none" />
    <circle
      cx="42"
      cy="38"
      r="9"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M38 30V32C38 33.1046 38.8954 34 40 34H41C42.1046 34 43 34.8954 43 36V36C43 37.1046 43.8954 38 45 38V38C46.1046 38 47 37.1046 47 36V36C47 34.8954 47.8954 34 49 34H50M50 42H47C45.8954 42 45 42.8954 45 44V46M41 46V44C41 42.8954 40.1046 42 39 42V42C37.8954 42 37 41.1046 37 40V40C37 38.8954 36.1046 38 35 38H33"
      stroke="current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default ExploreIcon
