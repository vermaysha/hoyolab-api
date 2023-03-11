import { describe, it, expect } from '@jest/globals'
import { Genshin } from '../../src'

describe('Test Genshin get characters functionality', () => {
  const genshin = new Genshin({
    cookie: {
      accountId: Number(process.env.ACCOUNT_ID),
      cookieToken: process.env.COOKIE_TOKEN,
      ltoken: process.env.LTOKEN ?? '',
      ltuid: Number(process.env.LTUID ?? ''),
    },
    uid: process.env.UID ?? '',
  })

  it('getCharacters must be have valid response', async () => {
    const characters = await genshin.getCharacters()

    expect(characters).toHaveProperty('avatars')
    expect(characters).toHaveProperty('role')

    characters.avatars.forEach((avatar) => {
      expect(avatar).toHaveProperty('id')
      expect(avatar).toHaveProperty('image')
      expect(avatar).toHaveProperty('icon')
      expect(avatar).toHaveProperty('name')
      expect(avatar).toHaveProperty('element')
      expect(avatar).toHaveProperty('fetter')
      expect(avatar).toHaveProperty('level')
      expect(avatar).toHaveProperty('rarity')
      expect(avatar).toHaveProperty('weapon')
      expect(avatar).toHaveProperty('weapon.id')
      expect(avatar).toHaveProperty('weapon.name')
      expect(avatar).toHaveProperty('weapon.icon')
      expect(avatar).toHaveProperty('weapon.type')
      expect(avatar).toHaveProperty('weapon.rarity')
      expect(avatar).toHaveProperty('weapon.level')
      expect(avatar).toHaveProperty('weapon.promote_level')
      expect(avatar).toHaveProperty('weapon.type_name')
      expect(avatar).toHaveProperty('weapon.desc')
      expect(avatar).toHaveProperty('weapon.affix_level')
      expect(avatar).toHaveProperty('reliquaries')
      avatar.reliquaries.forEach((reliquari) => {
        expect(reliquari).toHaveProperty('id')
        expect(reliquari).toHaveProperty('name')
        expect(reliquari).toHaveProperty('icon')
        expect(reliquari).toHaveProperty('pos')
        expect(reliquari).toHaveProperty('rarity')
        expect(reliquari).toHaveProperty('level')
        expect(reliquari).toHaveProperty('set')
        expect(reliquari).toHaveProperty('set.id')
        expect(reliquari).toHaveProperty('set.name')
        expect(reliquari).toHaveProperty('set.affixes')
        reliquari.set.affixes.forEach((affix) => {
          expect(affix).toHaveProperty('activation_number')
          expect(affix).toHaveProperty('effect')
        })
        expect(reliquari).toHaveProperty('pos_name')
      })
      expect(avatar).toHaveProperty('constellations')
      avatar.constellations.forEach((constellation) => {
        expect(constellation).toHaveProperty('id')
        expect(constellation).toHaveProperty('name')
        expect(constellation).toHaveProperty('icon')
        expect(constellation).toHaveProperty('effect')
        expect(constellation).toHaveProperty('is_actived')
        expect(constellation).toHaveProperty('pos')
      })
      expect(avatar).toHaveProperty('actived_constellation_num')
      expect(avatar).toHaveProperty('costumes')
      avatar.costumes.forEach((costume) => {
        expect(costume).toHaveProperty('id')
        expect(costume).toHaveProperty('name')
        expect(costume).toHaveProperty('icon')
      })
      expect(avatar).toHaveProperty('external')
    })
  })

  it('getCharactersInfo must be have valid response', async () => {
    const character = await genshin.getCharactersInfo([10000032])

    expect(character).toHaveProperty('avatars')

    character.avatars.forEach((avatar) => {
      expect(avatar).toHaveProperty('id')
      expect(avatar).toHaveProperty('image')
      expect(avatar).toHaveProperty('icon')
      expect(avatar).toHaveProperty('name')
      expect(avatar).toHaveProperty('element')
      expect(avatar).toHaveProperty('rarity')
      expect(avatar).toHaveProperty('weapon_type')
      expect(avatar).toHaveProperty('weapon_type_name')
    })
  })
})
