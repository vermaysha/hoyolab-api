import { Cookie } from './Cookie'
import { HoyolabError } from './HoyolabError'
import { ICookie, LanguageEnum } from './Interfaces'
import * as Interface from './Interfaces/Hoyolab'
import { Request } from './Request'
import { parseLang } from './helpers'
import { GAMES_ACCOUNT } from './routes'

export class Hoyolab {
  readonly cookie: ICookie
  readonly request: Request
  public lang: LanguageEnum

  constructor(options: Interface.IHoyolabOptions) {
    const cookie: ICookie =
      typeof options.cookie === 'string'
        ? Cookie.parseCookieString(options.cookie)
        : options.cookie

    this.cookie = cookie

    if (!options.lang) {
      options.lang = parseLang(cookie.mi18nLang)
    }

    this.request = new Request(Cookie.parseCookie(this.cookie))
    this.request.setLang(options.lang)

    this.lang = options.lang
  }

  /**
   * Get games available accounts
   *
   * @param game GamesEnum Selected Game
   * @returns {Promise<Interface.IGame[]>}
   */
  public async gamesList(
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
    const res = await this.request.send(GAMES_ACCOUNT)
    const data = res.data as Interface.IGamesList

    /* c8 ignore start */
    if (!res.data || !data.list) {
      throw new HoyolabError(
        'There is no game account on this hoyolab account !',
      )
    }
    /* c8 ignore stop */

    return data.list as Interface.IGame[]
  }

  /**
   * Select one of highest level game account
   *
   * @param game GameEnum Selected Game
   * @returns {Promise<Interface.IGame>}
   */
  public async gameAccount(
    game: Interface.GamesEnum,
  ): Promise<Interface.IGame> {
    const games = await this.gamesList(game)

    /* c8 ignore start */
    if (games.length < 1) {
      throw new HoyolabError(
        'There is no game account on this hoyolab account !',
      )
    }
    /* c8 ignore stop */

    return games.reduce((first, second) => {
      return second.level > first.level ? second : first
    })
  }
}
