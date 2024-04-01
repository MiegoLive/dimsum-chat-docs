import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

export const en = defineConfig({
  lang: 'en',
  description: 'Stream Beautifier by Miego Live.',
  themeConfig: {
    footer: {
      message: `<a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2022030336号-2</a>`,
      copyright: `© 2023-${new Date().getFullYear()} Miego Live All Rights Reserved.`
    },
  }
})