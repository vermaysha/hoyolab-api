import { Region } from '../Types'

export interface Options {
  cookie: OptionCookie
}

export interface OptionCookie {
  ltoken: string
  ltuid: number
  cookieToken?: string | null
  accountId?: number | null
}

export interface GenshinOption {
  uid: string | number
  region?: Region
}
