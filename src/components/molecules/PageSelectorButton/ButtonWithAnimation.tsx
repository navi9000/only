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
  scale: 1 / 8,
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
    const isFirstRender = prevActiveIndex == activeIndex

    const { contextSafe } = useGSAP(
      () => {
        if (buttonRef.current && shapeRef.current) {
          const path = MotionPathPlugin.convertToPath(
            shapeRef.current.firstChild,
          )[0]
          const { start, end, newValue } = getStartAndEnd(
            index,
            activeIndex,
            prevActiveIndex,
            numberOfElements,
          )

          gsap.to(buttonRef.current, {
            duration,
            motionPath: {
              path,
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
      },
      {
        scope: contextRef,
        dependencies: [isActive, index, prevActiveIndex, activeIndex, duration],
      },
    )

    useGSAP(() => {
      if (buttonRef.current) {
        if (isActive) {
          gsap.to(buttonRef.current, {
            ...activeStyles,
            duration: 0,
          })
        } else {
          gsap.to(buttonRef.current, {
            ...initialStyles,
            duration: isFirstRender ? 0 : duration / 2,
          })
        }
      }
    }, [isActive, isFirstRender])

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
