import { name, description, repository } from '../../package.json'
import { defineConfig } from 'vuepress/config'
import { Dirent, readdirSync } from 'fs'
import { join, parse, resolve } from 'path'

const repo =
  repository.url.match(/github\.com\/([\w-]+\/[\w-]+)\.git$/)?.[1] ?? undefined

function getFiles(dir: string) {
  dir = resolve(process.cwd(), dir)
  try {
    const files = readdirSync(dir, { withFileTypes: true })

    return files.map((file: Dirent) => {
      return {
        title: parse(file.name).name,
        path: `${join(
          dir.replace(resolve(process.cwd(), 'docs'), ''),
          file.name,
        )}`,
      }
    })
  } catch (ex) {
    console.error(process.cwd(), dir, readdirSync(process.cwd()))
    throw new Error(ex)
  }
}

export default defineConfig({
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
          children: getFiles('./docs/api/enums'),
        },
        {
          title: 'Interfaces',
          sidebarDepth: 4,
          children: getFiles('./docs/api/interfaces'),
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
