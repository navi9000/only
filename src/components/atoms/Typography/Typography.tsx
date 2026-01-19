import clsx from "clsx"
import styles from "./Typography.module.scss"
import type { FC, ReactNode } from "react"
import { Resolve } from "../../../utils/types"

interface CommonProps {
  children?: ReactNode
  tag?: keyof HTMLElementTagNameMap
  className?: string
  color?: "primary" | "blue" | "pink"
  letterspacing?: "tight"
  lineheight?: "medium" | "tall"
}

interface PrimaryFontProps extends CommonProps {
  font?: "primary"
  bold?: boolean
  size?: "huge" | "large" | "normal"
}

interface CollapsedFontProps extends CommonProps {
  font: "collapsed"
  bold?: never
  size?: never
}

type Props = PrimaryFontProps | CollapsedFontProps

const Typography: FC<Resolve<Props>> = ({
  tag: Component = "div",
  children,
  font = "primary",
  className,
  color = "primary",
  size,
  bold,
  letterspacing,
  lineheight,
}) => {
  return (
    <Component
      className={clsx(
        styles.text,
        {
          [styles[`text_color${color}`]]: color,
          [styles[`text_font${font}`]]: font,
          [styles[`text_size${size ?? "normal"}`]]: size ?? font === "primary",
          [styles[`text_bold`]]: font === "primary" && bold,
          [styles[`text_letterspacing${letterspacing}`]]: letterspacing,
          [styles[`text_lineheight${lineheight}`]]: lineheight,
        },
        className,
      )}
    >
      {children}
    </Component>
  )
}

export default Typography
