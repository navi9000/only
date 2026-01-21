import clsx from "clsx"
import { type FC } from "react"
import styles from "./SwiperNavigation.module.scss"
import Button from "@/components/atoms/Button/Button"
import arrowIcon from "@/assets/forward_arrow_cards.svg"
import { useSwiperNavigation } from "@/utils/swiper"

const SwiperNavigation: FC<{ className?: string }> = ({ className }) => {
  const { isBeginning, isEnd, slidePrev, slideNext } = useSwiperNavigation()

  return (
    <>
      <Button
        className={clsx(
          styles.navigationbutton,
          styles.navigationbutton_backward,
          { [styles.navigationbutton_hidden]: isBeginning },
        )}
        variant="icon"
        onClick={slidePrev}
      >
        <img src={arrowIcon} alt="back" />
      </Button>
      <Button
        className={clsx(
          styles.navigationbutton,
          styles.navigationbutton_forward,
          {
            [styles.navigationbutton_hidden]: isEnd,
          },
        )}
        variant="icon"
        onClick={slideNext}
      >
        <img src={arrowIcon} alt="back" />
      </Button>
    </>
  )
}

export default SwiperNavigation
