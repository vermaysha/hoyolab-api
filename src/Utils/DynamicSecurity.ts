import md5 from 'md5'

/**
 * Generate Digital Signature/Dynamic Security.
 *
 * Used to bypass the security of the Hoyoverse API
 *
 * @category Private
 * @internal
 */
export class DynamicSecurity {
  /**
   * Cypher Salt
   */
  static SALT = '6cqshh5dhw73bzxn20oexa9k516chk7s'

  /**
   * Generate Digital Signature for API Requst
   *
   * @returns string - Generated DS
   */
  static generate(): string {
    const date = new Date()
    const t = Math.floor(date.getTime() / 1000)

    let r = ''
    const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < 6; i++) {
      r += char.charAt(Math.floor(Math.random() * char.length))
    }

    const h = md5(`salt=${this.SALT}&t=${t}&r=${r}`, {
      encoding: 'string',
    })

    return `${t},${r},${h}`
  }
}
