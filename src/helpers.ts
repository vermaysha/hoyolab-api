import { HoyolabError } from './HoyolabError'
import { LanguageEnum } from './Interfaces'

/**
 * Convert given string to camelCase
 *
 * @param str string The string or text to convert
 * @returns {string}
 */
export function toCamelCase(str: string): string {
  const words = str.split('_')
  const camelCaseWords = words.map((word, index) => {
    return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
  })
  return camelCaseWords.join('')
}

/**
 * Transform camel case to snake case
 *
 * @param text string The string or text to convert
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
 * @param uid number Genshin UID
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

/**
 * Parse string to LanguageEnum
 *
 * @param lang string | null
 * @returns {LanguageEnum}
 */
export function parseLang(lang?: string | null): LanguageEnum {
  if (!lang) {
    return LanguageEnum.ENGLISH
  }

  const langKeys = Object.keys(LanguageEnum)
  const matchingKey = langKeys.find((key) => LanguageEnum[key] === lang)

  return matchingKey ? LanguageEnum[matchingKey] : LanguageEnum.ENGLISH
}
