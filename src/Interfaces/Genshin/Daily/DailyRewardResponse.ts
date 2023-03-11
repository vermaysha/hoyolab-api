import { AwardItem } from './AwardItem'

export interface DailyRewardResponse {
  month: number
  resign: boolean
  now: string
  award: AwardItem
}
