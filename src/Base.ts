import { OptionCookie, Options } from './Interfaces'
import { Request } from './Utils'

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
  protected cookie: OptionCookie

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

    this.request = new Request(this.cookieString())
  }

  /**
   * Generate Cookie string
   *
   * @returns string - Generated Cookie String
   */
  protected cookieString(): string {
    const cookies: Array<string> = []
    Object.entries(this.cookie).forEach(([key, value]) => {
      if (value) {
        if (['cookieToken', 'accountId'].includes(key)) {
          key = key
            .replace(/([A-Z])/g, ' $1')
            .split(' ')
            .join('_')
            .toLowerCase()
        }
        cookies.push(`${key}=${value}`)
      }
    })

    return cookies.join('; ')
  }
}
