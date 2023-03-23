import { Body } from './Interfaces/Request/Data'
import type {
  WikiCharactersResponse,
  WikiCharacterFilter,
} from './Interfaces/Wiki'
import { Request } from './Utils'

export class Wiki {
  /**
   * Request object
   *
   * @protected
   */
  protected request: Request

  constructor() {
    this.request = new Request()
  }

  /**
   * Get list of all characters
   *
   * @param filter WikiCharacterFilter
   */
  async getCharacters(
    filter: WikiCharacterFilter | null = null
  ): Promise<WikiCharactersResponse> {
    const responses: Array<WikiCharactersResponse> = []
    let page = 1

    do {
      const body: Body = {
        menu_id: 2,
        use_es: true,
        page_size: 30,
        page_num: page,
        filters:
          filter && Object.keys(filter).length > 0 ? Object.values(filter) : [],
      }

      this.request.setReferer('https://wiki.hoyolab.com')
      this.request.setBody(body)
      this.request.withDS()
      const res = await this.request.send('', 'post')

      responses.push(res.data)
      page++
    } while (responses[responses.length - 1].list.length > 0)

    const response = responses[0]
    responses.forEach((item, i) => {
      if (i < 1) return

      response.list = response.list.concat(item.list)
      response.total = item.total
    })

    return response
  }
}
