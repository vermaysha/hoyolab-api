export interface RecordCardData {
  name: string
  interface: number
  value: string
}

export interface RecordCardListItem {
  has_role: boolean
  game_id: number
  game_role_id: string
  nickname: string
  region: string
  level: number
  background_image: string
  is_public: boolean
  data: RecordCardData[]
  region_name: string
  url: string
}

export interface RecordCardResponse {
  list: RecordCardListItem[]
  currecnt: RecordCardListItem
}
