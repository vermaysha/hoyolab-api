import { name, description, repository } from '../../package.json'
import { defineConfig } from 'vuepress/config'

const repo =
  repository.url.match(/github\.com\/([\w-]+\/[\w-]+)\.git$/)?.[1] ?? undefined

export default defineConfig({
  base: '/hoyolab-api/',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: name,
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description,

  dest: '',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo,
    repoLabel: 'GitHub',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    searchPlaceholder: 'Search...',
    smoothScroll: true,
    // displayAllHeaders: true,
    nav: [
      {
        text: 'Guide',
        link: '/guide/get-started',
      },
      {
        text: 'API Reference',
        link: '/api/',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          sidebarDepth: 2,
          initialOpenGroupIndex: -1,
          children: [
            {
              title: 'Get Started',
              path: '/guide/get-started',
            },
            {
              title: 'HoYoLab',
              path: '/guide/hoyolab',
            },
            {
              title: 'Genshin Impact',
              path: '/guide/genshin-impact',
            },
            {
              title: 'Honkai Impact 3rd',
              path: '/guide/honkai-impact',
            },
            {
              title: 'Honkai: Star Rail',
              path: '/guide/honkai-star-rail',
            },
            {
              title: 'Error Handling',
              path: '/guide/error-handling',
            },
          ],
        },
      ],
      '/api/': [
        {
          title: 'Main',
          collapsable: true,
          sidebarDepth: 4,
          initialOpenGroupIndex: -1,
          children: [
            {
              title: 'Hoyolab',
              path: '/api/classes/Hoyolab',
            },
            {
              title: 'Genshin Impact',
              path: '/api/classes/GenshinImpact',
            },
            {
              title: 'Honkai Impact 3rd',
              path: '/api/classes/HonkaiImpact',
            },
            {
              title: 'Honkai: Star Rail',
              path: '/api/classes/HonkaiStarRail',
            },
          ],
        },
        {
          title: 'Utilites',
          collapsable: true,
          sidebarDepth: 4,
          children: [
            {
              title: 'Cookie',
              path: '/api/classes/Cookie',
            },
            {
              title: 'Language',
              path: '/api/classes/Language',
            },
            {
              title: 'HoyolabError',
              path: '/api/classes/HoyolabError',
            },
          ],
        },
        {
          title: 'Modules',
          // collapsable: false,
          sidebarDepth: 4,
          // initialOpenGroupIndex: -1,
          children: [
            {
              title: 'DailyModule',
              path: '/api/classes/DailyModule',
            },
            {
              title: 'DiaryModule',
              path: '/api/classes/DiaryModule',
            },
            {
              title: 'RecordModule',
              path: '/api/classes/RecordModule',
            },
            {
              title: 'RedeemModule',
              path: '/api/classes/RedeemModule',
            },
          ],
        },
        {
          title: 'Enums',
          sidebarDepth: 4,
          children: [
            {
              title: 'AbyssScheduleEnum',
              path: '/api/enums/AbyssScheduleEnum.md',
            },
            {
              title: 'DiaryEnum',
              path: '/api/enums/DiaryEnum.md',
            },
            {
              title: 'DiaryMonthEnum',
              path: '/api/enums/DiaryMonthEnum.md',
            },
            {
              title: 'GamesEnum',
              path: '/api/enums/GamesEnum.md',
            },
            {
              title: 'GenshinRegion',
              path: '/api/enums/GenshinRegion.md',
            },
            {
              title: 'HonkaiRegion',
              path: '/api/enums/HonkaiRegion.md',
            },
            {
              title: 'HsrRegion',
              path: '/api/enums/HsrRegion.md',
            },
            {
              title: 'LanguageEnum',
              path: '/api/enums/LanguageEnum.md',
            },
          ],
        },
        {
          title: 'Interfaces',
          sidebarDepth: 4,
          children: [
            {
              title: 'ICookie',
              path: '/api/interfaces/ICookie.md',
            },
            {
              title: 'IDailyAwardItem',
              path: '/api/interfaces/IDailyAwardItem.md',
            },
            {
              title: 'IDailyClaim',
              path: '/api/interfaces/IDailyClaim.md',
            },
            {
              title: 'IDailyInfo',
              path: '/api/interfaces/IDailyInfo.md',
            },
            {
              title: 'IDailyReward',
              path: '/api/interfaces/IDailyReward.md',
            },
            {
              title: 'IDailyRewards',
              path: '/api/interfaces/IDailyRewards.md',
            },
            {
              title: 'IGame',
              path: '/api/interfaces/IGame.md',
            },
            {
              title: 'IGamesList',
              path: '/api/interfaces/IGamesList.md',
            },
            {
              title: 'IGenshinCharacterAvatarFull',
              path: '/api/interfaces/IGenshinCharacterAvatarFull.md',
            },
            {
              title: 'IGenshinCharacterBase',
              path: '/api/interfaces/IGenshinCharacterBase.md',
            },
            {
              title: 'IGenshinCharacterConstellation',
              path: '/api/interfaces/IGenshinCharacterConstellation.md',
            },
            {
              title: 'IGenshinCharacterCostume',
              path: '/api/interfaces/IGenshinCharacterCostume.md',
            },
            {
              title: 'IGenshinCharacterReliquaries',
              path: '/api/interfaces/IGenshinCharacterReliquaries.md',
            },
            {
              title: 'IGenshinCharacterReliquariesAffix',
              path: '/api/interfaces/IGenshinCharacterReliquariesAffix.md',
            },
            {
              title: 'IGenshinCharacterReliquariesSet',
              path: '/api/interfaces/IGenshinCharacterReliquariesSet.md',
            },
            {
              title: 'IGenshinCharacterRole',
              path: '/api/interfaces/IGenshinCharacterRole.md',
            },
            {
              title: 'IGenshinCharacterSummary',
              path: '/api/interfaces/IGenshinCharacterSummary.md',
            },
            {
              title: 'IGenshinCharacterWeapon',
              path: '/api/interfaces/IGenshinCharacterWeapon.md',
            },
            {
              title: 'IGenshinCharacters',
              path: '/api/interfaces/IGenshinCharacters.md',
            },
            {
              title: 'IGenshinDailyNote',
              path: '/api/interfaces/IGenshinDailyNote.md',
            },
            {
              title: 'IGenshinDiaryBase',
              path: '/api/interfaces/IGenshinDiaryBase.md',
            },
            {
              title: 'IGenshinDiaryDetail',
              path: '/api/interfaces/IGenshinDiaryDetail.md',
            },
            {
              title: 'IGenshinDiaryHistory',
              path: '/api/interfaces/IGenshinDiaryHistory.md',
            },
            {
              title: 'IGenshinDiaryInfo',
              path: '/api/interfaces/IGenshinDiaryInfo.md',
            },
            {
              title: 'IGenshinOptions',
              path: '/api/interfaces/IGenshinOptions.md',
            },
            {
              title: 'IGenshinRecord',
              path: '/api/interfaces/IGenshinRecord.md',
            },
            {
              title: 'IGenshinRecordAvatar',
              path: '/api/interfaces/IGenshinRecordAvatar.md',
            },
            {
              title: 'IGenshinRecordHome',
              path: '/api/interfaces/IGenshinRecordHome.md',
            },
            {
              title: 'IGenshinRecordStat',
              path: '/api/interfaces/IGenshinRecordStat.md',
            },
            {
              title: 'IGenshinRecordWorldExploration',
              path: '/api/interfaces/IGenshinRecordWorldExploration.md',
            },
            {
              title: 'IGenshinSpiralAbyss',
              path: '/api/interfaces/IGenshinSpiralAbyss.md',
            },
            {
              title: 'IGenshinSpiralAbyssAvatar',
              path: '/api/interfaces/IGenshinSpiralAbyssAvatar.md',
            },
            {
              title: 'IGenshinSpiralAbyssBattle',
              path: '/api/interfaces/IGenshinSpiralAbyssBattle.md',
            },
            {
              title: 'IGenshinSpiralAbyssFloor',
              path: '/api/interfaces/IGenshinSpiralAbyssFloor.md',
            },
            {
              title: 'IGenshinSpiralAbyssLevel',
              path: '/api/interfaces/IGenshinSpiralAbyssLevel.md',
            },
            {
              title: 'IGenshinSpiralAbyssRank',
              path: '/api/interfaces/IGenshinSpiralAbyssRank.md',
            },
            {
              title: 'IHi3Options',
              path: '/api/interfaces/IHi3Options.md',
            },
            {
              title: 'IHoyolabOptions',
              path: '/api/interfaces/IHoyolabOptions.md',
            },
            {
              title: 'IHsrOptions',
              path: '/api/interfaces/IHsrOptions.md',
            },
            {
              title: 'IRedeemCode',
              path: '/api/interfaces/IRedeemCode.md',
            },
            {
              title: 'IResponse',
              path: '/api/interfaces/IResponse.md',
            },
          ],
        },
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-pwa',
    [
      'vuepress-plugin-typedoc',

      // plugin options
      {
        entryPoints: ['./src/index.ts'],
        tsconfig: './tsconfig.json',
        sidebar: {
          autoConfiguration: false,
        },
      },
    ],
  ],
})
