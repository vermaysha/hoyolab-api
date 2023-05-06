import * as dotenv from 'dotenv'
import { GenshinImpact, ICookie, LanguageEnum } from '../../src'
dotenv.config()

export const cookie: ICookie = {
  accountId: Number(process.env.ACCOUNT_ID),
  cookieToken: process.env.COOKIE_TOKEN,
  ltoken: process.env.LTOKEN ?? '',
  ltuid: Number(process.env.LTUID ?? ''),
}

export const genshin = async () => {
  return await GenshinImpact.create({
    cookie,
    lang: LanguageEnum.ENGLISH,
  })
}
