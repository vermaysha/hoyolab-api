import test from 'ava'
import { cookie, genshin } from './preloader'
import { DiaryEnum, DiaryMonthEnum, Genshin, HoyolabError } from '../../src'

test('diaryDetail() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.diaryDetail(DiaryEnum.PRIMOGEMS)

  t.is(typeof res.uid, 'number')
  t.is(typeof res.region, 'string')
  t.is(typeof res.nickname, 'string')
  t.is(typeof res.data_month, 'number')
  t.is(typeof res.current_page, 'number')

  res.list.forEach((list) => {
    t.is(typeof list.action_id, 'number')
    t.is(typeof list.action, 'string')
    t.is(typeof list.time, 'string')
    t.is(typeof list.num, 'number')
  })
})

test('diaryDetail() should throw when type is invalid', async (t) => {
  const client = await genshin()

  await t.throwsAsync(
    async () => {
      await client.diaryDetail(5 as DiaryEnum)
    },
    {
      instanceOf: HoyolabError,
    },
  )
})

test('diaryDetail() should throw month type is invalid', async (t) => {
  const client = await genshin()

  await t.throwsAsync(
    async () => {
      await client.diaryDetail(DiaryEnum.PRIMOGEMS, 10 as DiaryMonthEnum)
    },
    {
      instanceOf: HoyolabError,
    },
  )
})

test('diaryDetail() should throw when UID is nullable', async (t) => {
  const client = new Genshin({ cookie })

  await t.throwsAsync(
    async () => {
      await client.diaryDetail(DiaryEnum.MORA)
    },
    {
      instanceOf: HoyolabError,
    },
  )
})
