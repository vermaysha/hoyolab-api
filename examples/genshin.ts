import { Genshin } from '../src'

async function main() {
  const genshin = new Genshin({
    cookie: {
      ltuid: 'YOUR LTUID',
      ltoken: 'YOUR LTOKEN',

      // in some case you need to fill this options, such as redeem a code
      cookieToken: 'YOUR COOKIE TOKEN',

      accountId: 'YOUR ACCOUNT ID', // if it is not filled, it will be filled exactly the same as the ltuid option
    },
    uid: 'YOUR UID',
  })

  const accountInfo = await genshin.getAccountInfo()

  console.log(accountInfo)

  // Your next code
}

main()
