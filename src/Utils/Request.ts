import { HoyoError } from './../HoyoError'
import axios, { AxiosRequestConfig } from 'axios'
import type { Body, Headers, Params, Response } from '../Interfaces'
import { Utils } from '..'

/**
 * Request Class for making request to HoYoLab API.
 *
 * There are several additions such as headers, cookies, User Agent and also DS.
 *
 * @category Private
 * @internal
 */
export class Request {
  /**
   * Headers List
   */
  private headers: Headers

  /**
   * Parameter (Query Param) List
   */
  private params: Params = {}

  /**
   * Body data list
   */
  private body: Body = {}

  constructor(cookie: string) {
    this.headers = {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
      'x-rpc-app_version': '1.5.0',
      'x-rpc-client_type': 5,
      'x-rpc-language': 'en-us',
      Cookie: cookie,
    }
  }

  /**
   * Set Referer for current request
   *
   * @param url string - Referer Host with http or https prefix
   */
  public setReferer(url: string): Request {
    const location = new URL(url)

    const referer = `${location.protocol}//${location.host}`
    this.headers['Origin'] = referer
    this.headers['Referer'] = referer
    return this
  }

  /**
   * Set Query Parameter.
   * Will be sent using either the GET or POST method.
   *
   * @param params Params - Query paramater for current request
   */
  public setParams(params: Params): Request {
    this.params = { ...this.params, ...params }

    return this
  }

  /**
   * Set Body Parameter.
   *
   * Will be sent if using the POST method, otherwise it will be ignored.
   *
   * @param body Body - Body parameter for current request
   */
  public setBody(body: Body): Request {
    this.body = { ...this.body, ...body }

    return this
  }

  /**
   * Added DS headers on current request.
   *
   * Not all requests will ask for DS headers, only some will.
   *
   * @param status Boolean
   */
  public withDS(status = true): Request {
    if (status) {
      this.headers['DS'] = Utils.DynamicSecurity.generate()
    } else {
      this.headers['DS'] = null
    }
    return this
  }

  /**
   * Send request and reset query params and body for next request
   *
   * @param url string - API Endpoint located at GameRoutes
   * @param method get | post - HTTP Method
   * @throws {@link HoyoError} - If the request error caused by this library
   * @throws {@link [AxiosError](https://github.com/axios/axios/blob/v1.x/lib/core/AxiosError.js)} - If the error is caused by the server
   */
  public async send(
    url: string,
    method: 'get' | 'post' = 'get',
    _retries = 1
  ): Promise<Response> {
    const cleanUrl = url.replace(/([^:]\/)\/+/g, '$1')
    const config: AxiosRequestConfig = {
      url: cleanUrl,
      headers: this.headers,
      method: method.toLowerCase(),
    }

    if (method.toLowerCase() === 'get') {
      config['params'] = this.params
    } else {
      config['params'] = this.params
      config['data'] = this.body
    }

    const response = await axios(config)

    /* c8 ignore start */
    const maxRetries = 60
    if (response.status === 429 && _retries <= maxRetries) {
      await Utils.delay(0.5)
      return this.send(url, method, _retries++)
    }

    if (response.data.retcode === -2016 && _retries <= maxRetries) {
      await Utils.delay(0.5)
      return this.send(url, method, _retries++)
    }
    /* c8 ignore stop */

    if (response.data?.retcode === -100) {
      throw new HoyoError(
        'Unable to authenticate user, make sure the cookie provided is correct!',
        response.data
      )
    }

    const allowedRetCode = [0, -5003, -2020, -2017]
    if (allowedRetCode.includes(response.data?.retcode) === false) {
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
