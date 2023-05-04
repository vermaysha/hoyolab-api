import { Routes } from '../../routes'

export class RecordRoute {
  private static baseUrl = `${Routes.bbs()}/game_record/genshin/api`

  static index() {
    return `${this.baseUrl}/index`
  }

  static character() {
    return `${this.baseUrl}/character`
  }

  static avatarBasicInfo() {
    return `${this.baseUrl}/avatarBasicInfo`
  }

  static spiralAbyss() {
    return `${this.baseUrl}/spiralAbyss`
  }

  static dailyNote() {
    return `${this.baseUrl}/dailyNote`
  }
}
