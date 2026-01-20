import clsx from "clsx"
import { FC, useEffect, useState } from "react"
import Swiper from "swiper"
import { useSwiper } from "swiper/react"
import styles from "./SwiperMask.module.scss"

const SwiperMask: FC = () => {
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

  return (
    <div
      className={clsx(styles.swipermask, {
        [styles.swipermask_start]: !isBeginning && isEnd,
        [styles.swipermask_end]: !isEnd,
      })}
    />
  )
}

export default SwiperMask
