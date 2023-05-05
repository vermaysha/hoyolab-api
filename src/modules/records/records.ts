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

/**
 * RecordModule class provides methods to interact with Genshin Impact's record module endpoints.
 *
 * @class
 * @internal
 * @category Module
 */
export class RecordModule {
  /**
   * Creates an instance of RecordModule.
   *
   * @constructor
   * @param {Request} request - An instance of Request class.
   * @param {LanguageEnum} lang - The language code to be used in requests.
   * @param {string | null} region - The server region code in which the user's account resides.
   * @param {number | null} uid - The user ID of the Genshin Impact account.
   */
  constructor(
    private request: Request,
    private lang: LanguageEnum,
    private region: string | null,
    private uid: number | null,
  ) {}

  /**
   * Get user's Genshin Impact record
   *
   * @async
   * @function
   * @returns {Promise<IGenshinRecord>} - User's Genshin Impact record
   * @throws {HoyolabError} If UID parameter is missing or failed to be filled
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
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
   *
   * Retrieves the Genshin characters of the user.
   *
   * @async
   * @returns {Promise<IGenshinCharacters>} A Promise that contains the Genshin characters object.
   * @throws {HoyolabError} If UID parameter is missing or failed to be filled.
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
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
   * Returns the summary information of Genshin Impact game characters.
   *
   * @param characterIds - An array of character IDs to retrieve the summary information for.
   * @returns A Promise that resolves to an object containing the summary information of the characters.
   * @throws Throws an error if the UID parameter is missing or failed to be filled.
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
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
   * Retrieves information about the player's performance in the Spiral Abyss.
   *
   * @param scheduleType - The schedule type of the Abyss, either CURRENT or PREVIOUS.
   * @returns A Promise that resolves with an object containing the player's Spiral Abyss data.
   * @throws HoyolabError if UID parameter is missing or failed to be filled, or if the given scheduleType parameter is invalid.
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
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
   * Retrieve the daily note information for a Genshin Impact user.
   * @returns Promise<IGenshinDailyNote> The daily note information.
   * @throws HoyolabError if the UID parameter is missing or failed to be filled.
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
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
