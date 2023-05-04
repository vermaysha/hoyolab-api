import type { LanguageEnum } from '../../language'
import type { Request } from '../../request'
import { HoyolabError } from '../../utils'
import { AbyssScheduleEnum } from './records.enum'
import { RecordRoute } from './records.route'
import {
  IGenshinCharacterSummary,
  IGenshinCharacters,
  IGenshinDailyNote,
  IGenshinRecord,
  IGenshinSpiralAbyss,
} from './interface'

export class RecordModule {
  constructor(
    private request: Request,
    private lang: LanguageEnum,
    private region: string | null,
    private uid: number | null,
  ) {}

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
        lang: this.lang,
      })
      .setDs(true)

    const res = (await this.request.send(RecordRoute.index())).data

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

    const res = (await this.request.send(RecordRoute.character(), 'POST')).data

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

    const res = (await this.request.send(RecordRoute.avatarBasicInfo(), 'POST'))
      .data

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

    const res = (await this.request.send(RecordRoute.spiralAbyss())).data

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

    const res = (await this.request.send(RecordRoute.dailyNote())).data

    return res as IGenshinDailyNote
  }
}
