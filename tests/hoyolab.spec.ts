import { HoyoError, Hoyolab } from '../src'
import { describe, it, expect } from '@jest/globals'

describe('HoYoLab API Test', () => {
  const client = new Hoyolab({
    cookie: {
      accountId: Number(process.env.ACCOUNT_ID),
      cookieToken: process.env.COOKIE_TOKEN,
      ltoken: process.env.LTOKEN ?? '',
      ltuid: Number(process.env.LTUID ?? ''),
    },
  })

  it('Should be return HoYoLab account games response', async () => {
    const games = await client.getGames()
    expect(games).toHaveProperty('list')

    games.list.forEach((game) => {
      expect(game).toHaveProperty('game_biz')
      expect(game).toHaveProperty('region')
      expect(game).toHaveProperty('game_uid')
      expect(game).toHaveProperty('nickname')
      expect(game).toHaveProperty('level')
      expect(game).toHaveProperty('is_chosen')
      expect(game).toHaveProperty('region_name')
      expect(game).toHaveProperty('is_official')
    })
  })

  it('Should be return HoYoLab game records response', async () => {
    const records = await client.getRecords()
    expect(records).toHaveProperty('list')

    records.list.forEach((record) => {
      expect(record).toHaveProperty('has_role')
      expect(record).toHaveProperty('game_id')
      expect(record).toHaveProperty('game_role_id')
      expect(record).toHaveProperty('nickname')
      expect(record).toHaveProperty('region')
      expect(record).toHaveProperty('level')
      expect(record).toHaveProperty('background_image')
      expect(record).toHaveProperty('is_public')
      expect(record).toHaveProperty('data')
      expect(record).toHaveProperty('region_name')
      expect(record).toHaveProperty('url')

      record.data.forEach((val) => {
        expect(val).toHaveProperty('name')
        expect(val).toHaveProperty('type')
        expect(val).toHaveProperty('value')
      })
    })
  })

  it('getRecords() should be throw HoyoError', async () => {
    expect(async () => {
      await new Hoyolab({
        cookie: {
          ltoken: 'ltoken',
          ltuid: 0,
        },
      }).getRecords()
    }).rejects.toThrow(HoyoError)
  })
})
