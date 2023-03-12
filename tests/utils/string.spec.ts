import { describe, it, expect } from '@jest/globals'
import { camel2Snake } from '../../src/Utils'

describe('Test String functionality', () => {
  it('camel2Snake return should be valid', () => {
    const text = camel2Snake('testCamelCase')

    expect(text).toBe('test_camel_case')
  })
})
