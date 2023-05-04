export interface IDailyAwardItem {
  icon: string
  name: string
  cnt: number
}

export interface IDailyInfo {
  total_sign_day: number
  today: string
  is_sign: boolean
  first_bind: boolean
  is_sub: boolean
  region: string
  month_last_day: boolean
}

export interface IDailyReward {
  month: number
  resign: boolean
  now: string
  biz: string
  award: IDailyAwardItem
}

export interface IDailyRewards {
  month: number
  resign: boolean
  now: string
  biz: string
  awards: IDailyAwardItem[]
}

export interface IDailyClaim {
  status: string
  code: number
  reward: IDailyReward | null
  info: IDailyInfo
}
