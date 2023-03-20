import { Hoyolab, Enum } from '../src'

async function main() {
  const hoyolab = new Hoyolab({
    cookie: {
      ltuid: 'YOUR LTUID',
      ltoken: 'YOUR LTOKEN',

      // in some case you need to fill this options, but you can leave it blank
      cookieToken: 'YOUR COOKIE TOKEN',

      accountId: 'YOUR ACCOUNT ID', // if it is not filled, it will be filled exactly the same as the ltuid option
    },
  })

  const games = await hoyolab.getGames(Enum.Games.ALL)

  console.log(games)
  // Your next code
}

main()
