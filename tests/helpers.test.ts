import {
  HoyolabError,
  LanguageEnum,
  getServerRegion,
  parseLang,
  toCamelCase,
  toSnakeCase,
} from '../src'
import test from 'ava'

test('toCamelCase should return Camel Case string', (t) => {
  const res = toCamelCase('test_error')

  t.deepEqual(res, 'testError')
})

test('toSnakeCase should return snake_case string', (t) => {
  const res = toSnakeCase('testError')

  t.deepEqual(res, 'test_error')
})

test('getServerRegion should throw HoyolabError', (t) => {
  t.throws(
    () => {
      getServerRegion(128_983_343)
    },
    { instanceOf: HoyolabError },
  )
})

test('getServerRegion return should be valid', (t) => {
  t.deepEqual(getServerRegion(62_342_343), 'os_usa')
  t.deepEqual(getServerRegion(72_342_343), 'os_euro')
  t.deepEqual(getServerRegion(82_342_343), 'os_asia')
  t.deepEqual(getServerRegion(92_342_343), 'os_cht')
})

test('parseLang return should be Language.ENGLISH when parameter null', (t) => {
  t.deepEqual(parseLang(), LanguageEnum.ENGLISH)
})

test('parseLang return should be Language.ENGLISH when parameter is invalid', (t) => {
  t.deepEqual(parseLang('en'), LanguageEnum.ENGLISH)
})

test('parseLang return should be Language.ENGLISH when parameter is en-us', (t) => {
  t.deepEqual(parseLang('en-us'), LanguageEnum.ENGLISH)
})
