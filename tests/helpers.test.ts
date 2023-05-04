import {
  GenshinRegion,
  HoyolabError,
  HsrRegion,
  Language,
  LanguageEnum,
  getGenshinRegion,
  getHsrRegion,
} from '../src'
import test from 'ava'
import { toCamelCase, toSnakeCase } from '../src/cookie/cookie.helper'

test('toCamelCase should return Camel Case string', (t) => {
  const res = toCamelCase('test_error')

  t.deepEqual(res, 'testError')
})

test('toSnakeCase should return snake_case string', (t) => {
  const res = toSnakeCase('testError')

  t.deepEqual(res, 'test_error')
})

test('getGenshinRegion should throw HoyolabError', (t) => {
  t.throws(
    () => {
      getGenshinRegion(128_983_343)
    },
    { instanceOf: HoyolabError },
  )
})

test('getGenshinRegion return should be valid', (t) => {
  t.deepEqual(getGenshinRegion(62_342_343), GenshinRegion.USA)
  t.deepEqual(getGenshinRegion(72_342_343), GenshinRegion.EUROPE)
  t.deepEqual(getGenshinRegion(82_342_343), GenshinRegion.ASIA)
  t.deepEqual(getGenshinRegion(92_342_343), GenshinRegion.CHINA_TAIWAN)
})

test('getHsrRegion should throw HoyolabError', (t) => {
  t.throws(
    () => {
      getHsrRegion(128_983_343)
    },
    { instanceOf: HoyolabError },
  )
})

test('getHsrRegion return should be valid', (t) => {
  t.deepEqual(getHsrRegion(62_342_343), HsrRegion.USA)
  t.deepEqual(getHsrRegion(72_342_343), HsrRegion.EUROPE)
  t.deepEqual(getHsrRegion(82_342_343), HsrRegion.ASIA)
  t.deepEqual(getHsrRegion(92_342_343), HsrRegion.CHINA_TAIWAN)
})

test('parseLang return should be Language.ENGLISH when parameter null', (t) => {
  t.deepEqual(Language.parseLang(), LanguageEnum.ENGLISH)
})

test('parseLang return should be Language.ENGLISH when parameter is invalid', (t) => {
  t.deepEqual(Language.parseLang('en'), LanguageEnum.ENGLISH)
})

test('parseLang return should be Language.ENGLISH when parameter is en-us', (t) => {
  t.deepEqual(Language.parseLang('en-us'), LanguageEnum.ENGLISH)
})
