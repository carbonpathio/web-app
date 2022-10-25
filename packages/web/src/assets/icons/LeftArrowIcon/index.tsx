const LeftArrowIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  ...rest
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="#000" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
)

export default LeftArrowIcon