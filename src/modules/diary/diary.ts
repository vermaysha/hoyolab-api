import type { LanguageEnum } from '../../language'
import { Request } from '../../request'
import { HoyolabError } from '../../utils'
import { DiaryEnum, DiaryMonthEnum } from './diary.enum'
import { IGenshinDiaryDetail, IGenshinDiaryInfo } from './diary.interface'
import { DiaryRoute } from './diary.route'

export class DiaryModule {
  constructor(
    private request: Request,
    private lang: LanguageEnum,
    private region: string | null,
    private uid: number | null,
  ) {}

  /**
   * Fetch genshin impact diary data
   *
   * @param month
   * @returns {Promise<IGenshinDiaryInfo>}
   */
  async diaries(
    month: DiaryMonthEnum = DiaryMonthEnum.CURRENT,
  ): Promise<IGenshinDiaryInfo> {
    if (!this.region || !this.uid) {
      throw new HoyolabError('UID parameter is missing or failed to be filled')
    }

    if (Object.values(DiaryMonthEnum).includes(month) === false) {
      throw new HoyolabError('The given month parameter is invalid !')
    }

    this.request
      .setParams({
        region: this.region,
        uid: this.uid,
        month,
      })
      .setDs()

    const res = (await this.request.send(DiaryRoute.list())).data

    return res as IGenshinDiaryInfo
  }

  /**
   * Fetch history of received resources (primogems and mora) from diary
   *
   * @param type DiaryEnum
   * @param month DiaryMonthEnum
   * @returns {IGenshinDiaryDetail}
   */
  async diaryDetail(
    type: DiaryEnum,
    month: DiaryMonthEnum = DiaryMonthEnum.CURRENT,
  ): Promise<IGenshinDiaryDetail> {
    if (!this.region || !this.uid) {
      throw new HoyolabError('UID parameter is missing or failed to be filled')
    }

    if (Object.values(DiaryMonthEnum).includes(month) === false) {
      throw new HoyolabError('The given month parameter is invalid !')
    }

    if (Object.values(DiaryEnum).includes(type) === false) {
      throw new HoyolabError('The given type parameter is invalid !')
    }

    const responses: Partial<IGenshinDiaryDetail> = {}

    let page = 1
    let next = true
    do {
      this.request
        .setParams({
          region: this.region,
          uid: this.uid,
          month,
          type,
          current_page: page,
          page_size: 100,
        })
        .setDs()

      const res = (await (
        await this.request.send(DiaryRoute.detail())
      ).data) as IGenshinDiaryDetail

      responses.uid = res.uid
      responses.region = res.region
      responses.optional_month = res.optional_month
      responses.nickname = res.nickname
      responses.data_month = res.data_month
      responses.current_page = res.current_page
      responses.list = [...(responses.list ?? []), ...res.list]

      if (res.list.length < 1) {
        next = false
      }

      page++
    } while (next)

    /* c8 ignore start */
    responses.list.sort((a, b) => {
      const keyA = new Date(a.time)
      const keyB = new Date(b.time)

      // Compare the 2 dates
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1

      return 0
    })
    /* c8 ignore stop */

    return responses as IGenshinDiaryDetail
  }
}
