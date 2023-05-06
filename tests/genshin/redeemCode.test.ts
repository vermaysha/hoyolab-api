import test from 'ava'
import { genshin, cookie } from './preloader'
import { GenshinImpact, HoyolabError } from '../../src'

test('redeem.claim() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.redeem.claim('GENSHINGIFT')

  if (res.data) {
    t.is(typeof res.data, 'string')
  }

  t.is(typeof res.message, 'string')
  t.is(typeof res.retcode, 'number')
})

test('redeem.claim() should throw when UID is nullable', async (t) => {
  const client = new GenshinImpact({ cookie })

  await t.throwsAsync(
    async () => {
      await client.redeem.claim('GENSHINGIFT')
    },
    {
      instanceOf: HoyolabError,
    },
  )
})
