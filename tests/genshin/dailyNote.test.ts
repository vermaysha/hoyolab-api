import test from 'ava'
import { genshin, cookie } from './preloader'
import { Genshin, HoyolabError } from '../../src'

test('dailyNote() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.dailyNote()

  res.expeditions.forEach((expe) => {
    t.is(typeof expe.avatar_side_icon, 'string')
    t.is(typeof expe.status, 'string')
    t.is(typeof expe.remained_time, 'string')

    t.regex(expe.status, /Finished|Ongoing/)
  })

  t.is(typeof res.current_resin, 'number')
  t.is(typeof res.max_resin, 'number')
  t.is(typeof res.resin_recovery_time, 'string')
  t.is(typeof res.finished_task_num, 'number')
  t.is(typeof res.total_task_num, 'number')
  t.is(typeof res.is_extra_task_reward_received, 'boolean')
  t.is(typeof res.remain_resin_discount_num, 'number')
  t.is(typeof res.resin_discount_num_limit, 'number')
  t.is(typeof res.current_expedition_num, 'number')
  t.is(typeof res.max_expedition_num, 'number')
  t.is(typeof res.current_home_coin, 'number')
  t.is(typeof res.max_home_coin, 'number')
  t.is(typeof res.home_coin_recovery_time, 'string')
  t.is(typeof res.calendar_url, 'string')
  t.is(typeof res.transformer.obtained, 'boolean')
  t.is(typeof res.transformer.recovery_time.Day, 'number')
  t.is(typeof res.transformer.recovery_time.Hour, 'number')
  t.is(typeof res.transformer.recovery_time.Minute, 'number')
  t.is(typeof res.transformer.recovery_time.Second, 'number')
  t.is(typeof res.transformer.recovery_time.reached, 'boolean')
  t.is(typeof res.transformer.wiki, 'string')
  t.is(typeof res.transformer.noticed, 'boolean')
  t.is(typeof res.transformer.latest_job_id, 'string')
})

test('dailyNote() should throw when UID is nullable', async (t) => {
  const client = new Genshin({ cookie })

  await t.throwsAsync(
    async () => {
      await client.dailyNote()
    },
    {
      instanceOf: HoyolabError,
    },
  )
})
