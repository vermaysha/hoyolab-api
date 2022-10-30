export interface DailyResourcesResponse {
  current_resin: number
  max_resin: number
  resin_recovery_time: string
  finished_task_num: number
  total_task_num: number
  is_extra_task_reward_received: boolean
  remain_resin_discount_num: number
  resin_discount_num_limit: number
  current_expedition_num: number
  max_expedition_num: number
  current_home_coin: number
  max_home_coin: number
  home_coin_recovery_time: string
  calendar_url: string
  transformer: {
    obtained: boolean
    recovery_time: {
      Day: number
      Hour: number
      Minute: number
      Second: number
      reached: boolean
    }
    wiki: string
    noticed: boolean
    last_job_id: string
  }
  expeditions: {
    avatar_side_icon: string
    status: string
    remained_time: string
  }[]
}
