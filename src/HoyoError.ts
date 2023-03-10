/**
 *
 * @category Error Handling
 * */
export class HoyoError extends Error {
  /**
   * Return message from current request
   */
  readonly retmessage: string | null

  /**
   * Return code from current request
   */
  readonly retcode: number | null

  /**
   * Error Message
   */
  readonly message: string

  constructor(
    message: string,
    response?: {
      retcode: number
      message: string
    }
  ) {
    super(message)
    this.message = message
    this.retcode = response?.retcode ?? null
    this.retmessage = response?.message ?? null

    Object.setPrototypeOf(this, HoyoError.prototype)
  }
}
