import { GamesEnum } from '../../games/hoyolab'
import { LanguageEnum } from '../../language'
import type { Request } from '../../request'
import { HoyolabError } from '../../utils'
import {
  IDailyClaim,
  IDailyInfo,
  IDailyReward,
  IDailyRewards,
} from './daily.interface'
import { DailyRoute } from './daily.route'

/**
 * DailyModule class provides methods to interact with Genshin Impact's daily module endpoints.
 *
 * @class
 * @internal
 * @category Module
 */
export class DailyModule {
  private dailyInfoUrl: string
  private dailyRewardUrl: string
  private dailySignUrl: string

  constructor(
    private request: Request,
    private lang: LanguageEnum,
    private game: GamesEnum,
  ) {
    if (this.game === GamesEnum.GENSHIN_IMPACT) {
      this.dailyInfoUrl = DailyRoute.giDailyInfo()
      this.dailyRewardUrl = DailyRoute.giDailyReward()
      this.dailySignUrl = DailyRoute.giDailyClaim()
    } else if (this.game === GamesEnum.HONKAI_STAR_RAIL) {
      this.dailyInfoUrl = DailyRoute.hsrDailyInfo()
      this.dailyRewardUrl = DailyRoute.hsrDailyReward()
      this.dailySignUrl = DailyRoute.hsrDailyClaim()
    } else {
      throw new HoyolabError('Game Paramter is invalid')
    }
  }

  /**
   * Retrieves daily information.
   *
   * @returns {Promise<IDailyInfo>} A promise that resolves to an IDailyInfo object.
   */
  async info(): Promise<IDailyInfo> {
    this.request
      .setParams({
        lang: this.lang,
      })
      .setLang(this.lang)

    const res: any = (await this.request.send(this.dailyInfoUrl)).data

    if (typeof res.first_bind === 'undefined') {
      res.first_bind = false
    }

    if (typeof res.month_last_day === 'undefined') {
      const today = new Date()
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
      ).getDate()

      res.month_last_day = today.getDate() === lastDayOfMonth
    }
    return res as IDailyInfo
  }

  /**
   * Retrieve daily rewards information.
   *
   * @returns {Promise<IDailyRewards>} A promise that resolves to an IDailyRewards object.
   */
  async rewards(): Promise<IDailyRewards> {
    this.request
      .setParams({
        lang: this.lang,
      })
      .setLang(this.lang)

    const res: any = (await this.request.send(this.dailyRewardUrl)).data

    if (typeof res.now === 'undefined') {
      res.now = Math.round(new Date().getTime() / 1000).toString()
    }

    if (this.game === GamesEnum.GENSHIN_IMPACT) {
      res.biz = 'hk4e'
    } else if (this.game === GamesEnum.HONKAI_IMPACT) {
      res.biz = 'hk4e'
    } else if (this.game === GamesEnum.HONKAI_STAR_RAIL) {
      res.biz = 'hkrpg'
    } else {
      res.biz = ''
    }

    return res as IDailyRewards
  }

  /**
   * Get the daily reward for a specific day or the current day
   *
   * @param {number | null} day - The day to retrieve the reward for. If null, retrieve the reward for the current day.
   * @returns {Promise<IDailyReward>} - A promise that resolves with the daily reward for the specified day or the current day
   * @throws {HoyolabError} - If the specified day is not a valid date in the current month or if the reward for the specified day is undefined.
   */
  async reward(day: number | null = null): Promise<IDailyReward> {
    const response = await this.rewards()

    if (day === null) {
      const now = response?.now
        ? new Date(parseInt(response.now) * 1000)
        : new Date()
      day = now.getDate()
    }

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    if (
      !(day > 0 && day <= daysInMonth) ||
      typeof response.awards[day - 1] === undefined
    ) {
      throw new HoyolabError(`${day} is not a valid date in this month.`)
    }

    return {
      month: response.month,
      now: response.now,
      biz: response.biz,
      resign: response.resign,
      award: response.awards[day - 1],
    }
  }

  /**
   * Claim the daily rewards.
   *
   * @returns {Promise<IDailyClaim>} The claim information.
   */
  async claim(): Promise<IDailyClaim> {
    this.request
      .setParams({
        lang: this.lang,
      })
      .setLang(this.lang)

    const response = await this.request.send(this.dailySignUrl, 'POST')

    const info = await this.info()
    const reward = await this.reward()

    /* c8 ignore start */
    if (response.retcode === -5003) {
      return {
        status: response.message,
        code: -5003,
        reward,
        info,
      }
    }

    if (
      String((response.data as IDailyClaim).code).toLocaleLowerCase() ===
        'ok' &&
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
