import { HoyoError } from '../HoyoError'
import { ICookie } from '../Interfaces'
import { camel2Snake } from './String'

export class Cookie {
  /**
   * Parse document.cookie string to acceptable object
   *
   * @param cookieString string
   * @throws {@link HoyoError} - If an error occurs
   */
  static parseFromString(cookieString: string): ICookie {
    const cookies = cookieString.match(/([^;\s?]+)=([^;]+)/gim)

    if (cookies === null) {
      throw new HoyoError('The given cookieString paramter is invalid')
    }

    const cookie: ICookie = {
      ltoken: '',
      ltuid: '',
    }

    cookies
      .map((val) => {
        return val.split('=')
      })
      .forEach((item) => {
        const key: string = item[0]
        const val = item[1]

        switch (key) {
          case 'ltoken':
            cookie.ltoken = val
            break

          case 'ltuid':
            cookie.ltuid = val
            break

          case 'cookie_token':
            cookie.cookieToken = val
            break

          case 'account_id':
            cookie.accountId = val
            break

          case 'mi18nLang':
            cookie.mi18nLang = val
            break
        }
      })

    if (cookie.ltoken === '' || cookie.ltuid === '') {
      throw new HoyoError(
        'The given cookieString parameter is not Hoyolab Cookie !'
      )
    }

    if (cookie.ltuid !== '' && !cookie.accountId) {
      cookie.accountId = cookie.ltuid
    }

    return cookie
  }

  /**
   * Parse Cookie object to cookie string
   *
   * @param cookie ICookie
   */
  static parseToString(cookie: ICookie): string {
    if (!cookie.accountId) {
      cookie.accountId = cookie.ltuid
    }

    const cookies: Array<string> = []
    Object.entries(cookie).forEach(([key, value]) => {
      if (value) {
        if (['cookieToken', 'accountId'].includes(key)) {
          key = camel2Snake(key)
        }
        cookies.push(`${key}=${value}`)
      }
    })

    return cookies.join('; ')
  }
}
