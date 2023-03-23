import {
  WikiCharAscencion,
  WikiCharElemental,
  WikiCharRarity,
  WikiCharRegion,
  WikiCharWeapon,
} from '../../Enum/Wiki/Character'

export interface WikiCharacterFilter {
  ascencion?: WikiCharAscencion
  rarity?: WikiCharRarity
  weapon?: WikiCharWeapon
  elemental?: WikiCharElemental
  region?: WikiCharRegion
}
