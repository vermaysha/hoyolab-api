export class HoyolabError extends Error {
  public readonly name: string
  public readonly message: string

  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    this.message = message

    Error.captureStackTrace(this, this.constructor)
  }
}
