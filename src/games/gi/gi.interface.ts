import { IHoyolabOptions } from '../hoyolab'
import { GenshinRegion } from './gi.enum'

export interface IGenshinOptions extends IHoyolabOptions {
  uid?: number
  region?: GenshinRegion
}
