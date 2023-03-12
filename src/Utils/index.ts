export * from './DynamicSecurity'
export * from './Request'
export * from './Routes'
export * from './ServerRegion'
export * from './Cookie'
export * from './String'

/* c8 ignore start */
export function delay(second: number): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(resolve, second * 1000)
  })
}
/* c8 ignore stop */
