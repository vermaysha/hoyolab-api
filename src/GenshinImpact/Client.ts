import { Cookie } from '../Cookie'
import { HTTP } from '../Helpers'
import { getRegionByUid } from '../Helpers/getRegionByUid'
import { Options } from '../Interfaces'
import {
  AccountResponse,
  CharacterInfoResponse,
  CharacterResponse,
  DailyResourcesResponse,
  DailyRewardResponse,
  DailyRewardsResponse,
  DailyClaimResponse,
  DailyInfoResponse,
  DiaryResponse,
  SpiralAbyssResponse,
} from './Interfaces'

export class Client {
  private http: HTTP
  private cookie: Cookie
  private uid: string | number
  private userAgent?: string

  constructor(options: Options) {
    this.cookie = new Cookie(options.cookie)
    this.uid = options.uid
    this.http = new HTTP()
    this.userAgent = options.userAgent
  }

  /**
   * Get account exploration, account statistic, and user info
   *
   * @returns Promise<AccountResponse>
   * @throws {Error} if failed to send request
   */
  public async getAccounts(): Promise<AccountResponse> {
    const response = await this.http.get(
      'https://bbs-api-os.hoyolab.com/game_record/genshin/api/index',
      {
        cookie: this.cookie.getCookie(),
        userAgent: this.userAgent,
        withDs: true,
        params: {
          role_id: this.uid,
          server: getRegionByUid(this.uid),
        },
      },
    )

    if (response.retcode != 0) {
      throw new Error(`Failed to retrive account: ${response.message}`)
    }

    return response.data
  }

  /**
   * Retrive all characters data
   *
   * @returns Promise<CharacterResponse>
   * @throws {Error} if failed to send request
   */
  public async getCharacters(): Promise<CharacterResponse> {
    const response = await this.http.post(
      'https://bbs-api-os.hoyolab.com/game_record/genshin/api/character',
      {
        cookie: this.cookie.getCookie(),
        userAgent: this.userAgent,
        withDs: true,
        params: {
          role_id: this.uid,
          server: getRegionByUid(this.uid),
        },
      },
    )

    if (response.retcode != 0) {
      throw new Error(`Failed to retrive characters: ${response.message}`)
    }

    return response.data
  }

  /**
   * Retrive single character data
   *
   * @param characterId - number | string
   * @returns Promise<CharacterInfoResponse>
   * @throws {Error} if failed to send request
   */
  public async getCharacter(
    characterId: number | string,
  ): Promise<CharacterInfoResponse> {
    const response = await this.http.post(
      'https://bbs-api-os.hoyolab.com/game_record/genshin/api/avatarBasicInfo',
      {
        cookie: this.cookie.getCookie(),
        userAgent: this.userAgent,
        withDs: true,
        body: {
          character_ids: [characterId],
          role_id: this.uid,
          server: getRegionByUid(this.uid),
        },
      },
    )

    if (response.retcode != 0) {
      throw new Error(`Failed to retrive character: ${response.message}`)
    }

    return response.data
  }

  /**
   * Get Daily Refreshed Resources
   *
   * @returns Promise<DailyResourcesResponse>
   * @throws {Error} if failed to send request
   */
  public async getDailyResources(): Promise<DailyResourcesResponse> {
    const response = await this.http.get(
      'https://bbs-api-os.hoyolab.com/game_record/genshin/api/dailyNote',
      {
        cookie: this.cookie.getCookie(),
        userAgent: this.userAgent,
        params: {
          server: getRegionByUid(this.uid),
          role_id: this.uid,
        },
        withDs: true,
      },
    )

    if (response.retcode != 0) {
      throw new Error(`Failed to retrive daily resources: ${response.message}`)
    }

    return response.data
  }

