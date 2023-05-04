import { ICookie } from '../../cookie'
import { LanguageEnum } from '../../language'

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

export interface IGame {
  game_biz: string
  region: string
  game_uid: string
  nickname: string
  level: number
  is_chosen: boolean
  region_name: string
  is_official: boolean
}

export interface IGamesList {
  list: IGame[]
}
