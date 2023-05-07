import * as dotenv from 'dotenv'
import { HonkaiImpact, ICookie, LanguageEnum } from '../../src'
dotenv.config()

export const cookie: ICookie = {
  accountId: Number(process.env.ACCOUNT_ID),
  cookieToken: process.env.COOKIE_TOKEN,
  ltoken: process.env.LTOKEN ?? '',
  ltuid: Number(process.env.LTUID ?? ''),
}

export const hi = async () => {
  return await HonkaiImpact.create({
    cookie,
    lang: LanguageEnum.ENGLISH,
  })
}
