import { describe, it, expect } from '@jest/globals'
import { Genshin } from '../../src'

describe('Test Genshin get account information functionality', () => {
  const genshin = new Genshin({
    cookie: {
      accountId: Number(process.env.ACCOUNT_ID),
      cookieToken: process.env.COOKIE_TOKEN,
      ltoken: process.env.LTOKEN ?? '',
      ltuid: Number(process.env.LTUID ?? ''),
    },
    uid: process.env.UID ?? '',
  })

  it('getAccountInfo must be have valid response', async () => {
    const account = await genshin.getAccountInfo()

    expect(account).toHaveProperty('avatars')
    account.avatars.forEach((avatar) => {
      expect(avatar).toHaveProperty('fetter')
      expect(avatar).toHaveProperty('level')
      expect(avatar).toHaveProperty('actived_constellation_num')
    })

    expect(account).toHaveProperty('homes')
    account.homes.forEach((home) => {
      expect(home).toHaveProperty('level')
      expect(home).toHaveProperty('visit_num')
      expect(home).toHaveProperty('comfort_num')
      expect(home).toHaveProperty('item_num')
      expect(home).toHaveProperty('name')
      expect(home).toHaveProperty('icon')
      expect(home).toHaveProperty('comfort_level_name')
      expect(home).toHaveProperty('comfort_level_icon')
    })

    expect(account).toHaveProperty('role')
    expect(account).toHaveProperty('role.AvatarUrl')
    expect(account).toHaveProperty('role.level')
    expect(account).toHaveProperty('role.nickname')
    expect(account).toHaveProperty('role.region')

    expect(account).toHaveProperty('stats')

    expect(account).toHaveProperty('stats.active_day_number')
    expect(account).toHaveProperty('stats.achievement_number')
    expect(account).toHaveProperty('stats.anemoculus_number')
    expect(account).toHaveProperty('stats.geoculus_number')
    expect(account).toHaveProperty('stats.avatar_number')
    expect(account).toHaveProperty('stats.way_point_number')
    expect(account).toHaveProperty('stats.domain_number')
    expect(account).toHaveProperty('stats.spiral_abyss')
    expect(account).toHaveProperty('stats.precious_chest_number')
    expect(account).toHaveProperty('stats.luxurious_chest_number')
    expect(account).toHaveProperty('stats.exquisite_chest_number')
    expect(account).toHaveProperty('stats.common_chest_number')
    expect(account).toHaveProperty('stats.electroculus_number')
    expect(account).toHaveProperty('stats.magic_chest_number')
    expect(account).toHaveProperty('stats.dendroculus_number')

    expect(account).toHaveProperty('world_explorations')

    account.world_explorations.forEach((world) => {
      expect(world).toHaveProperty('level')
      expect(world).toHaveProperty('exploration_percentage')
      expect(world).toHaveProperty('icon')
      expect(world).toHaveProperty('name')
      expect(world).toHaveProperty('type')
      expect(world).toHaveProperty('id')
      expect(world).toHaveProperty('parent_id')
      expect(world).toHaveProperty('map_url')
      expect(world).toHaveProperty('strategy_url')
      expect(world).toHaveProperty('background_image')
      expect(world).toHaveProperty('inner_icon')
      expect(world).toHaveProperty('cover')

      expect(world).toHaveProperty('offerings')

      world.offerings.forEach((offering) => {
        expect(offering).toHaveProperty('name')
        expect(offering).toHaveProperty('level')
        expect(offering).toHaveProperty('icon')
      })
    })
  })
})
