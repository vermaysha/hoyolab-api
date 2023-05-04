export interface IGenshinRecordAvatar {
  id: number
  image: string
  name: string
  element: string
  fetter: number
  level: number
  rarity: number
  actived_constellation_num: number
  card_image: string
  is_chosen: boolean
}

export interface IGenshinRecordStat {
  active_day_number: number
  achievement_number: number
  anemoculus_number: number
  geoculus_number: number
  avatar_number: number
  way_point_number: number
  domain_number: number
  spiral_abyss: string
  precious_chest_number: number
  luxurious_chest_number: number
  exquisite_chest_number: number
  common_chest_number: number
  electroculus_number: number
  magic_chest_number: number
  dendroculus_number: number
}

export interface IGenshinRecordWorldExploration {
  level: number
  exploration_percentage: number
  icon: string
  name: string
  type: string
  offerings: {
    name: string
    level: number
    icon: string
  }[]
  id: number
  parent_id: number
  map_url: string
  strategy_url: string
  background_image: string
  inner_icon: string
  cover: string
}

export interface IGenshinRecordHome {
  level: number
  visit_num: number
  comfort_num: number
  item_num: number
  name: string
  icon: string
  comfort_level_name: string
  comfort_level_icon: string
}

export interface IGenshinRecord {
  role: {
    AvatarUrl: string
    nickname: string
    region: string
    level: number
  }
  avatars: IGenshinRecordAvatar[]
  stats: IGenshinRecordStat
  world_explorations: IGenshinRecordWorldExploration[]
  homes: IGenshinRecordHome[]
  city_explorations: unknown[]
}
