import test from 'ava'
import { genshin, cookie } from './preloader'
import { DiaryMonthEnum, Genshin, HoyolabError } from '../../src'

test('diaries() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.diaries()

  t.is(typeof res.uid, 'number')
  t.is(typeof res.region, 'string')
  t.is(typeof res.nickname, 'string')
  t.is(typeof res.data_month, 'number')
  res.optional_month.forEach((month) => {
    t.is(typeof month, 'number')
  })
  t.is(typeof res.month, 'number')

  t.is(typeof res.month_data.current_primogems, 'number')
  t.is(typeof res.month_data.current_mora, 'number')
  t.is(typeof res.month_data.last_primogems, 'number')
  t.is(typeof res.month_data.last_mora, 'number')
  t.is(typeof res.month_data.primogem_rate, 'number')
  t.is(typeof res.month_data.mora_rate, 'number')

  res.month_data.group_by.forEach((group) => {
    t.is(typeof group.action_id, 'number')
    t.is(typeof group.action, 'string')
    t.is(typeof group.num, 'number')
    t.is(typeof group.percent, 'number')
  })

  t.is(typeof res.day_data.current_primogems, 'number')
  t.is(typeof res.day_data.current_mora, 'number')
})

test('diaryDetail() should throw when type is invalid', async (t) => {
  const client = await genshin()

  await t.throwsAsync(
    async () => {
      await client.diaries(4 as DiaryMonthEnum)
    },
    {
      instanceOf: HoyolabError,
    },
  )
})

test('diaries() should throw when UID is nullable', async (t) => {
  const client = new Genshin({ cookie })

  await t.throwsAsync(
    async () => {
      await client.diaries()
    },
    {
      instanceOf: HoyolabError,
    },
  )
})
