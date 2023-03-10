import { HoyoError } from './../HoyoError'
import axios, { AxiosRequestConfig } from 'axios'
import type { Response } from '../Interfaces/Request/Response'
import { Body, Headers, Params } from '../Interfaces/Request/Data'
import { DynamicSecurity } from './DynamicSecurity'

export class Request {
  private headers: Headers
  private params: Params = {}
  private body: Body = {}

  constructor(cookie: string) {
    this.headers = {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
      'x-rpc-app_version': '1.5.0',
      'x-rpc-client_type': 4,
      'x-rpc-language': 'en-us',
      Cookie: cookie,
    }
  }

  public setReferer(url: string): Request {
    const location = new URL(url)

    const referer = `${location.protocol}//${location.host}`
    this.headers['Origin'] = referer
    this.headers['Referer'] = referer
    return this
  }

  public setParams(params: Params): Request {
    this.params = { ...this.params, ...params }

    return this
  }

  public setBody(body: Body): Request {
    this.body = { ...this.body, ...body }

    return this
  }

  public withDS(status = true): Request {
    if (status) {
      this.headers['DS'] = DynamicSecurity.generate()
    } else {
      this.headers['DS'] = null
    }
    return this
  }

  public async send(
    url: string,
    method: 'get' | 'post' = 'get'
  ): Promise<Response> {
    const cleanUrl = url.replace(/([^:]\/)\/+/g, '$1')
    const config: AxiosRequestConfig = {
      url: cleanUrl,
      headers: this.headers,
      decompress: true,
      method: method.toLowerCase(),
    }

    if (method.toLowerCase() === 'get') {
      config['params'] = this.params ?? null
    } else {
      config['params'] = this.params ?? null
      config['data'] = this.body ?? null
    }

    const response = await axios(config)

    if (response.data?.retcode !== 0) {
      throw new HoyoError(
        `Failed to retrive data: [${response.data?.retcode}] - ${response.data?.message}`,
        response?.data
      )
    }

    // Reset Body & Params for next request
    this.body = {}
    this.params = {}

    return response.data
  }
}
