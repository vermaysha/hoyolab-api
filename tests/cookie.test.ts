import test from 'ava'
import { Cookie, HoyolabError } from '../src'

test('parseCookie return should be valid', (t) => {
  const cookie = Cookie.parseCookie({
    ltoken: 'ltoken',
    ltuid: 1,
    cookieToken: 'cookieToken',
    mi18nLang: 'id-id',
  })

  t.deepEqual(
    cookie,
    'ltoken=ltoken; ltuid=1; cookie_token=cookieToken; mi18nLang=id-id; account_id=1',
  )
})

test('parseCookieString return should be valid', (t) => {
  const cookieString = Cookie.parseCookieString(
    'ltoken=ltoken; ltuid=1; cookie_token=cookieToken; mi18nLang=id-id; account_id=1',
  )

  t.deepEqual(cookieString, {
    ltoken: 'ltoken',
    ltuid: 1,
    cookieToken: 'cookieToken',
    mi18nLang: 'id-id',
    accountId: 1,
  })
})

test('parseCookieString return should be valid when account_id is null', (t) => {
  const cookieString = Cookie.parseCookieString(
    'ltoken=ltoken; ltuid=1; cookie_token=cookieToken; mi18nLang=id-id',
  )

  t.deepEqual(cookieString, {
    ltoken: 'ltoken',
    ltuid: 1,
    cookieToken: 'cookieToken',
    mi18nLang: 'id-id',
    accountId: 1,
  })
})

test('parseCookieString return should be valid when ltuid is null', (t) => {
  const cookieString = Cookie.parseCookieString(
    'ltoken=ltoken; account_id=1; cookie_token=cookieToken; mi18nLang=id-id',
  )

  t.deepEqual(cookieString, {
    ltoken: 'ltoken',
    ltuid: 1,
    cookieToken: 'cookieToken',
    mi18nLang: 'id-id',
    accountId: 1,
  })
})

test('parseCookieString return should be throw errors', (t) => {
  t.throws(
    () => {
      Cookie.parseCookieString('mi18nLang=id-id')
    },
    {
      instanceOf: HoyolabError,
    },
  )
})
