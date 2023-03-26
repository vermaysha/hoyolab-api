export class BaseURL {
  static readonly webStaticUrl = 'https://webstatic-sea.hoyolab.com/'
  static readonly accountUrl =
    'https://api-account-os.hoyolab.com/account/auth/api'
  static readonly bbsUrl = 'https://bbs-api-os.hoyolab.com/'
  static readonly bbsReferrerUrl = 'https://www.hoyolab.com/'
  static readonly takumiUrl = 'https://api-os-takumi.hoyolab.com/'
  static readonly sgHke4Url = 'https://sg-hk4e-api.hoyolab.com/'
  static readonly wikiUrl =
    'https://sg-wiki-api.hoyolab.com/hoyowiki/genshin/wapi/get_entry_page_list'
  static readonly wikiEntryUrl =
    'https://sg-wiki-api.hoyolab.com/hoyowiki/genshin/wapi/entry_page'
  static wikiRefererUrl = 'https://wiki.hoyolab.com'
}

/**
 * Game Routes
 *
 * Contains a set of Endpoint APIs to support processes
 * @category Private
 * @internal
 */
export class HoyolabRoutes {
  static readonly gamesList = `${BaseURL.takumiUrl}/binding/api/getUserGameRolesByCookie`
  static readonly recordsList =
    BaseURL.bbsUrl + '/game_record/card/wapi/getGameRecordCard'

  static readonly redeem =
    BaseURL.sgHke4Url + '/common/apicdkey/api/webExchangeCdkey'
}

export class GenshinRoutes {
  static readonly dailyInfo =
    BaseURL.sgHke4Url + '/event/sol/info?act_id=e202102251931481&lang=en-us'
  static readonly dailyRewards =
    BaseURL.sgHke4Url + '/event/sol/home?act_id=e202102251931481&lang=en-us'
  static readonly dailyClaim =
    BaseURL.sgHke4Url + '/event/sol/sign?act_id=e202102251931481&lang=en-us'
  static readonly dailyNotes =
    BaseURL.bbsUrl + '/game_record/genshin/api/dailyNote'

  static readonly characters =
    BaseURL.bbsUrl + '/game_record/genshin/api/character'

  static readonly spiralAbyss =
    BaseURL.bbsUrl + '/game_record/genshin/api/spiralAbyss'

  static readonly charactersInfo =
    BaseURL.bbsUrl + '/game_record/genshin/api/avatarBasicInfo'

  static readonly accountInfo =
    BaseURL.bbsUrl + '/game_record/genshin/api/index'

  static readonly diaryInfo = BaseURL.sgHke4Url + '/event/ysledgeros/month_info'
  static readonly diaryDetail =
    BaseURL.sgHke4Url + '/event/ysledgeros/month_detail'
}
