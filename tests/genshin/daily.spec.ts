import { describe, it, expect } from '@jest/globals'
import { Genshin } from '../../src'

describe('Test Genshin Daily', () => {
  const genshin = new Genshin({
    cookie: {
      accountId: Number(process.env.ACCOUNT_ID),
      cookieToken: process.env.COOKIE_TOKEN,
      ltoken: process.env.LTOKEN ?? '',
      ltuid: Number(process.env.LTUID ?? ''),
    },
  })

  it('getDailyInfo must be have valid response', async () => {
    const response = await genshin.getDailyInfo()

    expect(response).toHaveProperty('total_sign_day')
    expect(response).toHaveProperty('today')
    expect(response).toHaveProperty('is_sign')
    expect(response).toHaveProperty('first_bind')
    expect(response).toHaveProperty('is_sub')
    expect(response).toHaveProperty('region')
    expect(response).toHaveProperty('month_last_day')
  })

  it('getDailyRewards must be have valid response', async () => {
    const response = await genshin.getDailyRewards()

    expect(response).toHaveProperty('month')
    expect(response).toHaveProperty('resign')
    expect(response).toHaveProperty('now')
    expect(response).toHaveProperty('awards')

    response.awards.forEach((award) => {
      expect(award).toHaveProperty('icon')
      expect(award).toHaveProperty('name')
      expect(award).toHaveProperty('cnt')
    })
  })

  it('getDailyReward must be have valid response', async () => {
    const response = await genshin.getDailyReward()

    expect(response).toHaveProperty('month')
    expect(response).toHaveProperty('resign')
    expect(response).toHaveProperty('now')
    expect(response).toHaveProperty('award')

    expect(response).toHaveProperty('award.icon')
    expect(response).toHaveProperty('award.name')
    expect(response).toHaveProperty('award.cnt')
  })

  it('claimDaily must be have valid response', async () => {
    const response = await genshin.claimDaily()

    expect(response).toHaveProperty('status')
    expect(response).toHaveProperty('code')

    expect(response).toHaveProperty('reward.month')
    expect(response).toHaveProperty('reward.resign')
    expect(response).toHaveProperty('reward.now')
    expect(response).toHaveProperty('reward.award')

    expect(response).toHaveProperty('reward.award.icon')
    expect(response).toHaveProperty('reward.award.name')
    expect(response).toHaveProperty('reward.award.cnt')

    expect(response).toHaveProperty('info.total_sign_day')
    expect(response).toHaveProperty('info.today')
    expect(response).toHaveProperty('info.is_sign')
    expect(response).toHaveProperty('info.first_bind')
    expect(response).toHaveProperty('info.is_sub')
    expect(response).toHaveProperty('info.region')
    expect(response).toHaveProperty('info.month_last_day')
  })
})
