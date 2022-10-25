import React from "react"

const ActiveLayersIcon: React.FC<React.SVGAttributes<HTMLOrSVGElement>> = ({
  className,
  width = 24,
  height = 24,
  color,
  ...rest
}) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="7" height="7" rx="1" stroke={color} strokeWidth="2"/>
        <rect x="12" y="1" width="7" height="7" rx="1" stroke={color} strokeWidth="2"/>
        <rect x="1" y="12" width="7" height="7" rx="1" stroke={color} strokeWidth="2"/>
        <rect x="12" y="12" width="7" height="7" rx="1" stroke={color} strokeWidth="2"/>
    </svg>
)
export default ActiveLayersIcon
