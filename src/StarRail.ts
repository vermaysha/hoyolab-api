import { Cookie } from './Cookie'
import { Hoyolab } from './Hoyolab'
import { HoyolabError } from './HoyolabError'
import { GamesEnum, ICookie, LanguageEnum, IRedeemCode } from './Interfaces'

import { Request } from './Request'
import { getServerRegion, parseLang } from './helpers'
import * as Route from './routes'
import {
  IHsrDailyClaim,
  IHsrDailyInfo,
  IHsrDailyReward,
  IHsrDailyRewards,
  IHsrOptions,
} from './Interfaces/Hsr'

export class StarRail {
  readonly cookie: ICookie
  readonly request: Request
  public uid: number | null
  public region: string | null
  public lang: LanguageEnum

  constructor(options: IHsrOptions) {
    /* c8 ignore start */
    const cookie: ICookie =
      typeof options.cookie === 'string'
        ? Cookie.parseCookieString(options.cookie)
        : options.cookie
    /* c8 ignore stop */

    this.cookie = cookie

    if (!options.lang) {
      options.lang = parseLang(cookie.mi18nLang)
    }

    this.request = new Request(Cookie.parseCookie(this.cookie))
    this.request.setReferer(Route.GENSHIN_GAME_RECORD_REFERER)
    this.request.setLang(options.lang)

    /* c8 ignore start */
    this.uid = options.uid ?? null
    this.region = this.uid !== null ? getServerRegion(this.uid) : null
    /* c8 ignore stop */
    this.lang = options.lang
  }

  /**
   * Create StarRails Object
   *
   * @param options IHsrOptions Options
   * @returns {Promise<StarRail>}
   */
  static async create(options: IHsrOptions): Promise<StarRail> {
    const instance = new StarRail(options)

    if (instance.uid === null) {
      const hoyolab = new Hoyolab({
        cookie: options.cookie,
      })

      const game = await hoyolab.gameAccount(GamesEnum.HONKAI_STAR_RAIL)
      const uid = parseInt(game.game_uid)

      instance.uid = uid
      instance.region = getServerRegion(uid)
    }

    return instance
  }

  async dailyInfo(): Promise<IHsrDailyInfo> {
    this.request
      .setParams({
        act_id: 'e202303301540311',
        lang: this.lang,
      })
      .setLang(this.lang)

    const res = (await this.request.send(Route.HSR_DAILY_INFO)).data

    return res as IHsrDailyInfo
  }

  /**
   * Fetch all rewards from daily login
   *
   * @returns {Promise<IHsrDailyRewards>}
   */
  async dailyRewards(): Promise<IHsrDailyRewards> {
    this.request
      .setParams({
        act_id: 'e202303301540311',
        lang: this.lang,
      })
      .setLang(this.lang)

    const res = (await this.request.send(Route.HSR_DAILY_REWARD)).data

    return res as IHsrDailyRewards
  }

  /**
   * Fetch reward from daily login based on day
   *
   * @param day number | null
   * @returns {Promise<IHsrDailyReward>}
   */
  async dailyReward(day: number | null = null): Promise<IHsrDailyReward> {
    const response = await this.dailyRewards()

    if (day === null) {
      const now = new Date()
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
      biz: response.biz,
      resign: response.resign,
      award: response.awards[day - 1],
    }
  }

  /**
   * Claim current reward
   *
   * @returns {Promise<IHsrDailyClaim>}
   */
  async dailyClaim(): Promise<IHsrDailyClaim> {
    this.request
      .setParams({
        act_id: 'e202303301540311',
        lang: this.lang,
      })
      .setLang(this.lang)

    const response = await this.request.send(Route.HSR_DAILY_CLAIM, 'POST')

    const info = await this.dailyInfo()
    const reward = await this.dailyReward()

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
      String((response.data as IHsrDailyClaim).code).toLocaleLowerCase() ===
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

  /**
   * Redeem Code
   *
   * @param code string
   * @returns {Promise<IRedeemCode>}
   */
  async redeemCode(code: string): Promise<IRedeemCode> {
    if (!this.region || !this.uid) {
      throw new HoyolabError('UID parameter is missing or failed to be filled')
    }

    this.request.setParams({
      uid: this.uid,
      region: this.region,
      game_biz: GamesEnum.HONKAI_STAR_RAIL,
      cdkey: code.replace(/\uFFFD/g, ''),
      lang: this.lang,
      sLangKey: this.lang,
    })

    const res = await this.request.send(Route.GENSHIN_REDEEM_CODE)

    return res as IRedeemCode
  }
}
