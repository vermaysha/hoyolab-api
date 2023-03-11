import { HoyoError } from '../../src/HoyoError'
import { ServerRegion } from './../../src/Utils/ServerRegion'
import { describe, it, expect } from '@jest/globals'

describe('Test Server Region Class', () => {
  it('Should be os_usa', () => {
    const region = ServerRegion.determineRegion('634523323')

    expect(region).toBe('os_usa')
  })

  it('Should be os_euro', () => {
    const region = ServerRegion.determineRegion('734523323')

    expect(region).toBe('os_euro')
  })

  it('Should be os_asia', () => {
    const region = ServerRegion.determineRegion('834523323')

    expect(region).toBe('os_asia')
  })

  it('Should be os_cht', () => {
    const region = ServerRegion.determineRegion('934523323')

    expect(region).toBe('os_cht')
  })

  it('Should be throw error', () => {
    expect(() => {
      ServerRegion.determineRegion('023324231')
    }).toThrow(HoyoError)
  })
})
