import { HoyolabError } from '../src'

import test from 'ava'

test('Should be return HoyolabError', (t) => {
  t.throws(
    () => {
      throw new HoyolabError('Error')
    },
    {
      instanceOf: HoyolabError,
      message: 'Error',
    },
  )
})
