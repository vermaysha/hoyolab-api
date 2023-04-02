# Hoyolab

This class will explain how to instantiate the Hoyolab Class

## Initialization

In contrast to `Class Genshin` which provides a static method `create()`, class **Hoyolab** does not have this method, so you can do the usual way to instantiate class Hoyolab

Example 1

```javascript
import { Hoyolab } from '@vermaysha/hoyolab-api'

async function main() {
  const hoyolab = new Hoyolab({
    cookie: {
      ltuid: 1234,
      ltoken: 'YOUR LTOKEN',

      // in some case you need to fill this options, such as redeem a code
      cookieToken: 'YOUR COOKIE TOKEN',

      accountId: 1234, // if it is not filled, it will be filled exactly the same as the ltuid option
    },
  })

  // Your next code
}

main()
```

Example 2,
If you are too lazy to parse the cookie string into the specified Object, you can also directly fill `options.cookie` with the Cookie String

```javascript
import { Hoyolab } from '@vermaysha/hoyolab-api'

async function main() {
  const hoyolab = await Hoyolab.create({
    cookie: 'ltuid=123; ltoken=foobar; account_id=123; cookie_token=foobar',
  })

  // Your next code
}

main()
```

## Methods List

| No  | Methods name      | Description                              |
| :-: | ----------------- | ---------------------------------------- |
|  1  | **gamesList()**   | Get games available accounts             |
|  2  | **gameAccount()** | Select one of highest level game account |
