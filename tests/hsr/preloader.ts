import * as dotenv from 'dotenv'
import { HonkaiStarRail, ICookie, LanguageEnum } from '../../src'
dotenv.config()

export const cookie: ICookie = {
  accountId: Number(process.env.ACCOUNT_ID),
  cookieToken: process.env.COOKIE_TOKEN,
  ltoken: process.env.LTOKEN ?? '',
  ltuid: Number(process.env.LTUID ?? ''),
}

export const hsr = async () => {
  return await HonkaiStarRail.create({
    cookie,
    lang: LanguageEnum.ENGLISH,
  })
}
