import { IHoyolabOptions } from '../hoyolab'
import { GenshinRegion } from './gi.enum'

/**
 * Interface representing the options for the Genshin Impact API.
 * Inherits from `IHoyolabOptions`.
 *
 * @interface
 */
export interface IGenshinOptions extends IHoyolabOptions {
  /**
   * The UID of the Genshin Impact player.
   */
  uid?: number
  /**
   * The region of the Genshin Impact player.
   */
  region?: GenshinRegion
}