  /**
   * Get all daily rewards
   *
   * @returns Promise<DailyRewardsResponse>
   * @throws {Error} if failed to send request
   */
  public async getDailyRewards(): Promise<DailyRewardsResponse> {
    const response = await this.http.get(
      'https://sg-hk4e-api.hoyolab.com/event/sol/home',
      {
        cookie: this.cookie.getCookie(),
        userAgent: this.userAgent,
        params: {
          act_id: 'e202102251931481',
          lang: 'en-us',
        },
      },
    )

    if (response.retcode != 0) {
      throw new Error(`Failed to retrive daily rewards: ${response.message}`)
    }

    return response.data
  }

  /**
   * Get daily reward by day
   *
   * @param day number
   * @returns Promise<DailyRewardResponse>
   */
  public async getDailyReward(day: number): Promise<DailyRewardResponse> {
    const rewards = await this.getDailyRewards()
    return rewards.awards[day - 1]
  }

  /**
   * Get the daily rewards info
   *
   * @returns Promise<DailyInfoResponse>
   */
  public async getDailyInfo(): Promise<DailyInfoResponse> {
    const response = await this.http.get(
      'https://sg-hk4e-api.hoyolab.com/event/sol/info',
      {
        cookie: this.cookie.getCookie(),
        userAgent: this.userAgent,
        params: {
          act_id: 'e202102251931481',
          lang: 'en-us',
        },
      },
    )

    if (response.retcode != 0) {
      throw new Error(
        `Failed to retrive daily information: ${response.message}`,
      )
    }

    return response.data
  }

  /**
   * Claim the daily reward
   *
   * @returns Promise<DailyRewardResponse>
   */
  public async claimDaily(): Promise<DailyClaimResponse> {
    const response = await this.http.post(
      'https://sg-hk4e-api.hoyolab.com/event/sol/sign',
      {
        cookie: this.cookie.getCookie(),
        userAgent: this.userAgent,
        params: {
          act_id: 'e202102251931481',
          lang: 'en-us',
        },
      },
    )

    if (response.retcode === -5003) {
      return {
        status: 'Already claimed',
        code: -5003,
        rewards: null,
      }
    }

    if (response.data.code === 'ok' && response.retcode === 0) {
      const info = await this.getDailyInfo()
      const today = info.today.split('-')[2]
      const reward = await this.getDailyReward(parseInt(today || '1'))
      return {
        status: 'success',
        code: 0,
        rewards: reward,
      }
    }

    return {
      status: 'error',
      code: response.retcode,
      rewards: null,
    }
  }

  /**
   * Retrive diary data
   *
   * @param month number | undefined
   * @returns Promise<DiaryResponse>
   */
  public async getDiary(month?: number): Promise<DiaryResponse> {
    const response = await this.http.get(
      'https://sg-hk4e-api.hoyolab.com/event/ysledgeros/month_info',
      {
        cookie: this.cookie.getCookie(),
        userAgent: this.userAgent,
        params: {
          region: getRegionByUid(this.uid),
          uid: this.uid,
          month,
        },
        withDs: true,
      },
    )

    if (response.retcode != 0) {
      throw new Error(`Failed to retrive diary: ${response.message}`)
    }

    return response.data
  }

  /**
   * Retrive spiral abyss history of this month
   *
   * @param previous boolean
   * @returns Promise<SpiralAbyssResponse>
   */
  public async getSpiralAbyss(
    previous?: boolean,
  ): Promise<SpiralAbyssResponse> {
    const response = await this.http.get(
      'https://bbs-api-os.hoyolab.com/game_record/genshin/api/spiralAbyss',
      {
        cookie: this.cookie.getCookie(),
        userAgent: this.userAgent,
        params: {
          server: getRegionByUid(this.uid),
          role_id: this.uid,
          schedule_type: previous ? 2 : 1,
        },
        withDs: true,
      },
    )

    if (response.retcode != 0) {
      throw new Error(`Failed to retrive spiral abyss: ${response.message}`)
    }

    return response.data
  }
}
