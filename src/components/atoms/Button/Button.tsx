import type { ComponentProps, FC } from "react"
import styles from "./Button.module.scss"
import clsx from "clsx"
import { Resolve } from "@/utils/types"

interface Props extends ComponentProps<"button"> {
  variant: "bullet" | "icon"
  active?: boolean
}

console.log({ styles })

const Button: FC<Resolve<Props>> = ({
  className,
  children,
  active,
  variant,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        {
          [styles[`button_variant${variant}`]]: variant,
          [styles[`button_active`]]: active,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
