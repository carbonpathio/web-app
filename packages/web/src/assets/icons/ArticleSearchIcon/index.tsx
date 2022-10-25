const ArticleSearchIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
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
      d="M20 10.6666H22.6667M20 15.9999H22.6667M16 21.3333H9.33333M28 15.9999V7.33325C28 6.22868 27.1046 5.33325 26 5.33325H6C4.89543 5.33325 4 6.22868 4 7.33325V24.6666C4 25.7712 4.89543 26.6666 6 26.6666H16M9.33333 10.6666V15.9999H14.6667V10.6666H9.33333Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25.6904 25.6904C26.2936 25.0871 26.6667 24.2538 26.6667 23.3333C26.6667 21.4924 25.1743 20 23.3333 20C21.4924 20 20 21.4924 20 23.3333C20 25.1743 21.4924 26.6667 23.3333 26.6667C24.2538 26.6667 25.0871 26.2936 25.6904 25.6904ZM25.6904 25.6904L28 28"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ArticleSearchIcon
