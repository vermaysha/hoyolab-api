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
   * Fetch Daily login information
   *
   * @returns {Promise<IDailyInfo>}
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
   * Fetch all rewards from daily login
   *
   * @returns {Promise<IDailyRewards>}
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

    if (typeof res.biz === 'undefined') {
      res.biz = this.game === GamesEnum.HONKAI_STAR_RAIL ? 'hkrpg' : ''
    }

    return res as IDailyRewards
  }

  /**
   * Fetch reward from daily login based on day
   *
   * @param day number | null
   * @returns {Promise<IDailyReward>}
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
   * Claim current reward
   *
   * @returns {Promise<IDailyClaim>}
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
  /* c8 ignore stop */
}
