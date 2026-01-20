import type { FC } from "react"
import clsx from "clsx"
import usePageControls from "./usePageControls"
import Button from "@/components/atoms/Button/Button"
import styles from "./PageControls.module.scss"
import Typography from "@/components/atoms/Typography/Typography"
import backArrowImg from "@/assets/back_arrow_pages.svg"
import type { Resolve } from "@/utils/types"

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
          <Button variant="icon" disabled={isFirst} onClick={setPrev}>
            <img
              className={clsx(styles.arrow, {
                [styles.arrow_disabled]: isFirst,
              })}
              src={backArrowImg}
              alt="back"
            />
          </Button>
          <Button variant="icon" disabled={isLast} onClick={setNext}>
            <img
              className={clsx(styles.arrow, styles.arrow_forward, {
                [styles.arrow_disabled]: isLast,
              })}
              src={backArrowImg}
              alt="forward"
            />
          </Button>
        </div>
      </div>
      <div className={styles.buttons}>
        {Array.from({ length }, (_, index) => (
          <Button
            key={index}
            variant="bullet"
            active={isActive(index)}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default PageControls
