export interface IGenshinDailyAwardItem {
  icon: string
  name: string
  cnt: number
}

export interface IGenshinDailyInfo {
  total_sign_day: number
  today: string
  is_sign: boolean
  first_bind: boolean
  is_sub: boolean
  region: string
  month_last_day: boolean
}

export interface IGenshinDailyReward {
  month: number
  resign: boolean
  now: string
  award: IGenshinDailyAwardItem
}

export interface IGenshinDailyRewards {
  month: number
  resign: boolean
  now: string
  awards: IGenshinDailyAwardItem[]
}

export interface IGenshinDailyClaim {
  status: string
  code: number
  reward: IGenshinDailyReward | null
  info: IGenshinDailyInfo
}
