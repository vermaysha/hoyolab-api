import test from 'ava'
import { hsr } from './preloader'
import { HoyolabError } from '../../src'
import { flattenObjectKeys } from '../helper'

test('daily.info() return should be valid', async (t) => {
  const client = await hsr()
  const res = await client.daily.info()

  t.is(typeof res.total_sign_day, 'number')
  t.is(typeof res.today, 'string')
  t.is(typeof res.is_sign, 'boolean')
  t.is(typeof res.is_sub, 'boolean')
  t.is(typeof res.region, 'string')
  t.is(typeof res.short_sign_day, 'number')
  t.is(typeof res.sign_cnt_missed, 'number')

  t.deepEqual(
    Object.keys(res).sort(),
    [
      'total_sign_day',
      'today',
      'is_sign',
      'first_bind',
      'is_sub',
      'region',
      'month_last_day',
      'short_sign_day',
      'sign_cnt_missed',
    ].sort(),
  )
})

test('daily.rewards() return should be valid', async (t) => {
  const client = await hsr()
  const res = await client.daily.rewards()

  t.is(typeof res.month, 'number')
  t.is(typeof res.resign, 'boolean')
  t.is(typeof res.biz, 'string')

  res.awards.forEach((award) => {
    t.is(typeof award.icon, 'string')
    t.is(typeof award.name, 'string')
    t.is(typeof award.cnt, 'number')
  })

  t.deepEqual(
    flattenObjectKeys(res).sort(),
    [
      'month',
      'resign',
      'now',
      'biz',
      'awards.icon',
      'awards.name',
      'awards.cnt',
      'short_extra_award.end_time',
      'short_extra_award.end_timestamp',
      'short_extra_award.has_extra_award',
      'short_extra_award.list',
      'short_extra_award.start_time',
      'short_extra_award.start_timestamp',
    ].sort(),
  )
})

test('daily.reward() should throw error', async (t) => {
  await t.throwsAsync(
    async () => {
      const client = await hsr()
      await client.daily.reward(33)
    },
    {
      instanceOf: HoyolabError,
    },
  )
})

test('daily.reward() return should be valid', async (t) => {
  const client = await hsr()
  const res = await client.daily.reward()

  t.is(typeof res.month, 'number')
  t.is(typeof res.resign, 'boolean')
  t.is(typeof res.biz, 'string')

  t.is(typeof res.award.icon, 'string')
  t.is(typeof res.award.name, 'string')
  t.is(typeof res.award.cnt, 'number')

  t.deepEqual(
    flattenObjectKeys(res).sort(),
    [
      'month',
      'resign',
      'now',
      'biz',
      'award.icon',
      'award.name',
      'award.cnt',
    ].sort(),
  )
})

test('daily.claim() return should be valid', async (t) => {
  const client = await hsr()
  const res = await client.daily.claim()

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

  t.deepEqual(
    flattenObjectKeys(res).sort(),
    [
      'code',
      'info.first_bind',
      'info.is_sign',
      'info.is_sub',
      'info.month_last_day',
      'info.region',
      'info.short_sign_day',
      'info.sign_cnt_missed',
      'info.today',
      'info.total_sign_day',
      'reward.award.cnt',
      'reward.award.icon',
      'reward.award.name',
      'reward.biz',
      'reward.month',
      'reward.now',
      'reward.resign',
      'status',
    ].sort(),
  )
})
