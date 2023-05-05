import {
  RequestHeaderType,
  IResponse,
  RequestBodyType,
  RequestParamType,
} from './request.inteface'
import { LanguageEnum } from '../language'
import { HoyolabError } from '../utils'
import Cache from './request.cache'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { generateDS } from './request.ds'

/**
 * Class for handling HTTP requests with customizable headers, body, and parameters.
 *
 * @class
 * @internal
 * @category Internal
 */
export class Request {
  /*
   * Headers for the request.
   */
  private headers: RequestHeaderType

  /**
   * Body of the request.
   */
  private body: RequestBodyType

  /**
   * Query parameters for the request.
   */
  private params: RequestParamType

  /**
   * The cache used for the request
   */
  private cache: typeof Cache

  /**
   * Flag indicating whether Dynamic Security is used.
   */
  private ds: boolean

  /**
   * Constructor for the Request class.
   *
   * @param cookies - A string of cookies to be added to the request headers (default: null).
   */
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
   * @param url - The URL string of referer
   * @returns The updated Request instance.
   */
  public setReferer(url: string): Request {
    this.headers.Referer = url
    this.headers.Origin = url

    return this
  }

  /**
   * Set Body Parameter
   *
   * @param body - RequestBodyType as object containing the body parameters.
   * @returns This instance of Request object.
   */
  public setBody(body: RequestBodyType): Request {
    this.body = { ...this.body, ...body }

    return this
  }

  /**
   * Sets search parameters or query parameter.
   *
   * @param params - An object of query parameter to be set.
   * @returns {Request} - Returns this Request object.
   */
  public setParams(params: RequestParamType): Request {
    this.params = { ...this.params, ...params }

    return this
  }

  /**
   * Set to used Dynamic Security or not
   *
   * @param flag boolean Flag indicating whether to use dynamic security or not (default: true).
   * @returns {this} The current Request instance.
   */
  public setDs(flag = true): Request {
    this.ds = flag
    return this
  }

  /**
   * Set Language
   *
   * @param lang Language Language that used for return of API (default: Language.ENGLISH).
   * @returns {this}
   */
  public setLang(lang: LanguageEnum = LanguageEnum.ENGLISH): Request {
    this.headers['x-rpc-language'] = lang

    return this
  }

  /**
   * Send the HTTP request.
   *
   * @param url - The URL to send the request to.
   * @param method - The HTTP method to use. Defaults to 'GET'.
   * @returns A Promise that resolves with the response data, or rejects with a HoyolabError if an error occurs.
   * @throws {HoyolabError} if an error occurs rejects with a HoyolabError
   */
  public async send(
    url: string,
    method: 'GET' | 'POST' = 'GET',
  ): Promise<IResponse> {
    if (this.ds) {
      this.headers.DS = generateDS()
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
}
