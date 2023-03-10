import { RecordCardData } from './Interfaces/Hoyolab/RecordCardResponse'
import { GameListResponse } from './Interfaces/Hoyolab/GameListResponse'
import { Base } from './Base'
import { Routes } from './Utils'

export class Hoyolab extends Base {
  public async getGames(): Promise<GameListResponse> {
    const response = await this.request.send(
      Routes.takumiUrl + '/binding/api/getUserGameRolesByCookie'
    )

    return response.data
  }

  public async getRecords(): Promise<RecordCardData> {
    this.request.setParams({
      uid: this.cookie.ltuid,
    })
    this.request.withDS()

    const response = await this.request.send(
      Routes.bbsUrl + '/game_record/card/wapi/getGameRecordCard'
    )

    return response.data
  }
}
