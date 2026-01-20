import Button from "@/components/atoms/Button/Button"
import { Resolve } from "@/utils/types"
import { useIsLargeScreen } from "@/utils/viewport"
import { type Ref, useRef, type ComponentProps, type FC } from "react"
import gsap from "gsap"
import { ReactRef, useGSAP } from "@gsap/react"
import { MotionPathPlugin } from "gsap/all"

type Props = {
  index: number
  numberOfElements: number
  activeIndex: number
  shapeRef?: ReactRef
} & ComponentProps<"button">

const initialStyles: GSAPTweenVars = {
  backgroundColor: "var(--color-primary)",
  borderColor: "transparent",
  height: "8px",
  width: "8px",
}

const activeStyles: GSAPTweenVars = {
  backgroundColor: "white",
  borderColor: "var(--color-primary)",
  height: "56px",
  width: "56px",
}

gsap.registerPlugin(MotionPathPlugin)

const PageSelectorButton: FC<Resolve<Props>> = ({
  activeIndex,
  index,
  shapeRef,
  ...rest
}) => {
  const active = activeIndex === index
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isLargeScreen = useIsLargeScreen()
  const { contextSafe } = useGSAP(
    () => {
      if (!isLargeScreen && buttonRef.current) {
        gsap.to(buttonRef.current, {
          ...initialStyles,
          duration: 0,
        })
      }
      if (isLargeScreen && buttonRef.current) {
        if (active) {
          gsap.to(buttonRef.current, {
            ...activeStyles,
            duration: 0,
          })
        } else {
          gsap.to(buttonRef.current, {
            ...initialStyles,
          })
        }
      }
    },
    {
      scope: shapeRef,
      dependencies: [active, index, isLargeScreen],
    },
  )

  const onMouseEnter = contextSafe(() => {
    if (buttonRef.current && isLargeScreen) {
      gsap.to(buttonRef.current, {
        ...activeStyles,
        ease: "power2.out",
      })
    }
  })

  const onMouseLeave = contextSafe(() => {
    if (buttonRef.current && isLargeScreen && !active) {
      gsap.to(buttonRef.current, {
        ...initialStyles,
        ease: "power2.out",
      })
    }
  })

  return (
    <Button
      ref={buttonRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      variant="bullet"
      active={active}
      {...rest}
    >
      {index + 1}
    </Button>
  )
}

export default PageSelectorButton
