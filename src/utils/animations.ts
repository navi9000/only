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

export function getStartAndEnd(
  index: number,
  currIndex: number,
  prevIndex: number,
  numOfElements: number,
) {
  const { steps, direction } = getDirection({
    prevIndex,
    newIndex: currIndex,
    length: numOfElements,
  })

  const start = (index - prevIndex) / numOfElements - 0.125
  let end
  if (direction === "forward") {
    end = start - steps / numOfElements + 1
  }
  if (direction === "backward") {
    end = start + steps / numOfElements - 1
  }

  if (direction === "noop") {
    end = start
  }

  return {
    start,
    end,
    newValue: currIndex,
  }
}
