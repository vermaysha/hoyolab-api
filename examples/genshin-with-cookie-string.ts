import { Genshin, Utils } from '../src'

async function main() {
  // You can also enter cookies directly from the cookie string you get from the browser.
  // But must include LTUID and LTOKEN keys
  const cookie = Utils.Cookie.parseFromString(
    'ltuid=123; ltoken=foobar; account_id=123; cookie_token=foobar'
  )

  const genshin = new Genshin({
    cookie: cookie,
    uid: 'YOUR UID',
  })

  const accountInfo = await genshin.getAccountInfo()

  console.log(accountInfo)

  // Your next code
}

main()
