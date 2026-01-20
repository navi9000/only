import { ComponentProps, FC } from "react"
import Button from "@/components/atoms/Button/Button"
import clsx from "clsx"
import backArrowImg from "@/assets/back_arrow_pages.svg"
import styles from "./PageNavigationButton.module.scss"
import { Resolve } from "@/utils/types"

type Props = {
  direction: "backward" | "forward"
} & ComponentProps<"button">

const PageNavigationButton: FC<Resolve<Props>> = ({
  direction,
  disabled,
  ...rest
}) => {
  return (
    <Button variant="icon" disabled={disabled} {...rest}>
      <img
        className={clsx(styles.arrow, {
          [styles.arrow_disabled]: disabled,
          [styles[`arrow_${direction}`]]: direction,
        })}
        src={backArrowImg}
        alt="back"
      />
    </Button>
  )
}

export default PageNavigationButton
