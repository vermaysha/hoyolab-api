import type { GamesEnum } from '../../games/hoyolab'
import type { LanguageEnum } from '../../language'
import { Request } from '../../request'
import { HoyolabError } from '../../utils'
import type { IRedeemCode } from './redeem.interface'
import { RedeemRoute } from './redeem.route'

export class RedeemModule {
  constructor(
    private request: Request,
    private lang: LanguageEnum,
    private game: GamesEnum,
    private region: string | null,
    private uid: number | null,
  ) {}

  /**
   * Redeem Code
   *
   * @param code string
   * @throws HoyolabError
   * @returns {Promise<IRedeemCode>}
   */
  async claim(code: string): Promise<IRedeemCode> {
    if (!this.region || !this.uid) {
      throw new HoyolabError('UID parameter is missing or failed to be filled')
    }

    this.request.setParams({
      uid: this.uid,
      region: this.region,
      game_biz: this.game,
      cdkey: code.replace(/\uFFFD/g, ''),
      lang: this.lang,
      sLangKey: this.lang,
    })

    const res = await this.request.send(RedeemRoute.redeem())

    return res as IRedeemCode
  }
}
