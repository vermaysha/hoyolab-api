/**
 * Get Region by given UID
 *
 * @param uid - string | number
 * @returns string
 * @throws {Error} if give invalid UID
 */
export function getRegionByUid(uid: string | number): string {
  const server_region = Number(uid.toString().slice(0, 1))
  switch (server_region) {
    case 8:
      return 'os_asia'
    case 9:
      return 'os_cht'
    case 7:
      return 'os_euro'
    case 6:
      return 'os_usa'
    default:
      throw new Error('Invalid UID')
  }
}
