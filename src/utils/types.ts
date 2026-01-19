export type YearHighlights = {
  year: number
  text: string
}

export type ScreenData = {
  startYear: number
  endYear: number
  list: YearHighlights[]
}

export type BlockData = {
  data: ScreenData[]
}

export type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] }
