import { AwardItem } from './AwardItem'

export interface DailyRewardsResponse {
  month: number
  resign: boolean
  now: string
  awards: AwardItem[]
}