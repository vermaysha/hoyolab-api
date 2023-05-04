import { Routes } from '../../routes'

export class DiaryRoute {
  private static baseUrl = Routes.hke()

  static list(): string {
    return `${this.baseUrl}/event/ysledgeros/month_info`
  }

  static detail(): string {
    return `${this.baseUrl}/event/ysledgeros/month_detail`
  }
}
