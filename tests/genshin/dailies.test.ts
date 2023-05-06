import test from 'ava'
import { genshin } from './preloader'
import { HoyolabError } from '../../src'

test('daily.info() return should be valid', async (t) => {
  const client = await genshin()
  const res = await client.daily.info()

  t.is(typeof res.total_sign_day, 'number')
  t.is(typeof res.today, 'string')
  t.is(typeof res.is_sign, 'boolean')
  t.is(typeof res.first_bind, 'boolean')
  t.is(typeof res.is_sub, 'boolean')
  t.is(typeof res.region, 'string')
  t.is(typeof res.month_last_day, 'boolean')
})

test('daily.rewards() return should be valid', async (t) => {
  const client = await genshin()
  const res = await client.daily.rewards()

  t.is(typeof res.month, 'number')
  t.is(typeof res.resign, 'boolean')
  t.is(typeof res.now, 'string')

  res.awards.forEach((award) => {
    t.is(typeof award.icon, 'string')
    t.is(typeof award.name, 'string')
    t.is(typeof award.cnt, 'number')
  })
})

test('daily.reward() should throw error', async (t) => {
  await t.throwsAsync(
    async () => {
      const client = await genshin()
      await client.daily.reward(33)
    },
    {
      instanceOf: HoyolabError,
    },
  )
})

test('daily.reward() return should be valid', async (t) => {
  const client = await genshin()
  const res = await client.daily.reward()

  t.is(typeof res.month, 'number')
  t.is(typeof res.resign, 'boolean')
  t.is(typeof res.now, 'string')

  t.is(typeof res.award.icon, 'string')
  t.is(typeof res.award.name, 'string')
  t.is(typeof res.award.cnt, 'number')
})

test('daily.claim() return should be valid', async (t) => {
  const client = await genshin()
  const res = await client.daily.claim()

  t.is(typeof res.status, 'string')
  t.is(typeof res.code, 'number')

  if (res.reward) {
    t.is(typeof res.reward.month, 'number')
    t.is(typeof res.reward.resign, 'boolean')
    t.is(typeof res.reward.now, 'string')

    t.is(typeof res.reward.award.icon, 'string')
    t.is(typeof res.reward.award.name, 'string')
    t.is(typeof res.reward.award.cnt, 'number')
  }

  t.is(typeof res.info.total_sign_day, 'number')
  t.is(typeof res.info.today, 'string')
  t.is(typeof res.info.is_sign, 'boolean')
  t.is(typeof res.info.first_bind, 'boolean')
  t.is(typeof res.info.is_sub, 'boolean')
  t.is(typeof res.info.region, 'string')
  t.is(typeof res.info.month_last_day, 'boolean')
})
