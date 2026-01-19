import { type FC } from "react"
import styles from "./DateScreen.module.scss"
import AnimatedNumber from "@/components/molecules/AnimatedNumber/AnimatedNumber"
import clsx from "clsx"
import Typography from "@/components/atoms/Typography/Typography"
import useDateScreen from "./useDateScreen"
import type { Resolve } from "@/utils/types"
import PageControls from "@/components/organisms/PageControls/PageControls"

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
