import { name, description, repository } from '../../package.json'
import { defineConfig } from 'vuepress/config'

const repo =
  repository.url.match(/github\.com\/([\w-]+\/[\w-]+)\.git$/)?.[1] ?? undefined

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
          autoConfiguration: true,
        },
      },
    ],
  ],
})
