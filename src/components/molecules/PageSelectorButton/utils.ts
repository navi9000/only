import { ReactRef } from "@gsap/react"
import { ComponentProps } from "react"

export type PageSelectorButtonProps = {
  index: number
  numberOfElements: number
  activeIndex: number
  duration: number
  shapeRef?: ReactRef
} & ComponentProps<"button">
