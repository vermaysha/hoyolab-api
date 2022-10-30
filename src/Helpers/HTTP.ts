/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import md5 from 'md5'

type Options = {
  cookie: string
  userAgent?: string
  params?: object
  body?: object
  withDs?: boolean
}

interface Response {
  retcode: number
  message: string
  data: any
}

/**
 * Internal HTTP Request Wrapper
 * Include Hoyolab Cookie and HoYoLab DS
 */
export class HTTP {
  /**
   * SALT for DS (Dynamic Security) Generation
   * It's only for Oversea server
   *
   * @param string
   */
  private SALT = '6cqshh5dhw73bzxn20oexa9k516chk7s'

  /**
   * Default User Agent for request
   * Using Windows 10 with chrome as default user agent
   *
   * @param string
   */
  private DEFAULT_UA =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'

  /**
   * Send POST request
   *
   * @param url string
   * @param options Options
   * @returns Promise<AxiosResponse<any, any>>
   */
  public async post(url: string, options: Options): Promise<Response> {
    return await this.request(url, 'post', options)
  }

  /**
   * Send GET request
   *
   * @param url string
   * @param options Options
   * @returns Promise<AxiosResponse<any, any>>
   */
  public async get(url: string, options: Options): Promise<Response> {
    return await this.request(url, 'get', options)
  }

  /**
   * Send HTTP Request
   *
   * @param url string
   * @param method 'post'| 'get'
   * @param options Options
   * @returns Promise<Response>
   */
  private async request(
    url: string,
    method: 'post' | 'get',
    options: Options,
  ): Promise<Response> {
    const params = options.params ?? ''
    const body = options.body ?? ''
    const headers = this.generateHeaders(
      options.cookie,
      options.withDs ?? false,
    )

    try {
      const { data } = await axios(url, {
        method,
        data: body,
        headers,
        params,
      })
      return data
    } catch (error) {
      throw new Error(error as any)
    }
  }

  /**
   *
   * @param cookie String
   * @param withDs Boolean
   * @returns object
   */
  private generateHeaders(
    cookie: string,
    withDs: boolean,
    userAgent?: string,
  ): object {
    return {
      Cookie: cookie,
      'x-rpc-app_version': '1.5.0',
      'x-rpc-client_type': '4',
      'x-rpc-language': 'en-us',
      DS: withDs ? this.generateDs() : '',
      'User-Agent': userAgent ?? this.DEFAULT_UA,
    }
  }

  /**
   * Generate Dynamic Security String
   *
   * @returns string
   */
  private generateDs(): string {
    const date = new Date()
    const t = Math.floor(date.getTime() / 1000)
    let r = ''
    const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < 6; i++) {
      r += char.charAt(Math.floor(Math.random() * char.length))
    }
    const h = md5(`salt=${this.SALT}&t=${t}&r=${r}`, {
      encoding: 'string',
    })
    return `${t},${r},${h}`
  }
}
