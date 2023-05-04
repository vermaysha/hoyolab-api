export interface IGenshinDiaryBase {
  uid: number
  region: string
  nickname: string
  optional_month: number[]
  data_month: number
}

export interface IGenshinDiaryInfo extends IGenshinDiaryBase {
  month: number
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

export interface IGenshinDiaryHistory {
  action_id: number
  action: string
  time: string
  num: number
}

export interface IGenshinDiaryDetail extends IGenshinDiaryBase {
  current_page: number
  list: IGenshinDiaryHistory[]
}
