export class Cookie {
  private cookie: string
  public ltoken: string | null
  public ltuid: string | null
  public cookie_token: string | null
  public account_id: string | null
  public lang: string | null

  constructor(cookie: string) {
    this.cookie = cookie
    this.ltuid = this.getValue('ltuid')
    this.ltoken = this.getValue('ltoken')
    this.cookie_token = this.getValue('cookie_token')
    this.account_id = this.getValue('account_id')
    this.lang = this.getValue('mi18nLang')
  }

  /**
   * Check cookie
   *
   * @returns boolean
   */
  public isValid(): boolean {
    return (
      this.ltuid !== null &&
      this.ltoken !== null &&
      this.account_id !== null &&
      this.cookie_token !== null
    )
  }

  /**
   * Get hoyolab cookie
   *
   * @returns string
   */
  public getCookie(): string {
    if (this.isValid() === false) {
      throw new Error(`Cookie not valid`)
    }

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
   * @returns string
   */
  private getValue(key: string): string | null {
    const regex = new RegExp(`${key}=([^;]+)`, 'im')
    const cookies = this.cookie.match(regex)

    return cookies ? cookies[1] : null
  }
}
