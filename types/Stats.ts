type Stats = {
  mints: number
  topContract: {
    name: string
    id: string
    mints: number
  }
}

type Year = number

type Day = number

type Month = number

export type DayStats = {
  day: Day
  month: Month
  year: Year
  stats: Stats
}

export type MonthStats = {
  month: Month
  year: Year
  stats: Stats
}
