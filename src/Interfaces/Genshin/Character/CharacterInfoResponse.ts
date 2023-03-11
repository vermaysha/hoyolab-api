export interface CharacterInfoResponse {
  avatars:
    | {
        id: number
        image: string
        icon: string
        name: string
        element: string
        rarity: number
        weapon_type: number
        weapon_type_name: string
      }[]
    | []
}
