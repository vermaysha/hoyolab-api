import { Cookie } from '../Cookie'
import { ICookie, LanguageEnum } from '../Interfaces'
import * as Interface from '../Interfaces/Hoyolab'
import { Request } from '../Request'

export class Hoyolab {
  private cookie: ICookie
  private request: Request

  constructor(options: Interface.IHoyolabOptions) {
    if (!options.lang) {
      options.lang = LanguageEnum.ENGLISH
    }
    this.cookie = options.cookie
    this.cookie.mi18nLang = options.lang

    this.request = new Request(Cookie.parseCookie(this.cookie))
    this.request.setLang(this.cookie.mi18nLang)
  }

  public async getGamesList(
    game?: Interface.GamesEnum,
  ): Promise<Interface.IGame[]> {
    if (game) {
      this.request.setParams({
        game_biz: game,
      })
    }

    this.request.setParams({
      uid: this.cookie.ltuid,
      sLangKey: this.cookie.mi18nLang,
    })
    const res = await this.request.send(
      'https://api-account-os.hoyoverse.com/account/binding/api/getUserGameRolesByCookieToken',
    )
    const data = res.data as Interface.IGamesList

    if (!res.data || !data.list) {
      throw Error('There is no game account on this hoyolab account !')
    }

    return data.list as Interface.IGame[]
  }

  public async getGameAccount(
    game: Interface.GamesEnum,
  ): Promise<Interface.IGame> {
    const games = await this.getGamesList(game)

    if (games.length < 1) {
      throw Error('There is no game account on this hoyolab account !')
    }

    return games.reduce((first, second) => {
      return second.level > first.level ? second : first
    })
  }
}
