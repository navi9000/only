import clsx from "clsx"
import type { FC } from "react"
import { useSwiper } from "swiper/react"
import styles from "./SwiperNavigation.module.scss"
import Button from "@/components/atoms/Button/Button"
import arrowIcon from "@/assets/forward_arrow_cards.svg"

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

export default SwiperNavigation
