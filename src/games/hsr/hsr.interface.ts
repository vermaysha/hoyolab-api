import { IHoyolabOptions } from '../hoyolab'
import { HsrRegion } from './hsr.enum'

export interface IHsrOptions extends IHoyolabOptions {
  uid?: number
  region?: HsrRegion
}
