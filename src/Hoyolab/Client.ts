import { Cookie } from '../Cookie'
import { HTTP } from '../Helpers'
import { HoyolabOptions, RecordCardResponse } from './Interfaces'

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
}
