import { HoyolabError } from './HoyolabError'

/**
 * Convert given string to camelCase
 *
 * @param str {string} The string or text to convert
 * @returns {string}
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+|[-_]/g, '')
}

/**
 * Transform camel case to snake case
 *
 * @param text {string} The string or text to convert
 * @returns {string}
 */
export function toSnakeCase(text: string): string {
  return text
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .join('_')
    .toLowerCase()
}

/**
 * Get Server Region by UID
 *
 * @param uid {number} Genshin UID
 * @returns {string}
 */
export function genshinRegion(uid: number): string {
  const server_region = Number(uid.toString().trim().slice(0, 1))

  switch (server_region) {
    case 6:
      return 'os_usa'
    case 7:
      return 'os_euro'
    case 8:
      return 'os_asia'
    case 9:
      return 'os_cht'
    default:
      throw new HoyolabError(`Given UID ${uid} is invalid !`)
  }
}