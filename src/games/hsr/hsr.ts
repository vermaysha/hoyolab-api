import { Cookie, ICookie } from '../../cookie'
import { GamesEnum, Hoyolab } from '../hoyolab'
import { Request } from '../../request'
import { Language, LanguageEnum } from '../../language'
import { IHsrOptions } from './hsr.interface'
import { Routes } from '../../routes'
import { DailyModule } from '../../modules/daily'
import { RedeemModule } from '../../modules/redeem'
import { getHsrRegion } from './hsr.helper'

export class HonkaiStarRail {
  readonly daily: DailyModule
  readonly redeem: RedeemModule
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
      options.lang = Language.parseLang(cookie.mi18nLang)
    }

    this.request = new Request(Cookie.parseCookie(this.cookie))
    this.request.setReferer(Routes.referer())
    this.request.setLang(options.lang)

    /* c8 ignore start */
    this.uid = options.uid ?? null
    this.region = this.uid !== null ? getHsrRegion(this.uid) : null
    /* c8 ignore stop */
    this.lang = options.lang

    this.daily = new DailyModule(
      this.request,
      this.lang,
      GamesEnum.HONKAI_STAR_RAIL,
    )
    this.redeem = new RedeemModule(
      this.request,
      this.lang,
      GamesEnum.HONKAI_STAR_RAIL,
      this.region,
      this.uid,
    )
  }

  /**
   * Create StarRails Object
   *
   * @param options IHsrOptions Options
   * @returns {Promise<HonkaiStarRail>}
   */
  static async create(options: IHsrOptions): Promise<HonkaiStarRail> {
    if (typeof options.uid === 'undefined') {
      const hoyolab = new Hoyolab({
        cookie: options.cookie,
      })

      const game = await hoyolab.gameAccount(GamesEnum.HONKAI_STAR_RAIL)
      options.uid = parseInt(game.game_uid)
      options.region = getHsrRegion(parseInt(game.game_uid))
    }
    return new HonkaiStarRail(options)
  }

  dailyInfo() {
    return this.daily.info()
  }

  /**
   * Fetch all rewards from daily login
   *
   */
  dailyRewards() {
    return this.daily.rewards()
  }

  /**
   * Fetch reward from daily login based on day
   *
   * @param day number | null
   */
  dailyReward(day: number | null = null) {
    return this.daily.reward(day)
  }

  /**
   * Claim current reward
   *
   */
  dailyClaim() {
    return this.daily.claim()
  }

  /**
   * Redeem Code
   *
   * @param code string
   * @throws HoyolabError
   */
  redeemCode(code: string) {
    return this.redeem.claim(code)
  }
}
