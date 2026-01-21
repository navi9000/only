type Direction = "backward" | "forward" | "noop"

interface GetDirectionParams {
  prevIndex: number
  newIndex: number
  length: number
}

type GetDirection = (params: GetDirectionParams) => {
  direction: Direction
  steps: number
}

export const getDirection: GetDirection = ({ prevIndex, newIndex, length }) => {
  if (prevIndex === newIndex) {
    return {
      direction: "noop",
      steps: 0,
    }
  }
  let forwardDiff, backwardDiff
  if (newIndex > prevIndex) {
    forwardDiff = newIndex - prevIndex
    backwardDiff = length + prevIndex - newIndex
  }

  if (prevIndex > newIndex) {
    forwardDiff = length + newIndex - prevIndex
    backwardDiff = prevIndex - newIndex
  }

  if (forwardDiff >= backwardDiff) {
    return {
      direction: "forward",
      steps: forwardDiff,
    }
  }

  return {
    direction: "backward",
    steps: backwardDiff,
  }
}

export function buttonWithAnimationCoords({
  index,
  activeIndex,
  prevActiveIndex,
  numberOfElements,
}: {
  index: number
  activeIndex: number
  prevActiveIndex: number
  numberOfElements: number
}) {
  const BUTTON_SIZE = 55
  const CIRCLE_OFFSET = -0.125

  const { steps, direction } = getDirection({
    prevIndex: prevActiveIndex,
    newIndex: activeIndex,
    length: numberOfElements,
  })
  const start = (index - prevActiveIndex) / numberOfElements + CIRCLE_OFFSET
  let end
  if (direction === "forward") {
    end = start - steps / numberOfElements + 1
  }
  if (direction === "backward") {
    end = start + steps / numberOfElements - 1
  }

  if (direction === "noop") {
    end = start
  }

  const offsetX = -(BUTTON_SIZE / 2) - BUTTON_SIZE * index - 0.5
  const offsetY = -(BUTTON_SIZE / 2) - 0.5

  return {
    start,
    end,
    offsetX,
    offsetY,
  }
}
