import { Cookie } from './Cookie'
import { Hoyolab } from './Hoyolab'
import { HoyolabError } from './HoyolabError'
import { GamesEnum, ICookie, LanguageEnum, IRedeemCode } from './Interfaces'
import {
  DiaryEnum,
  DiaryMonthEnum,
  IGenshinCharacterSummary,
  IGenshinCharacters,
  IGenshinDailyInfo,
  IGenshinDailyNote,
  IGenshinDailyReward,
  IGenshinDailyRewards,
  IGenshinDiaryDetail,
  IGenshinDailyClaim,
  IGenshinDiaryInfo,
  IGenshinOptions,
  IGenshinRecord,
  IGenshinSpiralAbyss,
  AbyssScheduleEnum,
} from './Interfaces/Genshin'
import { Request } from './Request'
import { genshinRegion, parseLang } from './helpers'
import * as Route from './routes'

export class Genshin {
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
      options.lang = parseLang(cookie.mi18nLang)
    }

    this.request = new Request(Cookie.parseCookie(this.cookie))
    this.request.setReferer(Route.GENSHIN_GAME_RECORD_REFERER)
    this.request.setLang(options.lang)

    /* c8 ignore start */
    this.uid = options.uid ?? null
    this.region = this.uid !== null ? genshinRegion(this.uid) : null
    /* c8 ignore stop */
    this.lang = options.lang
  }

  /**
   * Create Genshin Object
   *
   * @param options IGenshinOptions Options
   * @returns {Promise<Genshin>}
   */
  static async create(options: IGenshinOptions): Promise<Genshin> {
    const instance = new Genshin(options)

    if (instance.uid === null) {
      const hoyolab = new Hoyolab({
        cookie: options.cookie,
      })

      const game = await hoyolab.gameAccount(GamesEnum.GENSHIN_IMPACT)
      const uid = parseInt(game.game_uid)

      instance.uid = uid
      instance.region = genshinRegion(uid)
    }

    return instance
  }

  /**
   * Fetch game records
   *
   * @returns {Promise<IGenshinRecord>}
   */
  async records(): Promise<IGenshinRecord> {
    if (!this.region || !this.uid) {
      throw new HoyolabError('UID parameter is missing or failed to be filled')
    }

    this.request
      .setParams({
        server: this.region,
        role_id: this.uid,
      })
      .setDs(true)

    const res = (await this.request.send(Route.GENSHIN_GAME_RECORD)).data

    return res as IGenshinRecord
  }

  /**
   * Fetch obtained genshin characters with artifact, weapon, level and constellation
   *
   * @returns {Promise<IGenshinCharacters>}
   */
  async characters(): Promise<IGenshinCharacters> {
    if (!this.region || !this.uid) {
      throw new HoyolabError('UID parameter is missing or failed to be filled')
    }

    this.request
      .setBody({
        server: this.region,
        role_id: this.uid,
      })
      .setDs(true)

    const res = (await this.request.send(Route.GENSHIN_CHARACTERS_LIST, 'POST'))
      .data

    return res as IGenshinCharacters
  }

  /**
   * Fetch characters summary detail (name, rarity, weapon, icon)
   *
   * @param characterIds number[] Characters ID
   * @returns {Promise<IGenshinCharacterSummary>}
   */
  async charactersSummary(
    characterIds: number[],
  ): Promise<IGenshinCharacterSummary> {
    if (!this.region || !this.uid) {
      throw new HoyolabError('UID parameter is missing or failed to be filled')
    }

    this.request
      .setBody({
        character_ids: characterIds,
        role_id: this.uid,
        server: this.region,
      })
      .setDs()

    const res = (
      await this.request.send(Route.GENSHIN_CHARACTERS_SUMMARY, 'POST')
    ).data

    return res as IGenshinCharacterSummary
  }

  /**
   * Fetch Spiral Abyss data
   *
   * @param scheduleType AbyssScheduleEnum
   * @returns {Promise<IGenshinSpiralAbyss>}
   */
  async spiralAbyss(
    scheduleType: AbyssScheduleEnum = AbyssScheduleEnum.CURRENT,
  ): Promise<IGenshinSpiralAbyss> {
    if (!this.region || !this.uid) {
      throw new HoyolabError('UID parameter is missing or failed to be filled')
    }

    if (Object.values(AbyssScheduleEnum).includes(scheduleType) === false) {
      throw new HoyolabError('The given scheduleType parameter is invalid !')
    }

    this.request
      .setParams({
        server: this.region,
        role_id: this.uid,
        schedule_type: scheduleType,
      })
      .setDs()

    const res = (await this.request.send(Route.GENSHIN_SPIRAL_ABYSS)).data

    return res as IGenshinSpiralAbyss
  }

  /**
   * Fetch daily note resources (resin, home coin, expeditions, and transformer)
   *
   * @returns {Promise<IGenshinDailyNote>}
   */
  async dailyNote(): Promise<IGenshinDailyNote> {
    if (!this.region || !this.uid) {
      throw new HoyolabError('UID parameter is missing or failed to be filled')
    }

    this.request
      .setParams({
        server: this.region,
        role_id: this.uid,
      })
      .setDs()

    const res = (await this.request.send(Route.GENSHIN_DAILY_NOTE)).data

    return res as IGenshinDailyNote
  }

  /**
   * Fetch genshin impact diary data
   *
   * @param month
   * @returns {Promise<IGenshinDiaryInfo>}
   */
  async diaries(
    month: DiaryMonthEnum = DiaryMonthEnum.CURRENT,
  ): Promise<IGenshinDiaryInfo> {
    if (!this.region || !this.uid) {
      throw new HoyolabError('UID parameter is missing or failed to be filled')
    }

    if (Object.values(DiaryMonthEnum).includes(month) === false) {
      throw new HoyolabError('The given month parameter is invalid !')
    }

    this.request
      .setParams({
        region: this.region,
        uid: this.uid,
        month,
      })
      .setDs()

    const res = (await this.request.send(Route.GENSHIN_DIARY)).data

    return res as IGenshinDiaryInfo
  }

  /**
   * Fetch history of received resources (primogems and mora) from diary
   *
   * @param type DiaryEnum
   * @param month DiaryMonthEnum
   * @returns {IGenshinDiaryDetail}
   */
  async diaryDetail(
    type: DiaryEnum,
    month: DiaryMonthEnum = DiaryMonthEnum.CURRENT,
  ): Promise<IGenshinDiaryDetail> {
    if (!this.region || !this.uid) {
      throw new HoyolabError('UID parameter is missing or failed to be filled')
    }

    if (Object.values(DiaryMonthEnum).includes(month) === false) {
      throw new HoyolabError('The given month parameter is invalid !')
    }

    if (Object.values(DiaryEnum).includes(type) === false) {
      throw new HoyolabError('The given type parameter is invalid !')
    }

    const responses: Partial<IGenshinDiaryDetail> = {}

    let page = 1
    let next = true
    do {
      this.request
        .setParams({
          region: this.region,
          uid: this.uid,
          month,
          type,
          current_page: page,
          page_size: 100,
        })
        .setDs()

      const res = (await (
        await this.request.send(Route.GENSHIN_DIARY_DETAIL)
      ).data) as IGenshinDiaryDetail

      responses.uid = res.uid
      responses.region = res.region
      responses.optional_month = res.optional_month
      responses.nickname = res.nickname
      responses.data_month = res.data_month
      responses.current_page = res.current_page
      responses.list = [...(responses.list ?? []), ...res.list]

      if (res.list.length < 1) {
        next = false
      }

      page++
    } while (next)

    /* c8 ignore start */
    responses.list.sort((a, b) => {
      const keyA = new Date(a.time)
      const keyB = new Date(b.time)

      // Compare the 2 dates
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1

      return 0
    })
    /* c8 ignore stop */

    return responses as IGenshinDiaryDetail
  }

  /**
   * Fetch Daily login information
   *
   * @returns {Promise<IGenshinDailyInfo>}
   */
  async dailyInfo(): Promise<IGenshinDailyInfo> {
    this.request
      .setParams({
        act_id: 'e202102251931481',
        lang: this.lang,
      })
      .setLang(this.lang)

    const res = (await this.request.send(Route.GENSHIN_DAILY_INFO)).data

    return res as IGenshinDailyInfo
  }

  /**
   * Fetch all rewards from daily login
   *
   * @returns {Promise<IGenshinDailyRewards>}
   */
  async dailyRewards(): Promise<IGenshinDailyRewards> {
    this.request
      .setParams({
        act_id: 'e202102251931481',
        lang: this.lang,
      })
      .setLang(this.lang)

    const res = (await this.request.send(Route.GENSHIN_DAILY_REWARD)).data

    return res as IGenshinDailyRewards
  }

  /**
   * Fetch reward from daily login based on day
   *
   * @param day number | null
   * @returns {Promise<IGenshinDailyReward>}
   */
  async dailyReward(day: number | null = null): Promise<IGenshinDailyReward> {
    const response = await this.dailyRewards()

    if (day === null) {
      const now = new Date(Number(response.now) * 1000)
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
      resign: response.resign,
      award: response.awards[day - 1],
    }
  }

  /**
   * Claim current reward
   *
   * @returns {Promise<IGenshinDailyClaim>}
   */
  async dailyClaim(): Promise<IGenshinDailyClaim> {
    this.request
      .setParams({
        act_id: 'e202102251931481',
        lang: this.lang,
      })
      .setLang(this.lang)

    const response = await this.request.send(Route.GENSHIN_DAILY_CLAIM, 'POST')

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
      String((response.data as IGenshinDailyClaim).code).toLocaleLowerCase() ===
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
      game_biz: 'hk4e_global',
      cdkey: code.replace(/\uFFFD/g, ''),
      lang: this.lang,
      sLangKey: this.lang,
    })

    const res = await this.request.send(Route.GENSHIN_REDEEM_CODE)

    return res as IRedeemCode
  }
}
