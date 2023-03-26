import { Enum } from '../../src'
import { Wiki } from '../../src/Wiki'
import { describe, it, expect } from '@jest/globals'

describe('HoyoWiki API Test', () => {
  const client = new Wiki()

  it('Should be return all characters list', async () => {
    const games = await client.getWeapons()
    expect(games).toHaveProperty('list')

    games.list.forEach((game) => {
      expect(game).toHaveProperty('entry_page_id')
      expect(game).toHaveProperty('name')
      expect(game).toHaveProperty('icon_url')
      expect(game).toHaveProperty('display_field')
      expect(game).toHaveProperty('filter_values')
    })
  })

  it('Should be return all character list according filters', async () => {
    const games = await client.getWeapons({
      rarity: Enum.WikiWeaponRarity.FOUR_STAR,
      type: Enum.WikiWeaponType.BOW,
    })
    expect(games).toHaveProperty('list')

    games.list.forEach((game) => {
      expect(game).toHaveProperty('entry_page_id')
      expect(game).toHaveProperty('name')
      expect(game).toHaveProperty('icon_url')
      expect(game).toHaveProperty('display_field')
      expect(game).toHaveProperty('filter_values')
    })
  })

  it('Should be return detailed data', async () => {
    const weapon = await client.getWeapon(3461)

    expect(weapon).toHaveProperty('id')
    expect(weapon).toHaveProperty('name')
    expect(weapon).toHaveProperty('desc')
    expect(weapon).toHaveProperty('icon_url')
    expect(weapon).toHaveProperty('header_img_url')
    expect(weapon).toHaveProperty('modules')
    expect(weapon).toHaveProperty('filter_values')
    expect(weapon).toHaveProperty('menu_id')
    expect(weapon).toHaveProperty('menu_name')
    expect(weapon).toHaveProperty('version')
    expect(weapon).toHaveProperty('langs')
  })
})
