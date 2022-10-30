import { Hoyolab } from '../src'

const client = new Hoyolab({
  cookie:
    'cookie_token=Cr3wjVouTTANV4Ejg7KTxxHjlI6ifXZGJ0AdgEtK; account_id=122516750; ltoken=ojsMP2EsA0ufgDo9DN4kkCBwHcCfq8Gcvadpm4Td; ltuid=122516750; mi18nLang=en-us; _MHYUUID=b1f7b5c7-6019-45f6-8fd6-1f8343f52b87; DEVICEFP_SEED_ID=7da59e6eebc0c2b4; DEVICEFP_SEED_TIME=1666483337177; G_ENABLED_IDPS=google; DEVICEFP=38d7eaf59371e',
})

;(async () => {
  const res = await client.getGameRecord()
  console.log(res)
})()
