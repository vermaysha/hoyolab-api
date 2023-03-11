import { describe, it, expect } from '@jest/globals'
import { Genshin } from '../../src'

describe('Test Genshin Impact Spiral Abyss Functionality', () => {
  const genshin = new Genshin({
    cookie: {
      accountId: Number(process.env.ACCOUNT_ID),
      cookieToken: process.env.COOKIE_TOKEN,
      ltoken: process.env.LTOKEN ?? '',
      ltuid: Number(process.env.LTUID ?? ''),
    },
    uid: process.env.UID ?? '',
  })

  it('getSpiralAbyss should to return valid response', async () => {
    const spiral = await genshin.getSpiralAbyss()

    expect(spiral).toHaveProperty('schedule_id')
    expect(spiral).toHaveProperty('start_time')
    expect(spiral).toHaveProperty('end_time')
    expect(spiral).toHaveProperty('total_battle_times')
    expect(spiral).toHaveProperty('total_win_times')
    expect(spiral).toHaveProperty('max_floor')
    expect(spiral).toHaveProperty('reveal_rank')
    expect(spiral).toHaveProperty('defeat_rank')
    expect(spiral).toHaveProperty('damage_rank')
    expect(spiral).toHaveProperty('take_damage_rank')
    expect(spiral).toHaveProperty('normal_skill_rank')
    expect(spiral).toHaveProperty('energy_skill_rank')
    expect(spiral).toHaveProperty('floors')
    expect(spiral).toHaveProperty('total_star')
    expect(spiral).toHaveProperty('is_unlock')

    const ranks = [
      spiral.reveal_rank,
      spiral.defeat_rank,
      spiral.damage_rank,
      spiral.take_damage_rank,
      spiral.normal_skill_rank,
      spiral.energy_skill_rank,
    ]
    ranks.forEach((rank) => {
      rank.forEach((item) => {
        expect(item).toHaveProperty('avatar_id')
        expect(item).toHaveProperty('avatar_icon')
        expect(item).toHaveProperty('value')
        expect(item).toHaveProperty('rarity')
      })
    })

    spiral.floors.forEach((floor) => {
      expect(floor).toHaveProperty('index')
      expect(floor).toHaveProperty('icon')
      expect(floor).toHaveProperty('is_unlock')
      expect(floor).toHaveProperty('settle_time')
      expect(floor).toHaveProperty('star')
      expect(floor).toHaveProperty('max_star')
      expect(floor).toHaveProperty('levels')

      floor.levels.forEach((level) => {
        expect(level).toHaveProperty('index')
        expect(level).toHaveProperty('star')
        expect(level).toHaveProperty('max_star')
        expect(level).toHaveProperty('battles')

        level.battles.forEach((battle) => {
          expect(battle).toHaveProperty('index')
          expect(battle).toHaveProperty('timestamp')
          expect(battle).toHaveProperty('avatars')

          battle.avatars.forEach((avatar) => {
            expect(avatar).toHaveProperty('id')
            expect(avatar).toHaveProperty('icon')
            expect(avatar).toHaveProperty('level')
            expect(avatar).toHaveProperty('rarity')
          })
        })
      })
    })
  })
})
