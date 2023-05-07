import { createHash } from 'crypto'
import NodeCache from 'node-cache'

export type CacheKey = {
  url: string
  params: object
  body: object
  method: string
}

/**
 * Represents a cache object for storing and retrieving data using a key-value pair.
 *
 * @class
 * @internal
 * @category Internal
 */
export class Cache {
  /**
   * The default time-to-live (TTL) value for cached data in seconds.
   */
  private stdTTL = 30

  /**
   * The NodeCache instance used to store and retrieve data.
   */
  private nodeCache: NodeCache = new NodeCache({
    stdTTL: this.stdTTL,
  })

  /**
   * Generates a cache key based on the URL, query parameters, and body of a request.
   *
   * @param key - The key object containing the URL, query parameters, and body of the request.
   * @returns A unique MD5 hash key generated from the key object.
   */
  private generateKey(key: CacheKey): string {
    return createHash('md5').update(JSON.stringify(key)).digest('hex')
  }

  /**
   * Sets a value in the cache with a given key and TTL.
   *
   * @param key - The key object containing the URL, query parameters, and body of the request.
   * @param value - The value to be stored in the cache.
   * @param ttl - The TTL value for the cached data in seconds.
   * @returns True if the value was successfully stored in the cache, false otherwise.
   */
  public set(key: CacheKey, value: object, ttl?: number): boolean {
    if (typeof ttl === 'undefined') {
      ttl = this.stdTTL
    }

    return this.nodeCache.set(this.generateKey(key), value, ttl)
  }

  /**
   * Retrieves a value from the cache using a given key.
   *
   * @param key - The key object containing the URL, query parameters, and body of the request.
   * @returns The cached value if it exists, null otherwise.
   */
  public get(key: CacheKey): object | null | undefined {
    return this.nodeCache.get(this.generateKey(key))
  }

  /**
   * Checks if a key exists in the cache.
   *
   * @param key - The key object containing the URL, query parameters, and body of the request.
   * @returns True if the key exists in the cache, false otherwise.
   */
  public has(key: CacheKey): boolean {
    return this.nodeCache.has(this.generateKey(key))
  }

  /**
   * Deletes a key-value pair from the cache.
   *
   * @param key - The key object containing the URL, query parameters, and body of the request.
   * @returns True if the key-value pair was successfully deleted from the cache, false otherwise.
   */
  public del(key: CacheKey): number {
    return this.nodeCache.del(this.generateKey(key))
  }
}
