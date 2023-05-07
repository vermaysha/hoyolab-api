import { IHoyolabOptions } from '../hoyolab'
import { HonkaiRegion } from './hi.enum'

/**
 * Interface representing the options for the Honkai Impact API.
 * Inherits from `IHoyolabOptions`.
 *
 * @interface
 */
export interface IHi3Options extends IHoyolabOptions {
  /**
   * The UID of the Honkai Impact player.
   */
  uid?: number
  /**
   * The region of the Honkai Impact player.
   */
  region?: HonkaiRegion
}
