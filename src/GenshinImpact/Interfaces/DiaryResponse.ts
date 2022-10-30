export interface DiaryResponse {
  uid: number
  region: string
  nickname: string
  optional_month: number[]
  month: number
  data_month: number
  month_data: {
    current_primogems: number
    current_mora: number
    last_primogems: number
    last_mora: number
    primogem_rate: number
    mora_rate: number
    group_by: {
      action_id: number
      action: string
      num: number
      percent: number
    }[]
  }
  day_data: {
    current_primogems: number
    current_mora: number
  }
}
