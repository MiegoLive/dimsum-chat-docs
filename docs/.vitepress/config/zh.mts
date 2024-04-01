import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: '易于使用与开发的直播美化工具',
  themeConfig: {
    nav: [
      { text: '用户手册', link: '/zh/user/q-a' },
      { text: '开发者手册', link: '/zh/dev/quickstart' },
      { text: 'API参考', link: '/zh/api/general' },
    ],

    sidebar: {
      '/zh/api/': { base: '/zh/api/', items: sidebarApi() }
    },

    footer: {
      message: `<a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2022030336号-2</a>`,
      copyright: `版权所有 © 2023-${new Date().getFullYear()} Miego Live 糕社`
    },
  }
})

function sidebarApi(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '主程序 API',
      items: [
        { text: '常规', link: 'general' },
        { text: '.ds 文件', link: 'ds-file' },
      ]
    },
    {
      text: '工具包 API',
      items: [
        { text: 'WebSocket管理器', link: 'websocket-manager' },
        { text: '消息解析器', link: 'parser' }
      ]
    },
  ]
}