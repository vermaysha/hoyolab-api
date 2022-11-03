import { Cookie } from '../Cookie'
import { HTTP } from '../Helpers'
import {
  GameListResponse,
  HoyolabOptions,
  RecordCardResponse,
} from './Interfaces'

export class Client {
  private http: HTTP
  private cookie: Cookie
  private userAgent?: string

  constructor(options: HoyolabOptions) {
    this.cookie = new Cookie(options.cookie)
    this.http = new HTTP()
    this.userAgent = options.userAgent
  }

  /**
   * Retrive all record card data
   *
   * @returns Promise<RecordCardResponse>
   */
  public async getGameRecord(): Promise<RecordCardResponse> {
    const response = await this.http.get(
      'https://bbs-api-os.hoyolab.com/game_record/card/wapi/getGameRecordCard',
      {
        cookie: this.cookie.getCookie(),
        userAgent: this.userAgent,
        params: {
          uid: this.cookie.account_id,
        },
        withDs: true,
      },
    )

    if (response.retcode != 0) {
      throw new Error(`Failed to retrive record: ${response.message}`)
    }

    return response.data
  }

  /**
   *
   * @param games string - gi | hi3
   * @returns
   */
  public async getGames(games?: 'gi' | 'hi3'): Promise<GameListResponse> {
    const gameBiz =
      games == 'hi3' ? 'bh3_global' : games == 'gi' ? 'hk4e_global' : ''

    const response = await this.http.get(
      'https://api-os-takumi.hoyoverse.com/binding/api/getUserGameRolesByCookie',
      {
        cookie: this.cookie.getCookie(),
        params: {
          game_biz: gameBiz,
        },
        userAgent: this.userAgent,
        withDs: false,
      },
    )

    if (response.retcode != 0) {
      throw new Error(`Failed to retrive game list: ${response.message}`)
    }

    return response.data
  }
}
