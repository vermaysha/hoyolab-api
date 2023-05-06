import { Routes } from '../../routes'

/**
 * Class representing routes for Genshin diaries.
 */
export class DiaryRoute {
  /**
   * The base URL for the routes.
   */
  private static baseUrl = Routes.hke()

  /**
   * Returns the URL for the diary list.
   * @returns {string} The URL for the diary list.
   */
  static list(): string {
    return `${this.baseUrl}/event/ysledgeros/month_info`
  }

  /**
   * Returns the URL for the diary detail.
   * @returns {string} The URL for the diary detail.
   */
  static detail(): string {
    return `${this.baseUrl}/event/ysledgeros/month_detail`
  }
}
