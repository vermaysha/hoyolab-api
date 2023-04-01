import { LanguageEnum, Request } from '../src'
import test from 'ava'

test('Request must included cookies when parameter have cookies', (t) => {
  t.assert(new Request('cookies'))
})

test('setReferer should return Request Object', (t) => {
  const req = new Request()

  t.deepEqual(req.setReferer('https://httpbin.org'), req)
})

test('setBody should return Request Object', (t) => {
  const req = new Request()

  t.deepEqual(req.setBody({ test: 'test' }), req)
})

test('setParams should return Request Object', (t) => {
  const req = new Request()

  t.deepEqual(req.setParams({ test: 'test' }), req)
})

test('setDs should return Request Object', (t) => {
  const req = new Request()

  t.deepEqual(req.setDs(true), req)
})

test('setLang should return Request Object', (t) => {
  const req = new Request()

  t.deepEqual(req.setLang(LanguageEnum.INDONESIAN), req)
})
