import Button from "@/components/atoms/Button/Button"
import { Resolve } from "@/utils/types"
import { useIsLargeScreen } from "@/utils/viewport"
import { lazy, type FC } from "react"
import { PageSelectorButtonProps } from "./utils"

const ButtonWithAnimation = lazy(() => import("./ButtonWithAnimation"))

const PageSelectorButton: FC<Resolve<PageSelectorButtonProps>> = ({
  activeIndex,
  index,
  shapeRef,
  numberOfElements,
  duration,
  ...rest
}) => {
  const isLargeScreen = useIsLargeScreen()

  if (!isLargeScreen) {
    return <Button variant="bullet" active={activeIndex === index} {...rest} />
  }

  return (
    <ButtonWithAnimation
      shapeRef={shapeRef}
      duration={duration}
      activeIndex={activeIndex}
      index={index}
      numberOfElements={numberOfElements}
      {...rest}
    >
      {index + 1}
    </ButtonWithAnimation>
  )
}

export default PageSelectorButton
