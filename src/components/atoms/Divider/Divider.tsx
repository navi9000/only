import type { ComponentProps, FC } from "react"
import styles from "./Divider.module.scss"
import clsx from "clsx"

const Divider: FC<ComponentProps<"hr">> = ({ className, ...rest }) => {
  return <hr className={clsx(styles.hr, className)} {...rest} />
}

export default Divider
