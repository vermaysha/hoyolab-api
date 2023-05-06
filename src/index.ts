import { GenshinImpact } from './games'

export * from './cookie'
export * from './language'
export * from './utils'
export * from './games'
export * from './request'

/**
 * The `GenshinImpact` namespace provides a collection of methods to interact with the Genshin Impact game.
 *
 * @alias {@link GenshinImpact | GenshinImpact}
 * @see {@link GenshinImpact | GenshinImpact}
 * @category Deprecated
 * @deprecated Use {@link GenshinImpact | GenshinImpact} class instead.
 */
export class Genshin extends GenshinImpact {}

export * from './modules/daily'
export * from './modules/diary'
export * from './modules/records'
export * from './modules/redeem'
