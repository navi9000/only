import { useEffect, useState, type FC, type PropsWithChildren } from "react"
import type { BlockData } from "@/utils/types"
import BlockContext from "./BlockContext"

const BlockContextProvider: FC<PropsWithChildren<{ data: BlockData }>> = ({
  data,
  children,
}) => {
  const [selectedPage, setSelectedPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const ANIMATION_DURATION_SEC = 1

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const setPage = (index: number) => {
    setIsLoading(true)
    setSelectedPage(index)
    const timeout = setTimeout(() => {
      setIsLoading(false)
      clearTimeout(timeout)
    }, ANIMATION_DURATION_SEC * 1000)
  }

  const value = {
    blockData: data,
    selectedPage,
    setSelectedPage: setPage,
    isLoading,
    ANIMATION_DURATION_SEC,
  }

  return <BlockContext.Provider value={value}>{children}</BlockContext.Provider>
}

export default BlockContextProvider
