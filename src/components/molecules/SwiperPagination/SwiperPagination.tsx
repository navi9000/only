import type { FC } from "react"
import { useSwiper } from "swiper/react"

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

export default SwiperPagination
