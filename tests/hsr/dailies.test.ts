import test from 'ava'
import { hsr } from './preloader'
import { HoyolabError } from '../../src'

test('dailyInfo() return should be valid', async (t) => {
  const client = await hsr()
  const res = await client.dailyInfo()

  t.is(typeof res.total_sign_day, 'number')
  t.is(typeof res.today, 'string')
  t.is(typeof res.is_sign, 'boolean')
  t.is(typeof res.is_sub, 'boolean')
  t.is(typeof res.region, 'string')
})

test('dailyRewards() return should be valid', async (t) => {
  const client = await hsr()
  const res = await client.dailyRewards()

  t.is(typeof res.month, 'number')
  t.is(typeof res.resign, 'boolean')
  t.is(typeof res.biz, 'string')

  res.awards.forEach((award) => {
    t.is(typeof award.icon, 'string')
    t.is(typeof award.name, 'string')
    t.is(typeof award.cnt, 'number')
  })
})

test('dailyReward() should throw error', async (t) => {
  await t.throwsAsync(
    async () => {
      const client = await hsr()
      await client.dailyReward(33)
    },
    {
      instanceOf: HoyolabError,
    },
  )
})

test('dailyReward() return should be valid', async (t) => {
  const client = await hsr()
  const res = await client.dailyReward()

  t.is(typeof res.month, 'number')
  t.is(typeof res.resign, 'boolean')
  t.is(typeof res.biz, 'string')

  t.is(typeof res.award.icon, 'string')
  t.is(typeof res.award.name, 'string')
  t.is(typeof res.award.cnt, 'number')
})

test('dailyClaim() return should be valid', async (t) => {
  const client = await hsr()
  const res = await client.dailyClaim()

  t.is(typeof res.status, 'string')
  t.is(typeof res.code, 'number')

  if (res.reward) {
    t.is(typeof res.reward.month, 'number')
    t.is(typeof res.reward.resign, 'boolean')
    t.is(typeof res.reward.biz, 'string')

    t.is(typeof res.reward.award.icon, 'string')
    t.is(typeof res.reward.award.name, 'string')
    t.is(typeof res.reward.award.cnt, 'number')
  }

  t.is(typeof res.info.total_sign_day, 'number')
  t.is(typeof res.info.today, 'string')
  t.is(typeof res.info.is_sign, 'boolean')
  t.is(typeof res.info.is_sub, 'boolean')
  t.is(typeof res.info.region, 'string')
})
