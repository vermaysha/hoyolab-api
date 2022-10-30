# Genshin API - TypeScript/JavaScript Genshin Impact API

Its unofficial Genshin Impact API Wrapper for getting some in-game data.

## Install

For NPM <br>
`npm install @vermaysha/hoyolab-api`

For Yarn <br>
`yarn install @vermaysha/hoyolab-api`

## Genshin Impact Example

```ts
import { GenshinImpact } from '@vermaysha/hoyolab-api'

const client = new GenshinImpact({
  cookie: 'YOUR COOKIE',
  uid: 'YOUR UID',
})

;(async () => {
  const character = await client.getCharacters()
  console.log(character)
```

for more example you can view here [Examples](examples)

## How to obtain HoYoLab Cookie

1. To begin, login with your [HoYoLab](http://https://www.hoyolab.com/home) Account.
2. Type `java` in the address bar followed by the script down below.
3. ```
   script:check = document.cookie.includes('ltoken') && document.cookie.includes('ltuid') || alert('Please logout and log back in before trying again, cookie is currently expired/invalid!'); cookie = document.cookie; check && document.write(`<p>${cookie}</p><br><button onclick="navigator.clipboard.writeText('${cookie}')">Click here to copy!</button><br>`)
   ```
4. Once you've successfully ran the script, click the Click here to copy! button to copy the cookie.
5. Finally, you can copy your cookie
