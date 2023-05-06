import type { LanguageEnum } from '../../language'
import { Request } from '../../request'
import { HoyolabError } from '../../utils'
import { DiaryEnum, DiaryMonthEnum } from './diary.enum'
import { IGenshinDiaryDetail, IGenshinDiaryInfo } from './diary.interface'
import { DiaryRoute } from './diary.route'

/**
 * A module to interact with the Genshin Impact diary endpoints of the Hoyolab API
 *
 * @public
 * @internal
 * @category Module
 */
export class DiaryModule {
  /**
   * Constructs a DiaryModule instance
   *
   * @param request - An instance of the Request class to make HTTP requests
   * @param lang - A LanguageEnum value for the language of the user
   * @param region - A string value for the region of the user
   * @param uid - A number value for the UID of the user
   */
  constructor(
    private request: Request,
    private lang: LanguageEnum,
    private region: string | null,
    private uid: number | null,
  ) {}

  /**
   * Returns the diary information of a given month for a user
   *
   * @param month - A DiaryMonthEnum value for the month of the diary information requested. Default is CURRENT.
   * @returns A promise that resolves to an IGenshinDiaryInfo object
   * @throws {@link HoyolabError} when the uid or region parameter is missing or invalid
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
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
   * Returns the diary details of a given type and month for a user
   *
   * @param type - A DiaryEnum value for the type of diary details requested
   * @param month - A DiaryMonthEnum value for the month of the diary details requested. Default is CURRENT.
   * @returns A promise that resolves to an IGenshinDiaryDetail object
   * @throws {@link HoyolabError} when the uid or region parameter is missing or invalid, or when the type or month parameter is invalid
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
   */
  async detail(
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

    responses.list.sort((a, b) => {
      const keyA = new Date(a.time)
      const keyB = new Date(b.time)

      // Compare the 2 dates
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1

      return 0
    })

    return responses as IGenshinDiaryDetail
  }
}
