import useBlockContext from "../../templates/Block/useBlockContext"

export default function useDateScreen() {
  const { blockData, selectedPage, ANIMATION_DURATION_SEC } = useBlockContext()

  return {
    yearStart: blockData.data[selectedPage].startYear,
    yearEnd: blockData.data[selectedPage].endYear,
    duration: ANIMATION_DURATION_SEC,
  }
}
