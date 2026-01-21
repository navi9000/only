import { exhaustiveCheck } from "./type-checkers"

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

const getDirection: GetDirection = ({ prevIndex, newIndex, length }) => {
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

function finalPosition({
  start,
  prevActiveIndex,
  activeIndex,
  numberOfElements,
}: {
  start: number
  prevActiveIndex: number
  activeIndex: number
  numberOfElements: number
}) {
  const { steps, direction } = getDirection({
    prevIndex: prevActiveIndex,
    newIndex: activeIndex,
    length: numberOfElements,
  })

  if (direction === "forward") {
    return start - steps / numberOfElements + 1
  }
  if (direction === "backward") {
    return start + steps / numberOfElements - 1
  }

  if (direction === "noop") {
    return start
  }

  return exhaustiveCheck(direction)
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

  const start = (index - prevActiveIndex) / numberOfElements + CIRCLE_OFFSET
  const end = finalPosition({
    start,
    prevActiveIndex,
    activeIndex,
    numberOfElements,
  })

  const offsetX = -(BUTTON_SIZE / 2) - BUTTON_SIZE * index - 0.5
  const offsetY = -(BUTTON_SIZE / 2) - 0.5

  return {
    start,
    end,
    offsetX,
    offsetY,
  }
}
