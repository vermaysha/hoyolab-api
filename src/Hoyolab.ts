import { HoyoError } from './HoyoError'
import { RecordCardResponse, GameListResponse } from './Interfaces/Hoyolab'
import { Base } from './Base'
import { GameRoutes } from './Utils'

/**
 * @category Main
 */
export class Hoyolab extends Base {
  public async getGames(): Promise<GameListResponse> {
    const response = await this.request.send(
      GameRoutes.takumiUrl + '/binding/api/getUserGameRolesByCookie'
    )

    return response.data
  }

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
