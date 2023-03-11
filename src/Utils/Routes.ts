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
