import { Enum } from '../../src'
import { Wiki } from '../../src/Wiki'
import { describe, it, expect } from '@jest/globals'

describe('HoyoWiki API Test', () => {
  const client = new Wiki()

  it('Should be return all characters list', async () => {
    const games = await client.getCharacters()
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
    const games = await client.getCharacters({
      rarity: Enum.WikiCharRarity.FOUR_STAR,
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
})
