import { Region } from '../Types'
import { ICookie } from './Cookie'

export interface Options {
  cookie: ICookie
}

export interface GenshinOption {
  uid: string | number
  region?: Region
}
