import md5 from 'md5'

/**
 * Generates a dynamic secret (DS) string for use in the Genshin Impact API.
 *
 * @returns The generated DS string.
 */
export function generateDS(): string {
  const salt = '6s25p5ox5y14umn1p61aqyyvbvvl3lrt'
  const date = new Date()
  const time = Math.floor(date.getTime() / 1000)

  let random = ''
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    const randomChar = characters.charAt(randomIndex)
    random += randomChar
  }

  const hash = md5(`salt=${salt}&t=${time}&r=${random}`, {
    encoding: 'hex',
  })

  return `${time},${random},${hash}`
}
