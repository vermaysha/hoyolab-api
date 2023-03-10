import { Options } from './Interfaces/Options'
import { Request } from './Utils'

export class Base {
  protected cookie
  protected request

  constructor(options: Options) {
    this.cookie = options.cookie
    this.request = new Request(this.cookieString())
  }

  protected cookieString(): string {
    const cookies: Array<string> = []
    Object.entries(this.cookie).forEach(([key, value]) => {
      if (value) {
        cookies.push(`${key}=${value}`)
      }
    })

    return cookies.join('; ')
  }
}
