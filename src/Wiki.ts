import { Body } from './Interfaces/Request/Data'
import * as Interface from './Interfaces/Wiki'
import { Request, BaseURL } from './Utils'

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
   * @param filter Interface.WikiCharacterFilter | null
   */
  async getCharacters(
    filter: Interface.WikiCharacterFilter | null = null
  ): Promise<Interface.WikiCharactersResponse> {
    return (await this.getData(filter, 2)) as Interface.WikiCharactersResponse
  }

  /**
   * Get character detailed data
   *
   * @param entry_id number
   */
  async getCharacter(
    entry_id: number
  ): Promise<Interface.WikiCharacterResponse> {
    return (await this.getEntry(entry_id))
      .page as Interface.WikiCharacterResponse
  }

  /**
   * Get list of all weapons
   *
   * @param filter Interface.WikiWeaponFilter | null
   */
  async getWeapons(
    filter: Interface.WikiWeaponFilter | null = null
  ): Promise<Interface.WikiWeaponResponse> {
    return (await this.getData(filter, 4)) as Interface.WikiWeaponResponse
  }

  /**
   * Get data from HoyoWiki API
   *
   * @param filter object | null
   * @param menu_id number
   */
  private async getData(filter: object | null, menu_id: number) {
    const responses: {
      list: object[]
      total: string
    }[] = []
    let page = 1

    do {
      const body: Body = {
        menu_id,
        use_es: true,
        page_size: 30,
        page_num: page,
        filters:
          filter && Object.keys(filter).length > 0 ? Object.values(filter) : [],
      }

      this.request.setReferer(BaseURL.wikiRefererUrl)
      this.request.setBody(body)
      this.request.withDS()
      const res = await this.request.send(BaseURL.wikiUrl, 'post')

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

  /**
   * Get entry data
   *
   * @param entry_id number
   */
  private async getEntry(entry_id: number) {
    this.request.setReferer(BaseURL.wikiRefererUrl)
    this.request.setParams({
      entry_page_id: entry_id,
    })
    this.request.withDS()

    const res = await this.request.send(BaseURL.wikiEntryUrl)

    return res.data as { page: unknown }
  }
}
