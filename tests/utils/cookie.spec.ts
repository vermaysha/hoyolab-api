import { HoyoError } from '../../src/HoyoError'
import { describe, it, expect } from '@jest/globals'
import { Cookie } from '../../src/Utils'

describe('Test Cookie Functionality', () => {
  it('parseToString return should be valid', () => {
    const cookie = Cookie.parseToString({
      ltoken: 'ltoken',
      ltuid: 'ltuid',
      cookieToken: 'cookieToken',
      mi18nLang: 'en',
    })

    expect(cookie).toBe(
      'ltoken=ltoken; ltuid=ltuid; cookie_token=cookieToken; mi18nLang=en; account_id=ltuid'
    )
  })

  it('parseToString return should be full', () => {
    const cookie = Cookie.parseToString({
      ltoken: 'ltoken',
      ltuid: 'ltuid',
      accountId: 'accountId',
      cookieToken: 'cookieToken',
    })

    expect(cookie).toBe(
      'ltoken=ltoken; ltuid=ltuid; account_id=accountId; cookie_token=cookieToken'
    )
  })

  it('parseFromString should be throw error when empty parameter', () => {
    expect(() => {
      Cookie.parseFromString('')
    }).toThrow(HoyoError)
  })

  it('parseFromString should be throw error when invalid cookie', () => {
    expect(() => {
      Cookie.parseFromString('invalid_cookie=foo; foo=bar')
    }).toThrow(HoyoError)
  })

  it('parseFromString return should be valid', () => {
    const cookieString = Cookie.parseFromString(
      'ltoken=ltoken; ltuid=ltuid; account_id=accountId; cookie_token=cookieToken; mi18nLang=en'
    )

    expect(cookieString).toStrictEqual({
      ltoken: 'ltoken',
      ltuid: 'ltuid',
      accountId: 'accountId',
      cookieToken: 'cookieToken',
      mi18nLang: 'en',
    })
  })

  it('parseFromString return should be valid when accountId undefined or null', () => {
    const cookieString = Cookie.parseFromString(
      'ltoken=ltoken; ltuid=ltuid; cookie_token=cookieToken'
    )

    expect(cookieString).toStrictEqual({
      accountId: 'ltuid',
      ltoken: 'ltoken',
      ltuid: 'ltuid',
      cookieToken: 'cookieToken',
    })
  })
})
