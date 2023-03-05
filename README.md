<div align="center">
  <h1>HoYoLab API - TypeScript/JavaScript HoYoLab API</h1>
  
  <p>
        <a href="https://packagist.org/packages/vermaysha/hoyolab-api">
            <img src="https://img.shields.io/npm/v/@vermaysha/hoyolab-api.svg?style=flat-square" alt="Latest Version on Packagist">
        </a>
        <a href="https://github.com/vermaysha/hoyolab-api/actions/workflows/build.yml">
            <img src="https://img.shields.io/github/actions/workflow/status/vermaysha/hoyolab-api/build.yml?branch=master&amp;label=build&amp;style=flat-square" alt="GitHub Build Action Status">
        </a>
        <a href="https://www.npmjs.com/package/@vermaysha/hoyolab-api">
            <img src="https://img.shields.io/npm/dt/@vermaysha/hoyolab-api.svg?style=flat-square" alt="Total Downloads">
        </a>
        <a href="LICENSE.md">
            <img src="https://img.shields.io/github/license/vermaysha/hoyolab-api?style=flat-square" alt="LICENSE">
        </a>
        <a href="https://github.com/vermaysha/hoyolab-api/releases/latest">
            <img src="https://img.shields.io/github/release-date/vermaysha/hoyolab-api?style=flat-square" alt="GitHub Release Date - Published_At">
        </a>
    </p>

</div>

Its unofficial HoYoLab API Wrapper for getting hoyoverse some in-game data, including Genshin Impact, Honkai Impact 3rd.

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

1. To begin, login with your [HoYoLab](https://www.hoyolab.com/home) Account.
2. Type `java` in the address bar followed by the script down below.
3. ```
   script:check = document.cookie.includes('ltoken') && document.cookie.includes('ltuid') || alert('Please logout and log back in before trying again, cookie is currently expired/invalid!'); cookie = document.cookie; check && document.write(`<p>${cookie}</p><br><button onclick="navigator.clipboard.writeText('${cookie}')">Click here to copy!</button><br>`)
   ```
4. Once you've successfully ran the script, click the Click here to copy! button to copy the cookie.
5. Finally, you can copy your cookie
