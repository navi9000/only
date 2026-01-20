import useBlockContext from "@/components/templates/Block/useBlockContext"

export default function useCardList() {
  const { blockData, selectedPage, isLoading } = useBlockContext()
  return {
    list: blockData.data[selectedPage].list,
    isLoading,
  }
}
