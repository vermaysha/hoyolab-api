import { Routes } from '../../routes'

export class RedeemRoute {
  static redeem() {
    return `${Routes.hke()}/common/apicdkey/api/webExchangeCdkey`
  }
}
