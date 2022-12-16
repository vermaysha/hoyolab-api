export interface DailyRewardsResponse {
  month: number
  resign: boolean
  now: string
  awards: DailyRewardResponse[]
}

export interface DailyRewardResponse {
  icon: string
  name: string
  cnt: number
}

export interface DailyClaimResponse {
  status: string
  code: number
  reward: DailyRewardResponse | null
  info: DailyInfoResponse
}

export interface DailyInfoResponse {
  total_sign_day: number
  today: string
  is_sign: boolean
  first_bind: boolean
  is_sub: boolean
  region: string
}
