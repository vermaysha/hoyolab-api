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
  public async getDailyInfo(): Promise<Interface.DailyInfoResponse> {
    const response = await this.request.send(GenshinRoutes.dailyInfo)

    return response.data
  }

  public async getDailyRewards(): Promise<Interface.DailyRewardsResponse> {
    const response = await this.request.send(GenshinRoutes.dailyRewards)

    return response.data
  }

  public async getDailyReward(
    day: NumericRange<0, 30> | null = null
  ): Promise<Interface.DailyRewardResponse> {
    const response = await this.getDailyRewards()

    let currentDate = 0
    if (day === null) {
      const now = new Date(Number(response.now) * 1000)
      currentDate = (now.getDate() - 1) as NumericRange<0, 30>
    }

    if (typeof response.awards[day ?? currentDate] !== undefined) {
      return {
        month: response.month,
        now: response.now,
        resign: response.resign,
        award: response.awards[day ?? currentDate],
      }
    }

    throw new HoyoError('The selected day was not found !')
  }

  public async claimDaily(): Promise<Interface.DailyClaimResponse> {
    const response = await this.request.send(GenshinRoutes.dailyClaim, 'post')

    const info = await this.getDailyInfo()
    const reward = await this.getDailyReward()

    if (response.retcode === -5003) {
      return {
        status: "Traveller, you've already checked in today",
        code: -5003,
        reward,
        info,
      }
    }

    if (
      String(
        (response.data as Interface.DailyClaimResponse).code
      ).toLocaleLowerCase() === 'ok' &&
      response.retcode === 0
    ) {
      return {
        status: response.message,
        code: 0,
        reward,
        info,
      }
    }

    return {
      status: response.message,
      code: response.retcode,
      reward: null,
      info,
    }
  }
}
