export interface AwardItem {
  icon: string
  name: string
  cnt: number
}

export interface DailyRewardsResponse {
  month: number
  resign: boolean
  now: string
  awards: AwardItem[]
}

export interface DailyRewardResponse {
  month: number
  resign: boolean
  now: string
  award: AwardItem
}
