import Button from "@/components/atoms/Button/Button"
import { Resolve } from "@/utils/types"
import { useIsLargeScreen } from "@/utils/viewport"
import { useRef, type ComponentProps, type FC, useState } from "react"
import gsap from "gsap"
import { ReactRef, useGSAP } from "@gsap/react"
import { MotionPathPlugin } from "gsap/all"
import { getStartAndEnd } from "@/utils/animations"

type Props = {
  index: number
  numberOfElements: number
  activeIndex: number
  shapeRef?: ReactRef
} & ComponentProps<"button">

const initialStyles: GSAPTweenVars = {
  backgroundColor: "var(--color-primary)",
  borderColor: "transparent",
  scale: 1 / 7,
}

const activeStyles: GSAPTweenVars = {
  backgroundColor: "white",
  borderColor: "var(--color-primary)",
  scale: 1,
}

gsap.registerPlugin(MotionPathPlugin)

const PageSelectorButton: FC<Resolve<Props>> = ({
  activeIndex,
  index,
  shapeRef,
  numberOfElements,
  ...rest
}) => {
  const isActive = activeIndex === index
  const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex)
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
        const { start, end, newValue } = getStartAndEnd(
          index,
          activeIndex,
          prevActiveIndex,
          numberOfElements,
        )

        if (shapeRef.current) {
          gsap.to(buttonRef.current, {
            duration: 1,
            motionPath: {
              path: MotionPathPlugin.convertToPath(
                shapeRef.current.firstChild,
              )[0],
              offsetX: -55 / 2 + -55 * index - 0.5,
              offsetY: -55 / 2 - 0.5,
              start,
              end,
            },
            onComplete: () => {
              setPrevActiveIndex(newValue)
            },
          })
        }

        if (isActive) {
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
      dependencies: [
        isActive,
        index,
        isLargeScreen,
        prevActiveIndex,
        activeIndex,
      ],
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
    if (buttonRef.current && isLargeScreen && !isActive) {
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
      active={isActive}
      {...rest}
    >
      {index + 1}
    </Button>
  )
}

export default PageSelectorButton
