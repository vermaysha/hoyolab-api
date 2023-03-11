export interface ISpiralRank {
  avatar_id: number
  avatar_icon: string
  value: number
  rarity: number
}

export interface ISpiralAvatar {
  id: number
  icon: string
  level: number
  rarity: number
}

export interface ISpiralBattle {
  index: number
  timestamp: string
  avatars: ISpiralAvatar[]
}

export interface ISpiralLevel {
  index: number
  star: number
  max_star: number
  battles: ISpiralBattle[]
}

export interface ISpiralFloor {
  index: number
  icon: string
  is_unlock: boolean
  settle_time: string
  star: number
  max_star: number
  levels: ISpiralLevel[]
}

export interface SpiralAbyssResponse {
  schedule_id: number
  start_time: string
  end_time: string
  total_battle_times: number
  total_win_times: number
  max_floor: string
  reveal_rank: ISpiralRank[]
  defeat_rank: ISpiralRank[]
  damage_rank: ISpiralRank[]
  take_damage_rank: ISpiralRank[]
  normal_skill_rank: ISpiralRank[]
  energy_skill_rank: ISpiralRank[]
  floors: ISpiralFloor[]
  total_star: number
  is_unlock: boolean
}
