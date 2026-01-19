import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Test from "./Test"

throw new Error("Test workflow")

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Test />
  </StrictMode>,
)
