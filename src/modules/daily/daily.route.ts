import { Routes } from '../../routes'

export class DailyRoute {
  private static hsrActId = 'e202303301540311'
  private static hsrBase = Routes.sgPublic()

  private static giActId = 'e202102251931481'
  private static giBase = Routes.hke()

  private static hiActId = 'e202110291205111'
  private static hiBase = Routes.sgPublic()

  /** GI Daily Route */

  static giDailyInfo(): string {
    return `${this.giBase}/event/sol/info?act_id=${this.giActId}`
  }

  static giDailyReward(): string {
    return `${this.giBase}/event/sol/home?act_id=${this.giActId}`
  }

  static giDailyClaim(): string {
    return `${this.giBase}/event/sol/sign?act_id=${this.giActId}`
  }

  /** HSR Daily Route */

  static hsrDailyInfo(): string {
    return `${this.hsrBase}/event/luna/os/info?act_id=${this.hsrActId}`
  }

  static hsrDailyReward(): string {
    return `${this.hsrBase}/event/luna/os/home?act_id=${this.hsrActId}`
  }

  static hsrDailyClaim(): string {
    return `${this.hsrBase}/event/luna/os/sign?act_id=${this.hsrActId}`
  }

  /** HI Daily Route */

  static hiDailyInfo(): string {
    return `${this.hiBase}/event/mani/info?act_id=${this.hiActId}`
  }

  static hiDailyReward(): string {
    return `${this.hiBase}/event/mani/home?act_id=${this.hiActId}`
  }

  static hiDailyClaim(): string {
    return `${this.hiBase}/event/mani/sign?act_id=${this.hiActId}`
  }
}
