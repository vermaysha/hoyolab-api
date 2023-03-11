import { IDiary } from './IDiary'

export interface DiaryDetailResponse extends IDiary {
  current_page: number
  list: {
    action_id: number
    action: string
    time: string
    num: number
  }[]
}
