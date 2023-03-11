import { HoyoError } from '../HoyoError'
import { Region } from '../Types'

export class ServerRegion {
  static determineRegion(uid: string | number): Region {
    const server_region = Number(uid.toString().trim().slice(0, 1))

    switch (server_region) {
      case 6:
        return 'os_usa'
      case 7:
        return 'os_euro'
      case 8:
        return 'os_asia'
      case 9:
        return 'os_cht'
      default:
        throw new HoyoError(`Given UID ${uid} is invalid !`)
    }
  }
}
