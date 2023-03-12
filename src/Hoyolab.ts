import { HoyoError } from './HoyoError'
import { RecordCardResponse, GameListResponse } from './Interfaces/Hoyolab'
import { Base } from './Base'
import { HoyolabRoutes } from './Utils'
import { Games } from './Enum'

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
  public async getGames(games: Games = Games.ALL): Promise<GameListResponse> {
    /* c8 ignore start */
    if (Object.values(Games).includes(games) === false) {
      throw new HoyoError('The given games parameter is invalid !')
    }

    if (games !== Games.ALL) {
      this.request.setParams({
        region: games,
      })
    }
    /* c8 ignore stop */

    const response = await this.request.send(HoyolabRoutes.gamesList)

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

    const response = await this.request.send(HoyolabRoutes.recordsList)

    return response.data
  }
}
