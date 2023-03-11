import { HoyoError } from './HoyoError'
import { Base } from './Base'
import * as Interface from './Interfaces/Genshin'
import * as Types from './Types'
import { GenshinRoutes, ServerRegion } from './Utils'
import { GenshinOption, Options } from './Interfaces'
import { DiaryMonth } from './Enum'

/**
 * Get data from Hoyolab API
 *
 * @throws {@link HoyoError} - if given UID is invalid
 * @category Main
 */
export class Genshin extends Base {
  /**
   * Genshin Impact UID
   */
  protected readonly uid: string | number

  /**
   * Genshin Impact Region
   */
  protected readonly region: Types.Region

  constructor(options: Options & GenshinOption) {
    super(options)

    this.uid = options.uid
    this.region = ServerRegion.determineRegion(options.uid)
  }

  public async getDailyInfo(): Promise<Interface.DailyInfoResponse> {
    const response = await this.request.send(GenshinRoutes.dailyInfo)

    return response.data
  }

  public async getDailyRewards(): Promise<Interface.DailyRewardsResponse> {
    const response = await this.request.send(GenshinRoutes.dailyRewards)

    return response.data
  }

  public async getDailyReward(
    day: Types.NumericRange<0, 30> | null = null
  ): Promise<Interface.DailyRewardResponse> {
    const response = await this.getDailyRewards()

    let currentDate = 0
    if (day === null) {
      const now = new Date(Number(response.now) * 1000)
      currentDate = (now.getDate() - 1) as Types.NumericRange<0, 30>
    }

    if (typeof response.awards[day ?? currentDate] !== undefined) {
      return {
        month: response.month,
        now: response.now,
        resign: response.resign,
        award: response.awards[day ?? currentDate],
      }
    }
    /* c8 ignore next 2 */
    throw new HoyoError('The selected day was not found !')
  }

  public async claimDaily(): Promise<Interface.DailyClaimResponse> {
    const response = await this.request.send(GenshinRoutes.dailyClaim, 'post')

    const info = await this.getDailyInfo()
    const reward = await this.getDailyReward()

    if (response.retcode === -5003) {
      return {
        status: "Traveller, you've already checked in today",
        code: -5003,
        reward,
        info,
      }
    }
    /* c8 ignore start */

    if (
      String(
        (response.data as Interface.DailyClaimResponse).code
      ).toLocaleLowerCase() === 'ok' &&
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

  public async getCharacters(): Promise<Interface.CharacterResponse> {
    this.request.withDS()
    this.request.setBody({
      role_id: this.uid,
      server: this.region,
    })

    const response = await this.request.send(GenshinRoutes.characters, 'post')

    return response.data
  }

  public async getCharactersInfo(
    characterIds: number[]
  ): Promise<Interface.CharacterInfoResponse> {
    this.request.withDS()
    this.request.setBody({
      character_ids: characterIds,
      role_id: this.uid,
      server: this.region,
    })

    const response = await this.request.send(
      GenshinRoutes.charactersInfo,
      'post'
    )

    return response.data
  }

  public async getDailyNotes(): Promise<Interface.DailyNotesResponse> {
    this.request.setParams({
      server: this.region,
      role_id: this.uid,
    })
    this.request.withDS()

    const response = await this.request.send(GenshinRoutes.dailyNotes)

    return response.data
  }

  public async getDiaryInfo(
    month: DiaryMonth = DiaryMonth.CURRENT
  ): Promise<Interface.DiaryInfoResponse> {
    /* c8 ignore start */
    if (Object.values(DiaryMonth).includes(month) === false) {
      month = DiaryMonth.CURRENT
    }
    /* c8 ignore stop */

    this.request.setParams({
      region: this.region,
      uid: this.uid,
      month: month,
    })
    this.request.withDS()

    const response = await this.request.send(GenshinRoutes.diaryInfo)

    return response.data
  }
}
