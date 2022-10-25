const DownArrowIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  ...rest
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
)

export default DownArrowIcon