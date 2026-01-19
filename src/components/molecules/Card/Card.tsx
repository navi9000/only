import type { FC } from "react"
import type { Resolve, YearHighlights } from "../../../utils/types"
import styles from "./Card.module.scss"
import Typography from "../../atoms/Typography/Typography"

const Card: FC<Resolve<YearHighlights>> = ({ year, text }) => {
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
