const DETECTION_BOUND_LAT = 0.0005
const DETECTION_BOUND_LONG = 0.001

export const isContainedWithinGeom = (markerLat, markerLong, geometry) => {
  let minLat = 9999
  let maxLat = -9999
  let minLong = 9999
  let maxLong = -9999
  geometry.forEach((geom: { lat: number; lng: number }, index: number) => {
    if (geom.lat < minLat) {
      minLat = geom.lat
    }
    if (geom.lat > maxLat) {
      maxLat = geom.lat
    }
    if (geom.lng < minLong) {
      minLong = geom.lng
    }
    if (geom.lng > maxLong) {
      maxLong = geom.lng
    }
  })
  minLat -= DETECTION_BOUND_LAT
  maxLat += DETECTION_BOUND_LAT
  minLong -= DETECTION_BOUND_LONG
  maxLong += DETECTION_BOUND_LONG

  if (minLat < markerLat && markerLat < maxLat && minLong < -markerLong && -markerLong < maxLong) {
    return true
  } else {
    return false
  }
}
