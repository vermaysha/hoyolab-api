export class HoyoError extends Error {
  readonly retmessage: string | null
  readonly retcode: number | null

  constructor(
    message: string,
    response?: {
      retcode: number
      message: string
    }
  ) {
    super(message)
    this.retcode = response?.retcode ?? null
    this.retmessage = response?.message ?? null

    Object.setPrototypeOf(this, HoyoError.prototype)
  }
}
