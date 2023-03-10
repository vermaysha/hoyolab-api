/**
 *
 * @category Error Handling
 * */
export class HoyoError extends Error {
  readonly retmessage: string | null
  readonly retcode: number | null
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
