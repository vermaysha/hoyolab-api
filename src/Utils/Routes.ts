export class BaseURL {
  static readonly webStaticUrl = 'https://webstatic-sea.hoyolab.com/'
  static readonly accountUrl =
    'https://api-account-os.hoyolab.com/account/auth/api'
  static readonly bbsUrl = 'https://bbs-api-os.hoyolab.com/'
  static readonly bbsReferrerUrl = 'https://www.hoyolab.com/'
  static readonly takumiUrl = 'https://api-os-takumi.hoyolab.com/'
  static readonly sgHke4Url = 'https://sg-hk4e-api.hoyolab.com/'
}

/**
 * Game Routes
 *
 * Contains a set of Endpoint APIs to support processes
 * @category Private
 * @internal
 */
export class HoyolabRoutes {
  static readonly gamesList =
    BaseURL.takumiUrl + '/binding/api/getUserGameRolesByCookie'
  static readonly recordsList =
    BaseURL.bbsUrl + '/game_record/card/wapi/getGameRecordCard'
}

export class GenshinRoutes {
  static readonly dailyInfo =
    BaseURL.sgHke4Url + '/event/sol/info?act_id=e202102251931481&lang=en-us'

  static readonly dailyRewards =
    BaseURL.sgHke4Url + '/event/sol/home?act_id=e202102251931481&lang=en-us'
}
