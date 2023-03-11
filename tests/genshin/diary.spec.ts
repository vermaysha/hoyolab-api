import { describe, it, expect } from '@jest/globals'
import { Genshin } from '../../src'

describe('Test Genshin Impact Diary Functionality', () => {
  const genshin = new Genshin({
    cookie: {
      accountId: Number(process.env.ACCOUNT_ID),
      cookieToken: process.env.COOKIE_TOKEN,
      ltoken: process.env.LTOKEN ?? '',
      ltuid: Number(process.env.LTUID ?? ''),
    },
    uid: process.env.UID ?? '',
  })

  it('getDiaryInfo should be return valid response', async () => {
    const diary = await genshin.getDiaryInfo()

    expect(diary).toHaveProperty('uid')
    expect(diary).toHaveProperty('region')
    expect(diary).toHaveProperty('nickname')
    expect(diary).toHaveProperty('optional_month')
    expect(diary).toHaveProperty('month')
    expect(diary).toHaveProperty('data_month')
    expect(diary).toHaveProperty('month_data')
    expect(diary).toHaveProperty('month_data.current_primogems')
    expect(diary).toHaveProperty('month_data.current_mora')
    expect(diary).toHaveProperty('month_data.last_primogems')
    expect(diary).toHaveProperty('month_data.last_mora')
    expect(diary).toHaveProperty('month_data.primogem_rate')
    expect(diary).toHaveProperty('month_data.mora_rate')
    expect(diary).toHaveProperty('month_data.group_by')
    diary.month_data.group_by.forEach((group) => {
      expect(group).toHaveProperty('action_id')
      expect(group).toHaveProperty('action')
      expect(group).toHaveProperty('num')
      expect(group).toHaveProperty('percent')
    })
    expect(diary).toHaveProperty('day_data')
    expect(diary).toHaveProperty('day_data.current_primogems')
    expect(diary).toHaveProperty('day_data.current_mora')
  })

  it('getDiaryDetail should to return valid response', async () => {
    const diary = await genshin.getDiaryDetail(1)

    expect(diary).toHaveProperty('uid')
    expect(diary).toHaveProperty('region')
    expect(diary).toHaveProperty('nickname')
    expect(diary).toHaveProperty('optional_month')
    expect(diary).toHaveProperty('data_month')
    expect(diary).toHaveProperty('current_page')
    expect(diary).toHaveProperty('list')

    diary.list.forEach((item) => {
      expect(item).toHaveProperty('action_id')
      expect(item).toHaveProperty('action')
      expect(item).toHaveProperty('time')
      expect(item).toHaveProperty('num')
    })
  })
})
