export function exhaustiveCheck(input: never) {
  console.error(`Unexpected value: ${input}`)
  return input
}
