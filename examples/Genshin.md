# Genshin Impact

This class provides several ways that can be used to retrieve data on a genshin impact account

## Initialization

We recommend using the static method `Genshin.create()` instead of directly using the `new Genshin()` keyword.

By using the `Genshin.create()` method, you no longer need to fill in the UID because the UID will be filled in automatically based on the highest account level.

But you can also use the `new Genshin()` keyword, to use some methods that don't require a UID or by filling in the UID explicitly.

Example 1,

```javascript
import { Genshin } from '@vermaysha/hoyolab-api'

async function main() {
  const genshin = await Genshin.create({
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

Example 2

```javascript
import { Genshin } from '@vermaysha/hoyolab-api'

async function main() {
  const genshin = new Genshin({
    cookie: {
      ltuid: 1234,
      ltoken: 'YOUR LTOKEN',

      // in some case you need to fill this options, such as redeem a code
      cookieToken: 'YOUR COOKIE TOKEN',

      accountId: 1234, // if it is not filled, it will be filled exactly the same as the ltuid option
    },
    uid: 854321,
  })

  // Your next code
}

main()
```

Example 3,
If you are too lazy to parse the cookie string into the specified Object, you can also directly fill `options.cookie` with the Cookie String

```javascript
import { Genshin } from '@vermaysha/hoyolab-api'

async function main() {
  const genshin = await Genshin.create({
    cookie: 'ltuid=123; ltoken=foobar; account_id=123; cookie_token=foobar',
  })

  // Your next code
}

main()
```

## Methods List

| No  | Methods name            | Description                                                                      | UID Required |
| :-: | ----------------------- | -------------------------------------------------------------------------------- | :----------: |
|  1  | **records()**           | Fetch game records                                                               |   &check;    |
|  2  | **characters()**        | Fetch obtained genshin characters with artifact, weapon, level and constellation |   &check;    |
|  3  | **charactersSummary()** | Fetch characters summary detail (name, rarity, weapon, icon)                     |   &check;    |
|  4  | **spiralAbyss()**       | Fetch Spiral Abyss data                                                          |   &check;    |
|  5  | **dailyNote()**         | Fetch daily note resources (resin, home coin, expeditions, and transformer)      |   &check;    |
|  6  | **diaries()**           | Fetch genshin impact diary data                                                  |   &check;    |
|  7  | **diaryDetail()**       | Fetch history of received resources (primogems and mora) from diary              |   &check;    |
|  8  | **dailyInfo()**         | Fetch Daily login information                                                    |   &cross;    |
|  9  | **dailyRewards()**      | Fetch all rewards from daily login                                               |   &cross;    |
| 10  | **dailyReward()**       | Fetch reward from daily login based on day                                       |   &cross;    |
| 11  | **dailyClaim()**        | Claim current reward                                                             |   &cross;    |
| 12  | **redeemCode()**        | Redeem Code                                                                      |   &check;    |
