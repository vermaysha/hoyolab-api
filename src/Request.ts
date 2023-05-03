import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import md5 from 'md5'
import { BodyType, IResponse, LanguageEnum } from './Interfaces'
import Cache from './Cache'
import { HoyolabError } from './HoyolabError'

export class Request {
  private headers: BodyType
  private body: BodyType
  private params: BodyType
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
   * @param url string URL string of referer
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
   * @param body Body Body Parameters as object
   * @returns {this}
   */
  public setBody(body: BodyType): this {
    this.body = { ...this.body, ...body }

    return this
  }

  /**
   * Set SearchParams or query parameter
   *
   * @param params BodyType Object of query parameter
   * @returns {this}
   */
  public setParams(params: BodyType): this {
    this.params = { ...this.params, ...params }

    return this
  }

  /**
   * Set to used Dynamic Security or not
   *
   * @param flag boolean Flag
   * @returns {this}
   */
  public setDs(flag = true): this {
    this.ds = flag
    return this
  }

  /**
   * Set Language
   *
   * @param lang Language Language that used for return of API (default: Language.ENGLISH).
   * @returns {this}
   */
  public setLang(lang: LanguageEnum = LanguageEnum.ENGLISH): this {
    this.headers['x-rpc-language'] = lang

    return this
  }

  /* c8 ignore start */

  /**
   * Send Request
   *
   * @param url string URL String
   * @param method GET|POST Method for request
   * @returns {Promise<IResponse>}
   */
  public async send(
    url: string,
    method: 'GET' | 'POST' = 'GET',
  ): Promise<IResponse> {
    if (this.ds) {
      this.headers.DS = this.generateDS()
    }

    const config: AxiosRequestConfig = {
      method,
      params: this.params,
      headers: this.headers as object,
      responseType: 'json',
    }

    if (method === 'POST') {
      config.data = this.body
    }

    try {
      const request = (await axios(url, config)).data

      const result = (await request) as IResponse

      this.body = {}

      return result
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        throw new HoyolabError(`[${error.code}] - ${error.message}`)
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
   * @returns {string}
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

    const hash = md5(`salt=${salt}&t=${time}&r=${random}`, {
      encoding: 'hex',
    })

    return `${time},${random},${hash}`
  }
  /* c8 ignore stop */
}
