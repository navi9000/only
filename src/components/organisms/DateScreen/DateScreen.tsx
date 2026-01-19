import { type FC } from "react"
import styles from "./DateScreen.module.scss"
import AnimatedNumber from "../../molecules/AnimatedNumber/AnimatedNumber"
import clsx from "clsx"
import Typography from "../../atoms/Typography/Typography"
import useDateScreen from "./useDateScreen"
import PageControls from "../PageControls/PageControls"
import type { Resolve } from "../../../utils/types"

type Props = {
  className?: string
}

const DateScreen: FC<Resolve<Props>> = ({ className }) => {
  const { yearStart, yearEnd, duration } = useDateScreen()
  return (
    <div className={styles.datescreen}>
      <Typography
        size="large"
        bold
        className={styles.title}
        lineheight="medium"
      >
        Исторические
        <br />
        даты
      </Typography>
      <div className={clsx(styles.daterange, className)}>
        <AnimatedNumber color="blue" value={yearStart} duration={duration} />
        <AnimatedNumber color="pink" value={yearEnd} duration={duration} />
      </div>
      <PageControls className={styles.controls} />
    </div>
  )
}

export default DateScreen
