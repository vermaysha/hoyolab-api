import { HoyoError } from './HoyoError'
import { Base } from './Base'
import * as Interface from './Interfaces/Genshin'
import { NumericRange } from './Types'
import { GenshinRoutes } from './Utils'

/**
 * Get data from Hoyolab API
 *
 * @category Main
 */
export class Genshin extends Base {
  public async getDaily(): Promise<Interface.DailyInfoResponse> {
    const response = await this.request.send(GenshinRoutes.dailyInfo)

    return response.data
  }

  public async getDailyRewards(): Promise<Interface.DailyRewardsResponse> {
    const response = await this.request.send(GenshinRoutes.dailyRewards)

    return response.data
  }

  public async getDailyReward(
    day: NumericRange<0, 31> | null = null
  ): Promise<Interface.DailyRewardResponse> {
    const response = await this.getDailyRewards()

    let selectedDay: number
    if (day === null) {
      const now = new Date(Number(response.now) * 1000)
      selectedDay = now.getDate() - 1
    } else {
      selectedDay = day
    }

    if (typeof response.awards[selectedDay] !== undefined) {
      return {
        month: response.month,
        now: response.now,
        resign: response.resign,
        award: response.awards[selectedDay],
      }
    }

    throw new HoyoError('The selected day was not found !')
  }
}
