export interface Options {
  cookie: OptionCookie
}

export interface OptionCookie {
  ltoken: string
  ltuid: number
  cookieToken?: string | null
  accountId?: number | null
}
