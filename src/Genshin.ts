import { Cookie } from './Cookie'
import { Hoyolab } from './Hoyolab'
import { HoyolabError } from './HoyolabError'
import { GamesEnum, ICookie, LanguageEnum } from './Interfaces'
import {
  DiaryEnum,
  DiaryMonthEnum,
  IGenshinCharacterSummary,
  IGenshinCharacters,
  IGenshinDailyNote,
  IGenshinDiaryDetail,
  IGenshinDiaryInfo,
  IGenshinOptions,
  IGenshinRecord,
  IGenshinSpiralAbyss,
} from './Interfaces/Genshin'
import { AbyssScheduleEnum } from './Interfaces/Genshin'
import { Request } from './Request'
import { genshinRegion } from './helpers'
import * as Route from './routes'

export class Genshin {
  private cookie: ICookie
  private request: Request
  public uid: number | null
  public region: string | null

  constructor(options: IGenshinOptions) {
    if (!options.lang) {
      options.lang = LanguageEnum.ENGLISH
    }
    this.cookie = options.cookie
    this.cookie.mi18nLang = options.lang

    this.request = new Request(Cookie.parseCookie(this.cookie))
    this.request.setLang(this.cookie.mi18nLang)
    this.request.setReferer(Route.GENSHIN_GAME_RECORD_REFERER)

    this.uid = options.uid ?? null
    this.region = this.uid !== null ? genshinRegion(this.uid) : null
  }

  /**
   * Create Genshin Object
   *
   * @param options {IGenshinOptions} Options
   * @returns Promise<Genshin>
   */
  static async create(options: IGenshinOptions): Promise<Genshin> {
    const instance = new Genshin(options)

    if (instance.uid === null) {
      const hoyolab = new Hoyolab({
        cookie: options.cookie,
      })

      const game = await hoyolab.getGameAccount(GamesEnum.GENSHIN_IMPACT)
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

    /* c8 ignore start */
    if (Object.values(AbyssScheduleEnum).includes(scheduleType) === false) {
      throw new HoyolabError('The given scheduleType parameter is invalid !')
    }
    /* c8 ignore stop */

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

    /* c8 ignore start */
    if (Object.values(DiaryMonthEnum).includes(month) === false) {
      throw new HoyolabError('The given month parameter is invalid !')
    }
    /* c8 ignore stop */

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

    /* c8 ignore start */
    if (Object.values(DiaryMonthEnum).includes(month) === false) {
      throw new HoyolabError('The given month parameter is invalid !')
    }

    if (Object.values(DiaryEnum).includes(type) === false) {
      throw new HoyolabError('The given type parameter is invalid !')
    }
    /* c8 ignore stop */

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

    // Sort by date
    responses.list.sort((a, b) => {
      const keyA = new Date(a.time)
      const keyB = new Date(b.time)

      /* c8 ignore start */
      // Compare the 2 dates
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
      /* c8 ignore stop */

      return 0
    })

    return responses as IGenshinDiaryDetail
  }
}
