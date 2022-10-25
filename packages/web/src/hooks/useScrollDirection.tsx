import { useEffect, useState } from 'react'

const useScrollDirection = () => {
  const threshold = 10
  const [scrollDir, setScrollDir] = useState(true)

  useEffect(() => {
    let prevScrollY = window.scrollY
    const scrolledMoreThanThreshold = (currentScrollY: number) =>
      Math.abs(currentScrollY - prevScrollY) > threshold

    // checks current scroll, top/bottom -most
    const isScrollingUp = (currentScrollY: number) =>
      currentScrollY > prevScrollY &&
      !(prevScrollY > 0 && currentScrollY === 0) &&
      !(currentScrollY > 0 && prevScrollY === 0)

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY
      if (scrolledMoreThanThreshold(currentScrollY)) {
        const newScrollDirection = isScrollingUp(currentScrollY) ? false : true
        setScrollDir(newScrollDirection)
        prevScrollY = currentScrollY > 0 ? currentScrollY : 0
      }
    }
    const onScroll = () => window.requestAnimationFrame(updateScrollDirection)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scrollDir
}

export default useScrollDirection
