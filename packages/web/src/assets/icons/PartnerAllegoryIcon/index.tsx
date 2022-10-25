const PartnerAllegoryIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 140,
  height = 100,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 140 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className={className}
    {...rest}
  >
    <rect x="4" y="30" width="132" height="40" fill="url(#allegoryPattern)" />
    <defs>
      <pattern id="allegoryPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use
          xlinkHref="#allegoryImage"
          transform="translate(-0.00250209) scale(0.00139005 0.00458716)"
        />
      </pattern>
      <image
        id="allegoryImage"
        width="723"
        height="218"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
)
export default PartnerAllegoryIcon
