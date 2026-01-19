import { useRef, type FC } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import Card from "../../molecules/Card/Card"
import styles from "./CardList.module.scss"
import "swiper/css"
import { useIsLargeScreen } from "../../../utils/viewport"
import { Navigation, Pagination } from "swiper/modules"
import useCardList from "./useCardList"
import clsx from "clsx"
import Divider from "../../atoms/Divider/Divider"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import type { Resolve } from "../../../utils/types"

type Props = {
  className?: string
}

const CardList: FC<Resolve<Props>> = ({ className }) => {
  const isLargeScreen = useIsLargeScreen()
  const { SwiperNavigation, SwiperMask, list, isLoading } = useCardList()
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (isLargeScreen === false && ref.current && isLoading) {
        gsap.from(ref.current, {
          opacity: 0,
          y: 20,
          duration: 1,
        })
      }
    },
    { dependencies: [isLargeScreen, isLoading] },
  )

  return (
    <div className={clsx(styles.cardlist, className)} ref={ref}>
      {isLargeScreen === false && <Divider className={styles.divider} />}
      <div>
        <Swiper
          className={styles.swiper}
          breakpoints={{
            [320]: {
              slidesPerView: 1.5,
              slidesOffsetAfter: 20,
              slidesOffsetBefore: 20,
              spaceBetween: 8,
            },
            [1440]: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          modules={[Navigation, Pagination]}
        >
          {list.map((card, index) => (
            <SwiperSlide key={index}>
              <Card {...card} />
            </SwiperSlide>
          ))}
          {isLargeScreen === false && <SwiperMask />}

          {/* {isLargeScreen && <SwiperNavigation />} */}
        </Swiper>
      </div>
    </div>
  )
}

export default CardList
