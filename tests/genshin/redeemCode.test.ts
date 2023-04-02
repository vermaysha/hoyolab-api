import test from 'ava'
import { genshin, cookie } from './preloader'
import { Genshin, HoyolabError } from '../../src'

test('redeemCode() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.redeemCode('GENSHINGIFT')

  if (res.data) {
    t.is(typeof res.data, 'string')
  }

  t.is(typeof res.message, 'string')
  t.is(typeof res.retcode, 'number')
})

test('redeemCode() should throw when UID is nullable', async (t) => {
  const client = new Genshin({ cookie })

  await t.throwsAsync(
    async () => {
      await client.redeemCode('GENSHINGIFT')
    },
    {
      instanceOf: HoyolabError,
    },
  )
})
