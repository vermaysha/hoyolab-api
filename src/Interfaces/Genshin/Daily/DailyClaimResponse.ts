import { DailyInfoResponse } from './DailyInfoResponse'
import { DailyRewardResponse } from './DailyRewardResponse'

export interface DailyClaimResponse {
  status: string
  code: number
  reward: DailyRewardResponse | null
  info: DailyInfoResponse
}
