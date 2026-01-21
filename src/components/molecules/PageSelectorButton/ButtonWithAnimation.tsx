import Button from "@/components/atoms/Button/Button"
import { useRef, useState, type ComponentProps, type FC } from "react"
import { PageSelectorButtonProps } from "./utils"
import { useGSAP } from "@gsap/react"
import { getStartAndEnd } from "@/utils/animations"
import gsap from "gsap"
import { MotionPathPlugin } from "gsap/all"

gsap.registerPlugin(MotionPathPlugin)

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

function withAnimation(
  WrappedComponent: FC<ComponentProps<typeof Button>>,
): FC<PageSelectorButtonProps> {
  return ({
    activeIndex,
    index,
    shapeRef,
    numberOfElements,
    duration,
    ...rest
  }) => {
    const isActive = activeIndex === index
    const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const contextRef = useRef<HTMLDivElement>(null)

    const { contextSafe } = useGSAP(
      () => {
        if (buttonRef.current) {
          const { start, end, newValue } = getStartAndEnd(
            index,
            activeIndex,
            prevActiveIndex,
            numberOfElements,
          )

          if (shapeRef.current) {
            gsap.to(buttonRef.current, {
              duration,
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
        scope: contextRef,
        dependencies: [isActive, index, prevActiveIndex, activeIndex, duration],
      },
    )

    const onMouseEnter = contextSafe(() => {
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          ...activeStyles,
          ease: "power2.out",
        })
      }
    })

    const onMouseLeave = contextSafe(() => {
      if (buttonRef.current && !isActive) {
        gsap.to(buttonRef.current, {
          ...initialStyles,
          ease: "power2.out",
        })
      }
    })

    return (
      <div ref={contextRef}>
        <WrappedComponent
          ref={buttonRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          variant="bullet"
          {...rest}
        />
      </div>
    )
  }
}

export default withAnimation(Button)
