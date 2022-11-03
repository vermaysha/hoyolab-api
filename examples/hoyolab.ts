import { Hoyolab } from '../src'

const client = new Hoyolab({
  cookie: 'YOUR COOKIE',
})

;(async () => {
  // const res = await client.getGameRecord()
  // console.log(res)

  const res = await client.getGames('hi3')
  console.log(res.list)
})()
