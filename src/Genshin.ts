import { ServerRegion } from './Utils/ServerRegion'
import { HoyoError } from './HoyoError'
import { Base } from './Base'
import * as Interface from './Interfaces/Genshin'
import * as Types from './Types'
import { GenshinRoutes } from './Utils'
import { GenshinOption, Options } from './Interfaces'

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

    /* c8 ignore start */
    if (typeof response.awards[day ?? currentDate] !== undefined) {
      return {
        month: response.month,
        now: response.now,
        resign: response.resign,
        award: response.awards[day ?? currentDate],
      }
    }

    throw new HoyoError('The selected day was not found !')
    /* c8 ignore end */
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
    /* c8 ignore end */

    return {
      status: response.message,
      code: response.retcode,
      reward: null,
      info,
    }
  }

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
}
