import { Response } from './Interfaces/Request'

export class HoyoError extends Error {
  readonly retmessage: string
  readonly retcode: number

  constructor(message: string, response: Response) {
    super(message)
    this.retcode = response.retcode
    this.retmessage = response.message

    Object.setPrototypeOf(this, HoyoError.prototype)
  }
}
