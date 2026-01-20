import type { FC } from "react"
import styles from "./Card.module.scss"
import type { YearHighlights } from "@/utils/types"
import Typography from "@/components/atoms/Typography/Typography"

const Card: FC<YearHighlights> = ({ year, text }) => {
  return (
    <div className={styles.card}>
      <Typography font="collapsed" color="blue">
        {year}
      </Typography>
      <Typography lineheight="tall">{text}</Typography>
    </div>
  )
}

export default Card
