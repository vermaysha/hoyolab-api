import {
  WikiWeaponProperty,
  WikiWeaponRarity,
  WikiWeaponType,
} from '../../Enum/Wiki/Weapon'

export interface WikiWeaponFilter {
  property?: WikiWeaponProperty
  rarity?: WikiWeaponRarity
  type?: WikiWeaponType
}
