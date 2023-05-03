# Honkai Star Rail

This class provides several ways that can be used to retrieve data on a honkai star rail account

## Initialization

We recommend using the static method `HonkaiStarRail.create()` instead of directly using the `new HonkaiStarRail()` keyword.

By using the `HonkaiStarRail.create()` method, you no longer need to fill in the UID because the UID will be filled in automatically based on the highest account level.

But you can also use the `new HonkaiStarRail()` keyword, to use some methods that don't require a UID or by filling in the UID explicitly.

Example 1,

```javascript
import { HonkaiStarRail } from '@vermaysha/hoyolab-api'

async function main() {
  const hsr = await HonkaiStarRail.create({
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
import { HonkaiStarRail } from '@vermaysha/hoyolab-api'

async function main() {
  const hsr = new HonkaiStarRail({
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
import { HonkaiStarRail } from '@vermaysha/hoyolab-api'

async function main() {
  const hsr = await HonkaiStarRail.create({
    cookie: 'ltuid=123; ltoken=foobar; account_id=123; cookie_token=foobar',
  })

  // Your next code
}

main()
```

## Methods List

| No  | Methods name            | Description                                                                      | UID Required |
| :-: | ----------------------- | -------------------------------------------------------------------------------- | :----------: |
|  1  | **dailyInfo()**         | Fetch Daily login information                                                    |   &cross;    |
|  2  | **dailyRewards()**      | Fetch all rewards from daily login                                               |   &cross;    |
| 3  | **dailyReward()**       | Fetch reward from daily login based on day                                       |   &cross;    |
| 4  | **dailyClaim()**        | Claim current reward                                                             |   &cross;    |
| 5  | **redeemCode()**        | Redeem Code                                                                      |   &check;    |
