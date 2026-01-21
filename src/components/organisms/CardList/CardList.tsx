import { lazy, useRef, type FC } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import Card from "@/components/molecules/Card/Card"
import styles from "./CardList.module.scss"
import "swiper/css"
import { useIsLargeScreen } from "@/utils/viewport"
import { Navigation, Pagination } from "swiper/modules"
import useCardList from "./useCardList"
import clsx from "clsx"
import Divider from "@/components/atoms/Divider/Divider"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import type { Resolve } from "@/utils/types"
const SwiperMask = lazy(
  () => import("@/components/molecules/SwiperMask/SwiperMask"),
)
const SwiperNavigation = lazy(
  () => import("@/components/molecules/SwiperNavigation/SwiperNavigation"),
)

type Props = {
  className?: string
}

const CardList: FC<Resolve<Props>> = ({ className }) => {
  const isLargeScreen = useIsLargeScreen()
  const { list, isLoading } = useCardList()
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
            [480]: {
              slidesPerView: 1.5,
              slidesOffsetAfter: 20,
              slidesOffsetBefore: 20,
              spaceBetween: 16,
            },
            [768]: {
              slidesPerView: 2.5,
              slidesOffsetAfter: 20,
              slidesOffsetBefore: 20,
              spaceBetween: 16,
            },
            [900]: {
              slidesPerView: 2,
              slidesOffsetAfter: 40,
              slidesOffsetBefore: 40,
              spaceBetween: 40,
            },
            [1440]: {
              slidesPerView: 3,
              spaceBetween: 80,
              slidesOffsetBefore: 80,
              slidesOffsetAfter: 80,
            },
          }}
          modules={[Navigation, Pagination]}
        >
          {list.map((card, index) => (
            <SwiperSlide key={index}>
              <Card {...card} />
            </SwiperSlide>
          ))}
          {!isLargeScreen && <SwiperMask />}
          {isLargeScreen && <SwiperNavigation className={styles.navigation} />}
        </Swiper>
      </div>
    </div>
  )
}

export default CardList
