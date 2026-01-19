import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Test from "./components/Test"
import "./globals.scss"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Test />
  </StrictMode>,
)
