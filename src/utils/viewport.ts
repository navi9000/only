import { useSyncExternalStore } from "react"

export function useIsLargeScreen(breakpoint = 768) {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback)
      return () => {
        window.removeEventListener("resize", callback)
      }
    },
    () => window.innerWidth >= breakpoint,
  )
}
