import { Cookie } from './Cookie'
import { Hoyolab } from './Hoyolab'
import { HoyolabError } from './HoyolabError'
import { GamesEnum, ICookie, LanguageEnum } from './Interfaces'
import {
  IGenshinCharacterSummary,
  IGenshinCharacters,
  IGenshinDailyNote,
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
}
