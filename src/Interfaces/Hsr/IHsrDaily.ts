export interface IHsrDailyAwardItem {
  icon: string
  name: string
  cnt: number
}

export interface IHsrDailyInfo {
  total_sign_day: number
  today: string
  is_sign: boolean
  is_sub: boolean
  region: string
}

export interface IHsrDailyReward {
  month: number
  resign: boolean
  biz: string
  award: IHsrDailyAwardItem
}

export interface IHsrDailyRewards {
  month: number
  resign: boolean
  biz: string
  awards: IHsrDailyAwardItem[]
}

export interface IHsrDailyClaim {
  status: string
  code: number
  reward: IHsrDailyReward | null
  info: IHsrDailyInfo
}
