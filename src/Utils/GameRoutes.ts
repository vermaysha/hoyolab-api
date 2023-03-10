class GameRoutes {
  readonly webStaticUrl = 'https://webstatic-sea.hoyoverse.com/'
  readonly accountUrl = 'https://api-account-os.hoyolab.com/account/auth/api'
  readonly bbsUrl = 'https://bbs-api-os.hoyolab.com/'
  readonly bbsReferrerUrl = 'https://www.hoyolab.com/'
  readonly takumiUrl = 'https://api-os-takumi.hoyoverse.com/'
  readonly infoLedgerUrl =
    'https://sg-hk4e-api.hoyolab.com/event/ysledgeros/month_info'
  readonly detailLedgerUrl =
    'https://sg-hk4e-api.hoyolab.com/event/ysledgeros/month_detail'
  readonly rewardUrl =
    'https://sg-hk4e-api.hoyolab.com/event/sol?act_id=e202102251931481'
  readonly redeemUrl =
    'https://sg-hk4e-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey'
}

export const Routes = new GameRoutes()
