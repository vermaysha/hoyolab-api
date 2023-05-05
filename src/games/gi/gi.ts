import { Cookie, ICookie } from '../../cookie'
import { GamesEnum, Hoyolab } from '../hoyolab'
import { Request } from '../../request'
import { LanguageEnum, Language } from '../../language'
import { IGenshinOptions } from './gi.interface'
import { Routes } from '../../routes'
import { DailyModule } from '../../modules/daily'
import { RedeemModule } from '../../modules/redeem'
import { AbyssScheduleEnum, RecordModule } from '../../modules/records'
import { DiaryEnum, DiaryModule, DiaryMonthEnum } from '../../modules/diary'
import { getGenshinRegion } from './gi.helper'

/**
 * The `Genshin` class provides an interface to interact with Genshin Impact-related features on the Mihoyo website.
 * It contains references to various modules such as `DailyModule`, `RedeemModule`, `RecordModule`, and `DiaryModule` which allow you to perform various operations related to these features.
 *
 * @class
 * @category Main
 */
export class Genshin {
  /**
   * The `DailyModule` object provides an interface to interact with the daily check-in feature in Genshin Impact.
   */
  readonly daily: DailyModule

  /**
   * The `RedeemModule` object provides an interface to interact with the code redemption feature in Genshin Impact.
   */
  readonly redeem: RedeemModule

  /**
   * The `RecordModule` object provides an interface to interact with the user record feature in Genshin Impact.
   */
  readonly record: RecordModule

  /**
   * The `DiaryModule` object provides an interface to interact with the user diary feature in Genshin Impact.
   */
  readonly diary: DiaryModule

  /**
   * The cookie object to be used in requests.
   */
  readonly cookie: ICookie

  /**
   * The `Request` object used to make requests.
   */
  readonly request: Request

  /**
   * The UID of the user, if available.
   */
  public uid: number | null

  /**
   * The region of the user, if available.
   */
  public region: string | null

  /**
   * The language to be used in requests.
   */
  public lang: LanguageEnum

  /**
   * Constructs a new `Genshin` object.
   * @param options The options object used to configure the object.
   * @param options.cookie The cookie string or object to be used in requests.
   * @param options.uid The UID of the user.
   * @param options.region The region of the user.
   * @param options.lang The language to be used in requests.
   */
  constructor(options: IGenshinOptions) {
    const cookie: ICookie =
      typeof options.cookie === 'string'
        ? Cookie.parseCookieString(options.cookie)
        : options.cookie

    this.cookie = cookie

    if (!options.lang) {
      options.lang = Language.parseLang(cookie.mi18nLang)
    }

    this.request = new Request(Cookie.parseCookie(this.cookie))
    this.request.setReferer(Routes.referer())
    this.request.setLang(options.lang)

    this.uid = options.uid ?? null
    this.region = this.uid !== null ? getGenshinRegion(this.uid) : null
    this.lang = options.lang

    this.daily = new DailyModule(
      this.request,
      this.lang,
      GamesEnum.GENSHIN_IMPACT,
    )
    this.redeem = new RedeemModule(
      this.request,
      this.lang,
      GamesEnum.GENSHIN_IMPACT,
      this.region,
      this.uid,
    )
    this.record = new RecordModule(
      this.request,
      this.lang,
      this.region,
      this.uid,
    )
    this.diary = new DiaryModule(this.request, this.lang, this.region, this.uid)
  }

  /**
   * Create a new instance of the Genshin class asynchronously.
   *
   * @param options The options object used to configure the object.
   * @param options.cookie The cookie string or object to be used in requests.
   * @param options.uid The UID of the user.
   * @param options.region The region of the user.
   * @param options.lang The language to be used in requests.
   * @returns A promise that resolves with a new Genshin instance.
   */
  static async create(options: IGenshinOptions): Promise<Genshin> {
    if (typeof options.uid === 'undefined') {
      const hoyolab = new Hoyolab({
        cookie: options.cookie,
      })

      const game = await hoyolab.gameAccount(GamesEnum.GENSHIN_IMPACT)
      options.uid = parseInt(game.game_uid)
      options.region = getGenshinRegion(parseInt(game.game_uid))
    }
    return new Genshin(options)
  }

  /**
   * Fetch game records
   *
   */
  async records() {
    return this.record.records()
  }

  /**
   * Fetch obtained genshin characters with artifact, weapon, level and constellation
   *
   */
  async characters() {
    return this.record.characters()
  }

  /**
   * Fetch characters summary detail (name, rarity, weapon, icon)
   *
   * @param characterIds number[] Characters ID
   */
  async charactersSummary(characterIds: number[]) {
    return this.record.charactersSummary(characterIds)
  }

  /**
   * Fetch Spiral Abyss data
   *
   * @param scheduleType AbyssScheduleEnum
   */
  async spiralAbyss(
    scheduleType: AbyssScheduleEnum = AbyssScheduleEnum.CURRENT,
  ) {
    return this.record.spiralAbyss(scheduleType)
  }

  /**
   * Fetch daily note resources (resin, home coin, expeditions, and transformer)
   *
   */
  async dailyNote() {
    return this.record.dailyNote()
  }

  /**
   * Fetch genshin impact diary data
   *
   * @param month
   * @returns {Promise<IGenshinDiaryInfo>}
   */
  async diaries(month: DiaryMonthEnum = DiaryMonthEnum.CURRENT) {
    return this.diary.diaries(month)
  }

  /**
   * Fetch history of received resources (primogems and mora) from diary
   *
   * @param type DiaryEnum
   * @param month DiaryMonthEnum
   */
  async diaryDetail(
    type: DiaryEnum,
    month: DiaryMonthEnum = DiaryMonthEnum.CURRENT,
  ) {
    return this.diary.diaryDetail(type, month)
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
