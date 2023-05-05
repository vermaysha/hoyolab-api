import { HoyolabError } from '../utils'
import { ICookie } from './cookie.interface'
import { toSnakeCase, toCamelCase } from './cookie.helper'
import { Language } from '../language'

/**
 * Represents a cookie object.
 *
 * @class
 * @category Main
 */
export class Cookie {
  /**
   * Parses a cookie string and returns a parsed ICookie object.
   *
   * @param cookieString - The cookie string to be parsed.
   * @returns {string} - A parsed ICookie object.
   * @throws {HoyolabError} when ltuid or ltoken keys are not found in the cookie string.
   */
  static parseCookieString(cookieString: string): ICookie {
    const cookies: Partial<ICookie> = {}

    const keys: string[] = [
      'ltoken',
      'ltuid',
      'account_id',
      'cookie_token',
      'mi18nLang',
    ]

    cookieString.split(';').forEach((cookie) => {
      const [cookieKey, cookieValue] = cookie.trim().split('=')
      if (keys.includes(cookieKey)) {
        cookies[toCamelCase(cookieKey)] = decodeURIComponent(cookieValue)
        if (cookieKey === 'ltuid' || cookieKey === 'account_id') {
          cookies[toCamelCase(cookieKey)] = parseInt(
            cookies[toCamelCase(cookieKey)],
            10,
          )
        } else if (cookieKey === 'mi18nLang') {
          cookies[toCamelCase(cookieKey)] = Language.parseLang(
            cookies[toCamelCase(cookieKey)].toString(),
          )
        }
      }
    })

    if (cookies.ltuid && !cookies.accountId) {
      cookies.accountId = cookies.ltuid
    } else if (!cookies.ltuid && cookies.accountId) {
      cookies.ltuid = cookies.accountId
    }

    if (!cookies.ltoken || !cookies.ltuid) {
      throw new HoyolabError('Cookie key ltuid or ltoken doesnt exist !')
    }

    return cookies as ICookie
  }

  /**
   * Converts an `ICookie` object into a cookie string.
   * @param {ICookie} cookie - The `ICookie` object to convert.
   * @returns {string} A string representing the cookie.
   * @throws {HoyolabError} If the `ltuid` or `ltoken` key is missing in the `ICookie` object.
   */
  static parseCookie(cookie: ICookie): string {
    if (!cookie.accountId) {
      cookie.accountId = cookie.ltuid
    }

    const cookies: Array<string> = []
    Object.entries(cookie).forEach(([key, value]) => {
      if (value) {
        if (['cookieToken', 'accountId'].includes(key)) {
          key = toSnakeCase(key)
        }
        cookies.push(`${key}=${value}`)
      }
    })

    return cookies.join('; ')
  }
}
