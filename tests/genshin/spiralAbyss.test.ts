import test from 'ava'
import { genshin, cookie } from './preloader'
import { AbyssScheduleEnum, Genshin, HoyolabError } from '../../src'

test('spiralAbyss() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.spiralAbyss()

  t.is(typeof res.schedule_id, 'number')
  t.is(typeof res.start_time, 'string')
  t.is(typeof res.end_time, 'string')
  t.is(typeof res.total_battle_times, 'number')
  t.is(typeof res.total_win_times, 'number')
  t.is(typeof res.max_floor, 'string')
  t.is(typeof res.total_star, 'number')
  t.is(typeof res.is_unlock, 'boolean')

  res.reveal_rank.forEach((rank) => {
    t.is(typeof rank.avatar_id, 'number')
    t.is(typeof rank.avatar_icon, 'string')
    t.is(typeof rank.value, 'number')
    t.is(typeof rank.rarity, 'number')
  })

  res.defeat_rank.forEach((rank) => {
    t.is(typeof rank.avatar_id, 'number')
    t.is(typeof rank.avatar_icon, 'string')
    t.is(typeof rank.value, 'number')
    t.is(typeof rank.rarity, 'number')
  })

  res.damage_rank.forEach((rank) => {
    t.is(typeof rank.avatar_id, 'number')
    t.is(typeof rank.avatar_icon, 'string')
    t.is(typeof rank.value, 'number')
    t.is(typeof rank.rarity, 'number')
  })

  res.take_damage_rank.forEach((rank) => {
    t.is(typeof rank.avatar_id, 'number')
    t.is(typeof rank.avatar_icon, 'string')
    t.is(typeof rank.value, 'number')
    t.is(typeof rank.rarity, 'number')
  })

  res.normal_skill_rank.forEach((rank) => {
    t.is(typeof rank.avatar_id, 'number')
    t.is(typeof rank.avatar_icon, 'string')
    t.is(typeof rank.value, 'number')
    t.is(typeof rank.rarity, 'number')
  })

  res.energy_skill_rank.forEach((rank) => {
    t.is(typeof rank.avatar_id, 'number')
    t.is(typeof rank.avatar_icon, 'string')
    t.is(typeof rank.value, 'number')
    t.is(typeof rank.rarity, 'number')
  })

  res.floors.forEach((floor) => {
    t.is(typeof floor.index, 'number')
    t.is(typeof floor.icon, 'string')
    t.is(typeof floor.is_unlock, 'boolean')
    t.is(typeof floor.settle_time, 'string')
    t.is(typeof floor.star, 'number')
    t.is(typeof floor.max_star, 'number')

    floor.levels.forEach((level) => {
      t.is(typeof level.index, 'number')
      t.is(typeof level.star, 'number')
      t.is(typeof level.max_star, 'number')

      level.battles.forEach((battle) => {
        t.is(typeof battle.index, 'number')
        t.is(typeof battle.timestamp, 'string')

        battle.avatars.forEach((avatar) => {
          t.is(typeof avatar.id, 'number')
          t.is(typeof avatar.icon, 'string')
          t.is(typeof avatar.level, 'number')
          t.is(typeof avatar.rarity, 'number')
        })
      })
    })
  })
})

test('spiralAbyss() should throw when schedule is invalid', async (t) => {
  const client = await genshin()

  await t.throwsAsync(
    async () => {
      await client.spiralAbyss(10 as AbyssScheduleEnum)
    },
    {
      instanceOf: HoyolabError,
    },
  )
})

test('spiralAbyss() should throw when UID is nullable', async (t) => {
  const client = new Genshin({ cookie })

  await t.throwsAsync(
    async () => {
      await client.spiralAbyss(AbyssScheduleEnum.CURRENT)
    },
    {
      instanceOf: HoyolabError,
    },
  )
})
