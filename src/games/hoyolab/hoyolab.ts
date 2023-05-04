import { ICookie, Cookie } from '../../cookie'
import { LanguageEnum, Language } from '../../language'
import { HoyolabError } from '../../utils'
import { Request } from '../../request'
import { IGame, IGamesList, IHoyolabOptions } from './hoyolab.interface'
import { HoyolabRoute } from './hoyolab.routes'
import { GamesEnum } from './hoyolab.enum'

export class Hoyolab {
  readonly cookie: ICookie
  readonly request: Request
  public lang: LanguageEnum

  constructor(options: IHoyolabOptions) {
    /* c8 ignore start */
    const cookie: ICookie =
      typeof options.cookie === 'string'
        ? Cookie.parseCookieString(options.cookie)
        : options.cookie
    /* c8 ignore stop */

    this.cookie = cookie

    if (!options.lang) {
      options.lang = Language.parseLang(cookie.mi18nLang)
    }

    this.request = new Request(Cookie.parseCookie(this.cookie))
    this.request.setLang(options.lang)

    this.lang = options.lang
  }

  /**
   * Get games available accounts
   *
   * @param game GamesEnum Selected Game
   * @returns {Promise<IGame[]>}
   */
  public async gamesList(game?: GamesEnum): Promise<IGame[]> {
    if (game) {
      this.request.setParams({
        game_biz: game,
      })
    }

    this.request.setParams({
      uid: this.cookie.ltuid,
      sLangKey: this.cookie.mi18nLang,
    })
    const res = await this.request.send(HoyolabRoute.games())
    const data = res.data as IGamesList

    /* c8 ignore start */
    if (!res.data || !data.list) {
      throw new HoyolabError(
        'There is no game account on this hoyolab account !',
      )
    }
    /* c8 ignore stop */

    return data.list as IGame[]
  }

  /**
   * Select one of highest level game account
   *
   * @param game GameEnum Selected Game
   * @returns {Promise<IGame>}
   */
  public async gameAccount(game: GamesEnum): Promise<IGame> {
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