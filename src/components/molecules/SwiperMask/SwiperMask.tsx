import clsx from "clsx"
import { FC } from "react"
import styles from "./SwiperMask.module.scss"
import { useSwiperNavigation } from "@/utils/swiper"

const SwiperMask: FC = () => {
  const { isBeginning, isEnd } = useSwiperNavigation()

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
