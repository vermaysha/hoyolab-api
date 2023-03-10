import { HoyoError } from './../src/HoyoError'
import { Hoyolab } from '../src'
import { describe, it, expect } from '@jest/globals'

describe('Test HoyoError Exception', () => {
  it('API Should be throw HoyoError', async () => {
    const client = new Hoyolab({
      cookie: {
        ltoken: '',
        ltuid: Number(''),
      },
    })

    expect(async () => {
      await client.getGames()
    }).rejects.toThrow(HoyoError)
  })

  it('Should be throw HoyoError', () => {
    expect(() => {
      throw new HoyoError('Error')
    }).toThrow(HoyoError)

    const hoyoError = new HoyoError('Error', {
      message: 'Message',
      retcode: 0,
    })

    expect(hoyoError.message).toBe('Error')
    expect(hoyoError.retmessage).toBe('Message')
    expect(hoyoError.retcode).toBe(0)
  })
})
