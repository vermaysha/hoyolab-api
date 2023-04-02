import test from 'ava'
import { genshin, cookie } from './preloader'
import { Genshin, HoyolabError } from '../../src'

test('records() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.records()

  res.avatars.forEach((avatar) => {
    t.is(typeof avatar.id, 'number')
    t.is(typeof avatar.image, 'string')
    t.is(typeof avatar.name, 'string')
    t.is(typeof avatar.element, 'string')
    t.is(typeof avatar.fetter, 'number')
    t.is(typeof avatar.level, 'number')
    t.is(typeof avatar.rarity, 'number')
    t.is(typeof avatar.actived_constellation_num, 'number')
    t.is(typeof avatar.card_image, 'string')
    t.is(typeof avatar.is_chosen, 'boolean')
  })

  res.homes.forEach((home) => {
    t.is(typeof home.level, 'number')
    t.is(typeof home.visit_num, 'number')
    t.is(typeof home.comfort_num, 'number')
    t.is(typeof home.item_num, 'number')
    t.is(typeof home.name, 'string')
    t.is(typeof home.icon, 'string')
    t.is(typeof home.comfort_level_name, 'string')
    t.is(typeof home.comfort_level_icon, 'string')
  })

  res.world_explorations.forEach((explore) => {
    t.is(typeof explore.level, 'number')
    t.is(typeof explore.exploration_percentage, 'number')
    t.is(typeof explore.icon, 'string')
    t.is(typeof explore.name, 'string')
    t.is(typeof explore.type, 'string')
    t.is(typeof explore.id, 'number')
    t.is(typeof explore.parent_id, 'number')
    t.is(typeof explore.map_url, 'string')
    t.is(typeof explore.strategy_url, 'string')
    t.is(typeof explore.background_image, 'string')
    t.is(typeof explore.inner_icon, 'string')
    t.is(typeof explore.cover, 'string')

    explore.offerings.forEach((offering) => {
      t.is(typeof offering.name, 'string')
      t.is(typeof offering.level, 'number')
      t.is(typeof offering.icon, 'string')
    })
  })

  t.is(typeof res.role.AvatarUrl, 'string')
  t.is(typeof res.role.nickname, 'string')
  t.is(typeof res.role.region, 'string')
  t.is(typeof res.role.level, 'number')

  t.is(typeof res.stats.active_day_number, 'number')
  t.is(typeof res.stats.achievement_number, 'number')
  t.is(typeof res.stats.anemoculus_number, 'number')
  t.is(typeof res.stats.geoculus_number, 'number')
  t.is(typeof res.stats.avatar_number, 'number')
  t.is(typeof res.stats.way_point_number, 'number')
  t.is(typeof res.stats.domain_number, 'number')
  t.is(typeof res.stats.spiral_abyss, 'string')
  t.is(typeof res.stats.precious_chest_number, 'number')
  t.is(typeof res.stats.luxurious_chest_number, 'number')
  t.is(typeof res.stats.exquisite_chest_number, 'number')
  t.is(typeof res.stats.common_chest_number, 'number')
  t.is(typeof res.stats.electroculus_number, 'number')
  t.is(typeof res.stats.magic_chest_number, 'number')
  t.is(typeof res.stats.dendroculus_number, 'number')
})

test('records() should throw when UID is nullable', async (t) => {
  const client = new Genshin({ cookie })

  await t.throwsAsync(
    async () => {
      await client.records()
    },
    {
      instanceOf: HoyolabError,
    },
  )
})
