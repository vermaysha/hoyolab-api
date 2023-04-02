import test from 'ava'
import { genshin, cookie } from './preloader'
import { Genshin, HoyolabError } from '../../src'

test('characters() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.characters()

  res.avatars.forEach((avatar) => {
    t.is(typeof avatar.id, 'number')
    t.is(typeof avatar.image, 'string')
    t.is(typeof avatar.icon, 'string')
    t.is(typeof avatar.name, 'string')
    t.is(typeof avatar.element, 'string')
    t.is(typeof avatar.rarity, 'number')
    t.is(typeof avatar.fetter, 'number')
    t.is(typeof avatar.level, 'number')
    t.is(typeof avatar.actived_constellation_num, 'number')

    t.is(typeof avatar.weapon.id, 'number')
    t.is(typeof avatar.weapon.name, 'string')
    t.is(typeof avatar.weapon.icon, 'string')
    t.is(typeof avatar.weapon.type, 'number')
    t.is(typeof avatar.weapon.rarity, 'number')
    t.is(typeof avatar.weapon.level, 'number')
    t.is(typeof avatar.weapon.promote_level, 'number')
    t.is(typeof avatar.weapon.type_name, 'string')
    t.is(typeof avatar.weapon.desc, 'string')
    t.is(typeof avatar.weapon.affix_level, 'number')

    avatar.reliquaries.forEach((reli) => {
      t.is(typeof reli.id, 'number')
      t.is(typeof reli.name, 'string')
      t.is(typeof reli.icon, 'string')
      t.is(typeof reli.pos, 'number')
      t.is(typeof reli.rarity, 'number')
      t.is(typeof reli.level, 'number')
      t.is(typeof reli.pos_name, 'string')

      t.is(typeof reli.set.id, 'number')
      t.is(typeof reli.set.name, 'string')

      reli.set.affixes.forEach((affix) => {
        t.is(typeof affix.activation_number, 'number')
        t.is(typeof affix.effect, 'string')
      })
    })

    avatar.constellations.forEach((cons) => {
      t.is(typeof cons.id, 'number')
      t.is(typeof cons.name, 'string')
      t.is(typeof cons.icon, 'string')
      t.is(typeof cons.effect, 'string')
      t.is(typeof cons.is_actived, 'boolean')
      t.is(typeof cons.pos, 'number')
    })

    avatar.costumes.forEach((cos) => {
      t.is(typeof cos.id, 'number')
      t.is(typeof cos.name, 'string')
      t.is(typeof cos.icon, 'string')
    })
  })
})

test('characters() should throw when UID is nullable', async (t) => {
  const client = new Genshin({ cookie })

  await t.throwsAsync(
    async () => {
      await client.characters()
    },
    {
      instanceOf: HoyolabError,
    },
  )
})

test('charactersSummary() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.charactersSummary([10000007])

  res.avatars.forEach((avatar) => {
    t.is(typeof avatar.id, 'number')
    t.is(typeof avatar.image, 'string')
    t.is(typeof avatar.icon, 'string')
    t.is(typeof avatar.name, 'string')
    t.is(typeof avatar.element, 'string')
    t.is(typeof avatar.rarity, 'number')
    t.is(typeof avatar.weapon_type, 'number')
    t.is(typeof avatar.weapon_type_name, 'string')
  })
})

test('charactersSummary() should throw when UID is nullable', async (t) => {
  const client = new Genshin({ cookie })

  await t.throwsAsync(
    async () => {
      await client.charactersSummary([10000007])
    },
    {
      instanceOf: HoyolabError,
    },
  )
})
