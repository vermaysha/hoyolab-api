import { Genshin, Hoyolab, Utils } from './src'

// const hoyolab = new Hoyolab({
//   cookie: {
//     ltoken: 'HVcvLnEzgN6ecfrZT5iWbvTS2AnbNhksaAGWave0',
//     ltuid: 201673439,
//     // accountId: 201673439,
//     // cookieToken: 'lQ4Utg0G4s1dXOyPJKA06TIeZFaN07y7tnbgJfFk',
//   },
// })
;(async () => {
  // const games = await hoyolab.getGames()
  // console.log(games)

  const genshin = new Genshin({
    cookie: {
      ltoken: 'HVcvLnEzgN6ecfrZT5iWbvTS2AnbNhksaAGWave0',
      ltuid: 201673439,
      // accountId: 201673439,
      // cookieToken: 'lQ4Utg0G4s1dXOyPJKA06TIeZFaN07y7tnbgJfFk',
    },
    uid: 854088741,
  })

  const res = await genshin.getDailyNotes()

  // const charDetail = await genshin.getCharactersInfo([
  //   characterrs.avatars[0].id,
  // ])

  console.log(res)
})()
