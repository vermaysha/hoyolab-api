import { Hoyolab } from '../src'

const client = new Hoyolab({
  cookie: 'YOUR COOKIE',
})

;(async () => {
  const res = await client.getGameRecord()
  console.log(res)
})()
