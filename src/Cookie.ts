export class Cookie {
  private cookie: string
  public readonly ltoken: string
  public readonly ltuid: number
  public readonly cookie_token: string
  public readonly account_id: string
  public readonly lang: string | null

  constructor(cookie: string) {
    this.cookie = cookie
    this.ltuid = Number.parseInt(this.getValue('ltuid') ?? '0')
    this.ltoken = this.getValue('ltoken') ?? ''
    this.cookie_token = this.getValue('cookie_token') ?? ''
    this.account_id = this.getValue('account_id') ?? ''
    this.lang = this.getValue('mi18nLang', false)
  }

  /**
   * Get hoyolab cookie
   *
   * @returns string
   */
  public getCookie(): string {
    return (
      `ltoken=${this.ltoken}; ltuid=${this.ltuid}; cookie_token=${this.cookie_token}; account_id=${this.account_id}` +
      (this.lang != null ? `; mi18nLang=${this.lang}` : ``)
    )
  }

  /**
   * Overide toString
   *
   * @returns string
   */
  public toString(): string {
    return this.getCookie()
  }

  /**
   * Get cookie value
   *
   * @param key string
   * @param required boolean
   * @returns string
   */
  private getValue(key: string, required?: boolean): string | null {
    required = required == null ? true : required
    const regex = new RegExp(`${key}=([^;]+)`, 'im')
    const cookies = this.cookie.match(regex)

    if (required && cookies == null) {
      throw new Error(`Cookie: ${key} not exist, please retry ..`)
    }

    return cookies ? cookies[1] : null
  }
}
