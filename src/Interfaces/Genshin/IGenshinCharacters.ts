export interface IGenshinCharacterWeapon {
  id: number
  name: string
  icon: string
  type: number
  rarity: number
  level: number
  promote_level: number
  type_name: string
  desc: string
  affix_level: number
}

export interface IGenshinCharacterReliquariesSet {
  id: number
  name: string
  affixes: IGenshinCharacterReliquariesAffix[]
}

export interface IGenshinCharacterReliquaries {
  id: number
  name: string
  icon: string
  pos: number
  rarity: number
  level: number
  set: IGenshinCharacterReliquariesSet
  pos_name: string
}

export interface IGenshinCharacterReliquariesAffix {
  activation_number: number
  effect: string
}

export interface IGenshinCharacterConstellation {
  id: number
  name: string
  icon: string
  effect: string
  is_actived: boolean
  pos: number
}

export interface IGenshinCharacterCostume {
  id: number
  name: string
  icon: string
}

export interface IGenshinCharacterBase {
  id: number
  image: string
  icon: string
  name: string
  element: string
  rarity: number
}

export interface IGenshinCharacterAvatarFull extends IGenshinCharacterBase {
  fetter: number
  level: number
  weapon: IGenshinCharacterWeapon
  reliquaries: IGenshinCharacterReliquaries[] | []
  constellations: IGenshinCharacterConstellation[]
  actived_constellation_num: number
  costumes: IGenshinCharacterCostume[] | []
  external: unknown | null
}

export interface IGenshinCharacterRole {
  AvatarUrl: string
  nickname: string
  region: string
  level: number
}

export interface IGenshinCharacters {
  avatars: IGenshinCharacterAvatarFull[]
  role: IGenshinCharacterRole
}

export interface IGenshinCharacterSummary {
  avatars: Array<
    IGenshinCharacterBase & {
      weapon_type: number
      weapon_type_name: string
    }
  >
}
