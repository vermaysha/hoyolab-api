import { ICookie, Options } from './Interfaces'
import { Cookie, Request } from './Utils'

/**
 * This is the main class which contains built-in properties and methods.
 *
 * @category Main
 * @abstract
 */
export abstract class Base {
  /**
   * The cookie that will be used for each request
   *
   * @protected
   */
  protected cookie: ICookie

  /**
   * Request object
   *
   * @protected
   */
  protected request: Request

  /**
   * @constructor
   * @param options Options - Default options
   */
  constructor(options: Options) {
    this.cookie = options.cookie

    if (!options.cookie.accountId) {
      this.cookie.accountId = options.cookie.ltuid
    }

    this.request = new Request(Cookie.parseToString(options.cookie))
  }
}
