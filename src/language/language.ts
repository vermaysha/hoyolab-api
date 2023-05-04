import { LanguageEnum } from './language.interface'

export class Language {
  /**
   * Parse string to LanguageEnum
   *
   * @param lang string | null
   * @returns {LanguageEnum}
   */
  static parseLang(lang?: string | null): LanguageEnum {
    if (!lang) {
      return LanguageEnum.ENGLISH
    }

    const langKeys = Object.keys(LanguageEnum)
    const matchingKey = langKeys.find((key) => LanguageEnum[key] === lang)

    return matchingKey ? LanguageEnum[matchingKey] : LanguageEnum.ENGLISH
  }
}
