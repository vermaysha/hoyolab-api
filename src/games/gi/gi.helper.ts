import { HoyolabError } from '../../utils'
import { GenshinRegion } from './gi.enum'

/**
 * Get Server Region by UID
 *
 * @param uid number UID
 * @returns {string}
 */
export function getGenshinRegion(uid: number): GenshinRegion {
  const server_region = Number(uid.toString().trim().slice(0, 1))
  let key: string

  switch (server_region) {
    case 6:
      key = 'USA'
      break
    case 7:
      key = 'EUROPE'
      break
    case 8:
      key = 'ASIA'
      break
    case 9:
      key = 'CHINA_TAIWAN'
      break
    default:
      throw new HoyolabError(`Given UID ${uid} is invalid !`)
  }

  return GenshinRegion[key]
}