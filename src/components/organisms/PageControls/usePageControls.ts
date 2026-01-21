import useBlockContext from "@/components/templates/Block/useBlockContext"

export default function usePageControls() {
  const {
    blockData,
    selectedPage,
    setSelectedPage,
    isLoading,
    ANIMATION_DURATION_SEC,
  } = useBlockContext()
  const length = blockData.data.length
  return {
    length,
    activeIndex: selectedPage,
    setActive: setSelectedPage,
    isFirst: selectedPage === 0,
    isLast: selectedPage === length - 1,
    setPrev: () => setSelectedPage(selectedPage - 1),
    setNext: () => setSelectedPage(selectedPage + 1),
    humanStyleIndex: selectedPage + 1,
    isLoading,
    duration: ANIMATION_DURATION_SEC,
  }
}
