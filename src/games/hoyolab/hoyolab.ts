import { ICookie, Cookie } from '../../cookie'
import { LanguageEnum, Language } from '../../language'
import { HoyolabError } from '../../utils'
import { Request } from '../../request'
import { IGame, IGamesList, IHoyolabOptions } from './hoyolab.interface'
import { HoyolabRoute } from './hoyolab.routes'
import { GamesEnum } from './hoyolab.enum'

/**
 * Represents the Hoyolab API client.
 *
 * @class
 * @category Main
 */
export class Hoyolab {
  /**
   * The parsed ICookie object used to authenticate requests.
   */
  readonly cookie: ICookie

  /**
   * The underlying `Request` object used to make HTTP requests.
   */
  readonly request: Request

  /**
   * The language used for API responses.
   */
  public lang: LanguageEnum

  /**
   * Creates a new instance of `Hoyolab`.
   *
   * @constructor
   * @param {IHoyolabOptions} options - The options to initialize the `Hoyolab` instance.
   * @throws {HoyolabError} If `ltuid` or `ltoken` keys are missing in the `ICookie` object.
   */
  constructor(options: IHoyolabOptions) {
    /**
     * The parsed ICookie object used to authenticate requests.
     * @type {ICookie}
     */
    const cookie: ICookie =
      typeof options.cookie === 'string'
        ? Cookie.parseCookieString(options.cookie)
        : options.cookie

    this.cookie = cookie

    if (!options.lang) {
      options.lang = Language.parseLang(cookie.mi18nLang)
    }

    /**
     * The underlying `Request` object used to make HTTP requests.
     * @type {Request}
     */
    this.request = new Request(Cookie.parseCookie(this.cookie))
    this.request.setLang(options.lang)

    /**
     * The language used for API responses.
     * @type {LanguageEnum}
     */
    this.lang = options.lang
  }

  /**
   * Get the list of games on this Hoyolab account.
   *
   * @async
   * @param {GamesEnum} [game] The optional game for which to retrieve accounts.
   * @throws {HoyolabError} Thrown if there are no game accounts on this Hoyolab account.
   * @returns {Promise<IGame[]>} The list of games on this Hoyolab account.
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

    if (!res.data || !data.list) {
      throw new HoyolabError(
        'There is no game account on this hoyolab account !',
      )
    }

    return data.list as IGame[]
  }

  /**
   * Get the account of a specific game from the games list.
   *
   * @async
   * @param {GamesEnum} game - The game that the account belongs to.
   * @throws {HoyolabError} If there is no game account on this hoyolab account.
   * @returns {Promise<IGame>} The game account.
   */
  public async gameAccount(game: GamesEnum): Promise<IGame> {
    const games = await this.gamesList(game)

    if (games.length < 1) {
      throw new HoyolabError(
        'There is no game account on this hoyolab account !',
      )
    }

    return games.reduce((first, second) => {
      return second.level > first.level ? second : first
    })
  }
}
