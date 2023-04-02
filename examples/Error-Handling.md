# Error (Try Catch)

This section will explain how this library treats errors that occur.

In general all errors that occur due to user error will be thrown as a HoyolabError, eg

```javascript
import { Genshin, HoyolabError } from '@vermaysha/hoyolab-api'

async function main() {
  const client = new Genshin({ cookie })

  try {
    await client.charactersSummary([10000007])
  } catch (e) {
    console.log(e.message)
  }
}

main()
```

where the above code will produce output `UID parameter is missing or failed to be filled`
