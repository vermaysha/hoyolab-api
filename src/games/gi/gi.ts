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

export class Genshin {
  readonly daily: DailyModule
  readonly redeem: RedeemModule
  readonly record: RecordModule
  readonly diary: DiaryModule

  readonly cookie: ICookie
  readonly request: Request
  public uid: number | null
  public region: string | null
  public lang: LanguageEnum

  constructor(options: IGenshinOptions) {
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
    this.region = this.uid !== null ? getGenshinRegion(this.uid) : null
    /* c8 ignore stop */
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
   * Create Genshin Impact Object but with UID and Region assigned
   *
   * @param options IGenshinOptions Options
   * @returns {Promise<Genshin>}
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
