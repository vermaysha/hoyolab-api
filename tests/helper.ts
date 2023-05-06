export function flattenObjectKeys(obj: any, prefix = ''): string[] {
  return Object.entries(obj).reduce((acc: any, [key, value]) => {
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'object') {
        acc.push(...flattenObjectKeys(value[0], `${prefix}${key}.`))
      } else {
        acc.push(`${prefix}${key}`)
      }
    } else if (typeof value === 'object' && value !== null) {
      acc.push(...flattenObjectKeys(value, `${prefix}${key}.`))
    } else {
      acc.push(`${prefix}${key}`)
    }
    return acc
  }, [])
}
