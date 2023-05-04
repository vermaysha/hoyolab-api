export interface IGenshinSpiralAbyssRank {
  avatar_id: number
  avatar_icon: string
  value: number
  rarity: number
}

export interface IGenshinSpiralAbyssAvatar {
  id: number
  icon: string
  level: number
  rarity: number
}

export interface IGenshinSpiralAbyssBattle {
  index: number
  timestamp: string
  avatars: IGenshinSpiralAbyssAvatar[]
}

export interface IGenshinSpiralAbyssLevel {
  index: number
  star: number
  max_star: number
  battles: IGenshinSpiralAbyssBattle[]
}

export interface IGenshinSpiralAbyssFloor {
  index: number
  icon: string
  is_unlock: boolean
  settle_time: string
  star: number
  max_star: number
  levels: IGenshinSpiralAbyssLevel[]
}

export interface IGenshinSpiralAbyss {
  schedule_id: number
  start_time: string
  end_time: string
  total_battle_times: number
  total_win_times: number
  max_floor: string
  reveal_rank: IGenshinSpiralAbyssRank[]
  defeat_rank: IGenshinSpiralAbyssRank[]
  damage_rank: IGenshinSpiralAbyssRank[]
  take_damage_rank: IGenshinSpiralAbyssRank[]
  normal_skill_rank: IGenshinSpiralAbyssRank[]
  energy_skill_rank: IGenshinSpiralAbyssRank[]
  floors: IGenshinSpiralAbyssFloor[]
  total_star: number
  is_unlock: boolean
}
