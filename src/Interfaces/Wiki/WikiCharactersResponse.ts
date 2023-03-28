export interface IWikiCharacter {
  entry_page_id: string
  name: string
  icon_url: string
  display_field: unknown
  filter_values: {
    character_weapon?: {
      values: string[]
      value_types: { id: string; value: string }[]
    }
    character_rarity?: {
      values: string[]
      value_types: { id: string; value: string }[]
    }
    character_property?: {
      values: string[]
      value_types: { id: string; value: string }[]
    }
    character_vision?: {
      values: string[]
      value_types: { id: string; value: string }[]
    }
    character_region?: {
      values: string
      value_types: { id: string; value: string }[]
    }
  }
}
export interface WikiCharactersResponse {
  list: IWikiCharacter[]
  total: string
}