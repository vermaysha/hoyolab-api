import { Routes } from '../../routes'

export class HoyolabRoute {
  static games(): string {
    return `${Routes.apiAccount()}/account/binding/api/getUserGameRolesByCookieToken`
  }
}
