import { describe, it, expect } from '@jest/globals'
import { Genshin } from '../../src'

describe('Test Genshin redeem code functionality', () => {
  const genshin = new Genshin({
    cookie: {
      accountId: Number(process.env.ACCOUNT_ID),
      cookieToken: process.env.COOKIE_TOKEN,
      ltoken: process.env.LTOKEN ?? '',
      ltuid: Number(process.env.LTUID ?? ''),
    },
    uid: process.env.UID ?? '',
  })

  it('redeem should be return valid response', async () => {
    const redeem = await genshin.redeemCode('GENSHINGIFT')

    expect(redeem).toHaveProperty('data')
    expect(redeem).toHaveProperty('message')
    expect(redeem).toHaveProperty('retcode')
  })
})
