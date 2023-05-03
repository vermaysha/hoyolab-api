import test from 'ava'
import { hsr, cookie } from './preloader'
import { HonkaiStarRail, HoyolabError } from '../../src'

test('redeemCode() should return be valid', async (t) => {
  const client = await hsr()
  const res = await client.redeemCode('STARRAILGIFT')

  if (res.data) {
    t.is(typeof res.data, 'string')
  }

  t.is(typeof res.message, 'string')
  t.is(typeof res.retcode, 'number')
})

test('redeemCode() should throw when UID is nullable', async (t) => {
  const client = new HonkaiStarRail({ cookie })

  await t.throwsAsync(
    async () => {
      await client.redeemCode('STARRAILGIFT')
    },
    {
      instanceOf: HoyolabError,
    },
  )
})
