import { useRef, useState, type FC } from "react"
import Typography from "../../atoms/Typography/Typography"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Resolve } from "../../../utils/types"

type Props = {
  color: "blue" | "pink"
  value: number
  duration?: number
  className?: string
}

const AnimatedNumber: FC<Resolve<Props>> = ({
  color,
  value,
  className,
  duration = 1,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [deferredValue, setDeferredValue] = useState(value)

  useGSAP(
    () => {
      if (ref.current?.firstChild) {
        gsap.from(ref.current.firstChild, {
          textContent: deferredValue,
          duration,
          snap: {
            textContent: 1,
          },
          ease: "power1.out",
          onComplete: () => setDeferredValue(value),
        })
      }
    },
    { scope: ref, dependencies: [value, deferredValue] },
  )
  return (
    <div className={className} ref={ref}>
      <Typography size="huge" color={color} bold>
        {value}
      </Typography>
    </div>
  )
}

export default AnimatedNumber
