import type { FC } from "react"
import clsx from "clsx"
import usePageControls from "./usePageControls"
import styles from "./PageControls.module.scss"
import Typography from "@/components/atoms/Typography/Typography"
import type { Resolve } from "@/utils/types"
import PageNavigationButton from "@/components/molecules/PageNavigationButton/PageNavigationButton"
import PageSelectorButton from "@/components/molecules/PageSelectorButton/PageSelectorButton"

type Props = {
  className?: string
}

const PageControls: FC<Resolve<Props>> = ({ className }) => {
  const {
    readableIndex,
    length,
    isActive,
    setActive,
    isFirst,
    isLast,
    setPrev,
    setNext,
    isLoading,
  } = usePageControls()
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
          0{readableIndex}/0{length}
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
      <div className={styles.buttons}>
        {Array.from({ length }, (_, index) => (
          <PageSelectorButton
            key={index}
            index={index}
            active={isActive(index)}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default PageControls
