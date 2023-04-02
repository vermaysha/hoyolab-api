import { HoyolabError } from './HoyolabError'
import { ICookie } from './Interfaces'
import { toSnakeCase, toCamelCase, parseLang } from './helpers'

export class Cookie {
  /**
   * Parse Cookie string to ICookie Object
   *
   * @param cookieString string String cookies sourced from the hoyolab page
   * @returns {ICookie}
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

    const cookieArr = cookieString.split(';')

    for (const element of cookieArr) {
      const cookie = element.trim().split('=')
      const cookieKey = cookie[0]
      let cookieValue: string | number = decodeURIComponent(cookie[1])

      if (keys.includes(cookieKey)) {
        if (['ltuid', 'account_id'].includes(cookieKey)) {
          cookieValue = parseInt(cookieValue)
        }

        if (cookieKey === 'mi18nLang') {
          cookieValue = parseLang(cookieValue.toString())
        }

        cookies[toCamelCase(cookieKey)] = cookieValue
      }
    }

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
   * Parse Cookie object to cookie string
   *
   * @param cookie ICookie
   * @returns {string}
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
