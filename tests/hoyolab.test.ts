import { GamesEnum, Hoyolab, LanguageEnum } from '../src'
import test from 'ava'
import * as dotenv from 'dotenv'

dotenv.config()

const hoyolab = () => {
  return new Hoyolab({
    cookie: {
      accountId: Number(process.env.ACCOUNT_ID),
      cookieToken: process.env.COOKIE_TOKEN,
      ltoken: process.env.LTOKEN ?? '',
      ltuid: Number(process.env.LTUID ?? ''),
    },
    lang: LanguageEnum.ENGLISH,
  })
}

test('Constructor should be valid', (t) => {
  const client = new Hoyolab({
    cookie: {
      ltoken: 'ltoken',
      ltuid: 6222,
      mi18nLang: 'id-id',
    },
  })

  t.is(client.lang, LanguageEnum.INDONESIAN)
  t.deepEqual(client.cookie, {
    ltoken: 'ltoken',
    ltuid: 6222,
    accountId: 6222,
    mi18nLang: 'id-id',
  })
})

test('gamesList should be return valid response', async (t) => {
  const client = hoyolab()

  const games = async () => {
    return await client.gamesList(GamesEnum.GENSHIN_IMPACT)
  }

  const result = await games()

  result.forEach((res) => {
    t.is(typeof res.game_biz, 'string')
    t.is(typeof res.game_uid, 'string')
    t.is(typeof res.is_chosen, 'boolean')
    t.is(typeof res.is_official, 'boolean')
    t.is(typeof res.level, 'number')
    t.is(typeof res.nickname, 'string')
    t.is(typeof res.region, 'string')
    t.is(typeof res.region_name, 'string')
  })
})

test('gameAccount should be return valid response', async (t) => {
  const client = hoyolab()

  const games = async () => {
    return await client.gameAccount(GamesEnum.GENSHIN_IMPACT)
  }

  const result = await games()

  t.is(typeof result.game_biz, 'string')
  t.is(typeof result.game_uid, 'string')
  t.is(typeof result.is_chosen, 'boolean')
  t.is(typeof result.is_official, 'boolean')
  t.is(typeof result.level, 'number')
  t.is(typeof result.nickname, 'string')
  t.is(typeof result.region, 'string')
  t.is(typeof result.region_name, 'string')
})
