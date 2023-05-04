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
