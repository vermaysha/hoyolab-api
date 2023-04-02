import { ICookie } from '../ICookie'
import { LanguageEnum } from '../LanguageEnum'

export interface IHoyolabOptions {
  /**
   * Cookie Object
   */
  cookie: ICookie | string

  /**
   * If this property is filled, it will override the value contained in cookie.mi18nLang
   */
  lang?: LanguageEnum
}
