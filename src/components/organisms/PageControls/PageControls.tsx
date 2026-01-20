import { lazy, useRef, type FC } from "react"
import clsx from "clsx"
import usePageControls from "./usePageControls"
import styles from "./PageControls.module.scss"
import Typography from "@/components/atoms/Typography/Typography"
import type { Resolve } from "@/utils/types"
import PageNavigationButton from "@/components/molecules/PageNavigationButton/PageNavigationButton"
import PageSelectorButton from "@/components/molecules/PageSelectorButton/PageSelectorButton"
import { useIsLargeScreen } from "@/utils/viewport"
const CircleShape = lazy(
  () => import("@/components/atoms/CircleShape/CircleShape"),
)

type Props = {
  className?: string
}

const PageControls: FC<Resolve<Props>> = ({ className }) => {
  const {
    humanStyleIndex,
    length,
    activeIndex,
    setActive,
    isFirst,
    isLast,
    setPrev,
    setNext,
    isLoading,
  } = usePageControls()
  const isLargeScreen = useIsLargeScreen()
  const shapeRef = useRef<SVGSVGElement>(null)

  return (
    <div
      className={clsx(
        styles.pagecontrols,
        { [styles.pagecontrols_disabled]: isLoading },
        className,
      )}
    >
      <div className={styles.navigation}>
        <Typography className={styles.counter}>
          0{humanStyleIndex}/0{length}
        </Typography>
        <div className={styles.arrows}>
          <PageNavigationButton
            direction="backward"
            disabled={isFirst}
            onClick={setPrev}
          />
          <PageNavigationButton
            direction="forward"
            disabled={isLast}
            onClick={setNext}
          />
        </div>
      </div>
      {isLargeScreen && (
        <CircleShape ref={shapeRef} className={styles.circle} />
      )}
      <div className={styles.buttons}>
        {Array.from({ length }, (_, index) => (
          <PageSelectorButton
            key={index}
            index={index}
            numberOfElements={length}
            activeIndex={activeIndex}
            onClick={() => setActive(index)}
            shapeRef={shapeRef}
          />
        ))}
      </div>
    </div>
  )
}

export default PageControls
