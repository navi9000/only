import { createContext } from "react"
import type { BlockData } from "../../../utils/types"

type BlockContextData = {
  blockData: BlockData
  selectedPage: number
  setSelectedPage: (index: number) => void
  isLoading: boolean
  ANIMATION_DURATION_SEC: number
}

export default createContext<BlockContextData | null>(null)
