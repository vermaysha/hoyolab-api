import { LanguageEnum } from '../language'

export interface ICookie {
  ltoken: string
  ltuid: number
  cookieToken?: string | null
  accountId?: number
  mi18nLang?: LanguageEnum | string | null
}
