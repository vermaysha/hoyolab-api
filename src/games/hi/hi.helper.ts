import { HoyolabError } from '../../utils'
import { HonkaiRegion } from './hi.enum'

/**
 * Gets the Honkai region from a given UID.
 * @function
 * @param {number} uid - The UID to get the Honkai region for.
 * @returns {HonkaiRegion} - The Honkai region for the given UID.
 * @throws {HoyolabError} - If the UID is invalid.
 */
export function getHi3Region(uid: number): HonkaiRegion {
  let key: string

  if (uid > 10_000_000 && uid < 100_000_000) {
    key = 'ASIA'
  } else if (uid > 100_000_000 && uid < 200_000_000) {
    key = 'USA'
  } else if (uid > 200_000_000 && uid < 300_000_000) {
    key = 'EURO'
  } else {
    throw new HoyolabError(`Given UID ${uid} is invalid !`)
  }

  return HonkaiRegion[key]
}
