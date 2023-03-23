export interface WikiWeaponResponse {
  list: {
    entry_page_id: string
    name: string
    icon_url: string
    display_field: unknown
    filter_values: {
      weapon_type: {
        values: string[]
        value_types: { id: string; value: string }[]
      }
      weapon_property: {
        values: string[]
        value_types: { id: string; value: string }[]
      }
      weapon_rarity: {
        values: string[]
        value_types: { id: string; value: string }[]
      }
    }
  }[]
  total: string
}
