import { HoyoError } from './HoyoError'
import { RecordCardResponse, GameListResponse } from './Interfaces/Hoyolab'
import { Base } from './Base'
import { GameRoutes } from './Utils'

/**
 * Get data from Hoyolab API
 *
 * @category Main
 */
export class Hoyolab extends Base {
  /**
   * Displays a list of game accounts from mihoyo that are registered on user accounts
   *
   * @throws {@link HoyoError} - If the request error caused by this library
   * @throws {@link [AxiosError](https://github.com/axios/axios/blob/v1.x/lib/core/AxiosError.js)} - If the error is caused by the server
   */
  public async getGames(): Promise<GameListResponse> {
    const response = await this.request.send(
      GameRoutes.takumiUrl + '/binding/api/getUserGameRolesByCookie'
    )

    return response.data
  }

  /**
   * Displays the Game Record for each registered game
   *
   * @throws {@link HoyoError} - If the request error caused by this library
   * @throws {@link [AxiosError](https://github.com/axios/axios/blob/v1.x/lib/core/AxiosError.js)} - If the error is caused by the server
   */
  public async getRecords(): Promise<RecordCardResponse> {
    if (!this.cookie.accountId) {
      throw new HoyoError(
        'getRecords() function requires cookie.accountId to be filled !'
      )
    }

    this.request.setParams({
      uid: this.cookie.accountId,
    })
    this.request.withDS()

    const response = await this.request.send(
      GameRoutes.bbsUrl + '/game_record/card/wapi/getGameRecordCard'
    )

    return response.data
  }
}
