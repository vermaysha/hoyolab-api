import { describe, it, expect } from '@jest/globals'
import { Request } from '../src/Utils'
import axios from 'axios'
import { HoyoError } from '../src'

jest.mock('axios', () => jest.fn())

describe('Request Test', () => {
  it('Params should be instance of Request', () => {
    const request = new Request('')

    expect(request.setReferer('http://localhost.dev')).toBeInstanceOf(Request)
  })

  it('Referer should be instance of Request', () => {
    const request = new Request('')
    expect(request.setBody({})).toBeInstanceOf(Request)
  })

  it('DS should be instance of Request', () => {
    const request = new Request('')
    expect(request.withDS()).toBeInstanceOf(Request)
    expect(request.withDS(false)).toBeInstanceOf(Request)
  })

  it('Get Request should be return valid response', async () => {
    const request = new Request('')
    ;(axios as unknown as jest.Mock).mockResolvedValueOnce({
      data: {
        retcode: 0,
        message: 'success',
      },
    })

    request.setParams({ q: 'q' })

    expect(await request.send('http://localhost.dev')).toEqual({
      retcode: 0,
      message: 'success',
    })
  })

  it('Post Request should be return valid response', async () => {
    const request = new Request('')
    ;(axios as unknown as jest.Mock).mockResolvedValueOnce({
      data: {
        retcode: 0,
        message: 'success',
      },
    })

    request.setParams({ q: 'q' })
    request.setBody({ body: 'body' })

    expect(await request.send('http://localhost.dev', 'post')).toEqual({
      retcode: 0,
      message: 'success',
    })
  })

  it('Request should be return invalid response', async () => {
    const request = new Request('')
    ;(axios as unknown as jest.Mock).mockResolvedValueOnce({
      data: {
        retcode: 1,
        message: 'success',
      },
    })

    await expect(async () => {
      await request.send('http://localhost.dev', 'post')
    }).rejects.toThrow(HoyoError)
  })

  it('Request should be return error if retcode === -100', async () => {
    const request = new Request('')
    ;(axios as unknown as jest.Mock).mockResolvedValueOnce({
      data: {
        retcode: -100,
        message: 'error',
      },
    })

    await expect(async () => {
      await request.send('http://localhost.dev', 'post')
    }).rejects.toThrow(HoyoError)
  })
})
