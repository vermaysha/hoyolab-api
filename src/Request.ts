import got from 'got'
import crypto from 'crypto'
import { Headers, HTTPError, SearchParameters } from 'got'
import { BodyType, IResponse, LanguageEnum } from './Interfaces'
import Cache from './Cache'

export class Request {
  private headers: Headers
  private body: BodyType
  private params: SearchParameters
  private cache: typeof Cache
  private ds: boolean

  constructor(cookies: string | null = null) {
    this.headers = {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
      'x-rpc-app_version': '1.5.0',
      'x-rpc-client_type': '5',
      'x-rpc-language': LanguageEnum.ENGLISH,
    }
    this.body = {}
    this.params = {}
    this.cache = Cache
    this.ds = false

    if (cookies) this.headers.Cookie = cookies
  }

  /**
   * Set Referer Headers
   *
   * @param url {string} URL string of referer
   * @returns {this}
   */
  public setReferer(url: string): this {
    this.headers.Referer = url
    this.headers.Origin = url

    return this
  }

  /**
   * Set Body Paramter
   *
   * @param body {Body} Body Parameters as object
   * @returns {this}
   */
  public setBody(body: BodyType): this {
    this.body = { ...this.body, ...body }

    return this
  }

  /**
   * Set SearchParams or query parameter
   *
   * @param params {SearchParameters} Object of query parameter
   * @returns {this}
   */
  public setParams(params: SearchParameters): this {
    this.params = { ...this.params, ...params }

    return this
  }

  /**
   * Set to used Dynamic Security or not
   *
   * @param flag {boolean} Flag
   * @returns {this}
   */
  public setDs(flag = true): this {
    this.ds = flag
    return this
  }

  /**
   * Set Language
   *
   * @param lang {Language} Language that used for return of API (default: Language.ENGLISH).
   * @returns {this}
   */
  public setLang(lang: LanguageEnum = LanguageEnum.ENGLISH): this {
    this.headers['x-rpc-language'] = lang

    return this
  }

  /**
   * Send Request
   *
   * @param url {string} URL String
   * @param method {GET | POST} Method for request
   * @returns {Promise<IResponse>}
   */
  public async send(
    url: string,
    method: 'GET' | 'POST' = 'GET',
  ): Promise<IResponse> {
    const bodyOrParam =
      method === 'POST'
        ? got.extend({
            json: this.body,
          })
        : got.extend({
            searchParams: this.params,
          })

    const main = got.extend({
      method,
      cache: this.cache,
      retry: {
        limit: 30,
      },
      headers: this.headers,
      responseType: 'json',
    })

    const hook = got.extend({
      hooks: {
        beforeRequest: [
          (options) => {
            if (this.ds) options.headers.DS = this.generateDS()
          },
        ],
      },
    })

    try {
      const request = got.extend(hook, main, bodyOrParam)

      const result = (await request(url).json()) as IResponse

      this.body = {}

      return result
    } catch (error) {
      if (error instanceof HTTPError) {
        throw error
      } else {
        return {
          retcode: -9999,
          message: '',
          data: null,
        }
      }
    }
  }

  /**
   * Generate Dynamic Security
   *
   * @returns string
   */
  private generateDS(): string {
    const salt = '6s25p5ox5y14umn1p61aqyyvbvvl3lrt'
    const date = new Date()
    const time = Math.floor(date.getTime() / 1000)

    let random = ''
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      const randomChar = characters.charAt(randomIndex)
      random += randomChar
    }

    const hash = crypto
      .createHash('md5')
      .update(`salt=${salt}&t=${time}&r=${random}`)
      .digest('hex')

    return `${time},${random},${hash}`
  }
}
