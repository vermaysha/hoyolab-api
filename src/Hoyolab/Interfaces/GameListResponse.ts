export interface GameListResponse {
  list: {
    game_biz: string
    region: string
    game_uid: string
    nickname: string
    level: number
    is_chosen: boolean
    region_name: string
    is_official: boolean
  }[]
}
