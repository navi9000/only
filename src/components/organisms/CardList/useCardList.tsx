import clsx from "clsx"
import { useEffect, useState, type FC, type PropsWithChildren } from "react"
import { useSwiper } from "swiper/react"
import styles from "./CardList.module.scss"
import type Swiper from "swiper"
import useBlockContext from "../../templates/Block/useBlockContext"
import arrowIcon from "../../../assets/forward_arrow_cards.svg"
import Button from "../../atoms/Button/Button"

const SwiperNavigation: FC<{ className?: string }> = ({ className }) => {
  const swiper = useSwiper()

  return (
    <div className={clsx(styles.navigation, className)}>
      <Button variant="icon" onClick={() => swiper.slidePrev()}>
        <img src={arrowIcon} alt="back" />
      </Button>
      <Button variant="icon" onClick={() => swiper.slideNext()}>
        <img src={arrowIcon} alt="back" />
      </Button>
    </div>
  )
}

const SwiperPagination: FC<{ className?: string }> = ({ className }) => {
  const swiper = useSwiper()

  return (
    <div>
      {Array.from({ length: swiper.slides.length }, (_, index) => (
        <button
          onClick={() => swiper.slideTo(index)}
          style={{ width: "100px" }}
        >
          {index}
        </button>
      ))}
    </div>
  )
}

const SwiperMask: FC<PropsWithChildren> = () => {
  const swiper = useSwiper()
  const [isBeginning, setIsBeginning] = useState(swiper.isBeginning)
  const [isEnd, setIsEnd] = useState(swiper.isEnd)

  useEffect(() => {
    const onSlideChange = (swiperInstance: Swiper) => {
      setIsBeginning(swiperInstance.isBeginning)
      setIsEnd(swiperInstance.isEnd)
      console.log("effect")
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

export default function useCardList() {
  const { blockData, selectedPage, isLoading } = useBlockContext()
  return {
    SwiperNavigation,
    SwiperPagination,
    SwiperMask,
    list: blockData.data[selectedPage].list,
    isLoading,
  }
}
