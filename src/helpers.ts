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
