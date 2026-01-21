import { useEffect, useState } from "react"
import Swiper from "swiper"
import { useSwiper } from "swiper/react"

export function useSwiperNavigation() {
  const swiper = useSwiper()

  const [isBeginning, setIsBeginning] = useState(swiper.isBeginning)
  const [isEnd, setIsEnd] = useState(swiper.isEnd)

  useEffect(() => {
    const onSlideChange = (swiperInstance: Swiper) => {
      setIsBeginning(swiperInstance.isBeginning)
      setIsEnd(swiperInstance.isEnd)
    }
    if (swiper) {
      swiper.on("slideChange", onSlideChange)
    }
    return () => {
      swiper.off("slideChange", onSlideChange)
    }
  }, [swiper])

  return {
    isBeginning,
    isEnd,
    slidePrev: () => swiper.slidePrev(),
    slideNext: () => swiper.slideNext(),
  }
}
