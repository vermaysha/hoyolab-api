export interface CharacterInfoResponse {
  id: number
  image: string
  icon?: string
  name: string
  element: string
  rarity: number
  weapon_type?: number
  weapon_type_name?: string
}

export interface CharacterResponse extends CharacterInfoResponse {
  fetter: number
  level: number
  actived_constellation_num: number
  card_image?: string
  weapon: {
    id: number
    name: string
    icon: string
    type: string
    rarity: number
    level: number
    promote_level: number
    type_name: string
    desc: string
    affix_level: number
  }

  reliquaries: {
    id: number
    name: string
    icon: string
    rarity: number
    pos: number
    level: number
    set: {
      id: number
      name: string
      affixes: {
        activation_number: number
        effect: string
      }[]
    }
    pos_name: string
  }[]
  constellation: {
    id: number
    name: string
    icon: string
    effect: string
    is_actived: boolean
    pos: number
  }[]
  costumes: {
    id: number
    icon: string
    name: string
  }[]
  external: null
}
