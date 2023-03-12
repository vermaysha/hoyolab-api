/**
 * Transform camel case to snake case
 *
 * @param text string
 */
export function camel2Snake(text: string): string {
  return text
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .join('_')
    .toLowerCase()
}
