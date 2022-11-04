import { GenshinImpact } from '../src'

const client = new GenshinImpact({
  cookie: 'YOUR COOKIE',
  uid: 'YOUR UID',
})

;(async () => {
  const character = await client.getCharacters()
  console.log(character)

  const dailies = await client.getDailyRewards()
  console.log(dailies)

  const spiral = await client.getSpiralAbyss()
  console.log(spiral)

  const accounts = await client.getAccounts()
  console.log(accounts)

  const diary = await client.getDiary()
  console.log(diary)

  const redeem = await client.redeem('GENSHINGIFT')
  console.log(redeem)

  const daily = await client.claimDaily()
  console.log(daily)
})()
