import type { ComponentProps, FC } from "react"

const CircleShape: FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      width="530"
      height="530"
      viewBox="0 0 530 530"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        opacity="0.2"
        cx="265"
        cy="265"
        r="264.5"
        stroke="var(--color-primary)"
      />
    </svg>
  )
}

export default CircleShape
