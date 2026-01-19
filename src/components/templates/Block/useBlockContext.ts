import BlockContext from "./BlockContext"
import { use } from "react"

export default function useBlockContext() {
  const context = use(BlockContext)
  if (!context) {
    throw "Используется вне BlockContextProvider"
  }
  return context
}
