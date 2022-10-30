export interface SpiralAbyssRank {
  avatar_id: number
  avatar_icon: string
  value: number
  rarity: number
}

export interface SpiralAbyssResponse {
  damge_rank: SpiralAbyssRank[]
  defeat_rank: SpiralAbyssRank[]
  endTime: string
  energy_skill_rank: SpiralAbyssRank[]
  floor: {
    index: number
    icon: string
    is_unlock: boolean
    settle_time: string
    star: number
    max_star: number
    levels: {
      index: number
      star: number
      max_star: number
    }[]
  }[]
  is_unlock: boolean
  max_floor: string
  normal_skill_rank: SpiralAbyssRank[]
  reveal_rank: SpiralAbyssRank[]
  schedule_id: number
  startTime: string
  take_damage_rank: SpiralAbyssRank[]
  total_battle_times: number
  total_star: number
  total_win_times: number
}
