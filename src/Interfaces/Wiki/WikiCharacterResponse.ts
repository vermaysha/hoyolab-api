export interface WikiCharacterResponse {
  id: string
  name: string
  desc: string
  icon_url: string
  header_img_url: string
  modules: {
    name: string
    is_poped: boolean
    components: {
      component_id: string
      layout: string
      data: string
      style: string
    }[]
    id: string
    is_customize_name: boolean
    is_abstract: boolean
  }[]
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
  menu_id: string
  menu_name: string
  version: string
  langs: [unknown]
}
