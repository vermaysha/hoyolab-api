import test from 'ava'
import { cookie, genshin } from './preloader'
import {
  DiaryEnum,
  DiaryMonthEnum,
  GenshinImpact,
  HoyolabError,
} from '../../src'

test('diary.detail() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.diary.detail(DiaryEnum.PRIMOGEMS)

  t.is(typeof res.uid, 'number')
  t.is(typeof res.region, 'string')
  t.is(typeof res.nickname, 'string')
  t.is(typeof res.data_month, 'number')
  t.is(typeof res.current_page, 'number')

  res.optional_month.forEach((month) => {
    t.is(typeof month, 'number')
  })

  res.list.forEach((list) => {
    t.is(typeof list.action_id, 'number')
    t.is(typeof list.action, 'string')
    t.is(typeof list.time, 'string')
    t.is(typeof list.num, 'number')

    t.deepEqual(
      Object.keys(list).sort(),
      ['action_id', 'action', 'time', 'num'].sort(),
    )
  })

  t.deepEqual(
    Object.keys(res).sort(),
    [
      'uid',
      'region',
      'nickname',
      'data_month',
      'current_page',
      'list',
      'optional_month',
    ].sort(),
  )
})

test('diary.detail() should throw when type is invalid', async (t) => {
  const client = await genshin()

  await t.throwsAsync(
    async () => {
      await client.diary.detail(5 as DiaryEnum)
    },
    {
      instanceOf: HoyolabError,
    },
  )
})

test('diary.detail() should throw month type is invalid', async (t) => {
  const client = await genshin()

  await t.throwsAsync(
    async () => {
      await client.diary.detail(DiaryEnum.PRIMOGEMS, 10 as DiaryMonthEnum)
    },
    {
      instanceOf: HoyolabError,
    },
  )
})

test('diary.detail() should throw when UID is nullable', async (t) => {
  const client = new GenshinImpact({ cookie })

  await t.throwsAsync(
    async () => {
      await client.diary.detail(DiaryEnum.MORA)
    },
    {
      instanceOf: HoyolabError,
    },
  )
})
