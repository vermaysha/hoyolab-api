export * from './DynamicSecurity'
export * from './Request'
export * from './Routes'
export * from './ServerRegion'

export function delay(second: number): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(resolve, second * 1000)
  })
}
