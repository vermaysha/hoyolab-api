export interface IWeapon {
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

export interface IReliquariesSet {
  id: number
  name: string
  affixes: IReliquariesAffix[]
}

export interface IReliquaries {
  id: number
  name: string
  icon: string
  pos: number
  rarity: number
  level: number
  set: IReliquariesSet
  pos_name: string
}

export interface IReliquariesAffix {
  activation_number: number
  effect: string
}

export interface IConstellation {
  id: number
  name: string
  icon: string
  effect: string
  is_actived: boolean
  pos: number
}

export interface ICostume {
  id: number
  name: string
  icon: string
}

export interface IAvatars {
  id: number
  image: string
  icon: string
  name: string
  element: string
  fetter: number
  level: number
  rarity: number
  weapon: IWeapon
  reliquaries: IReliquaries[]
  constellations: IConstellation
  actived_constellation_num: number
  costumes: ICostume[]
  external: unknown
}

export interface IRole {
  AvatarUrl: string
  nickname: string
  region: string
  level: number
}

export interface CharacterResponse {
  avatars: IAvatars[]
  role: IRole
}
