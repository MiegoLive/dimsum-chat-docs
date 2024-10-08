import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: '易于使用与开发的直播美化工具',
  themeConfig: {
    nav: [
      { text: '用户手册', link: '/zh/user/first-use', activeMatch: '/zh/user/' },
      { text: '开发者手册', link: '/zh/dev/what-is-dimsum-chat', activeMatch: '/zh/dev/' },
      { text: 'API参考', link: '/zh/api/general', activeMatch: '/zh/api/' },
    ],

    sidebar: {
      '/zh/dev/': { base: '/zh/dev/', items: sidebarDev() },
      '/zh/api/': { base: '/zh/api/', items: sidebarApi() },
      '/zh/user/': { base: '/zh/user/', items: sidebarUser() },
    },

    editLink: {
      pattern: 'https://github.com/MiegoLive/dimsum-chat-docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    footer: {
      message: `<a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2022030336号-2</a>`,
      copyright: `版权所有 © 2023-${new Date().getFullYear()} Miego Live 糕社`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})

function sidebarUser(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '基础',
      items: [
        { text: '初次使用', link: 'first-use'},
        { text: '问题自检', link: 'self-check'},
      ]
    },

  ]
}

function sidebarDev(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '简介',
      items: [
        { text: '什么是 DimSum Chat？', link: 'what-is-dimsum-chat' },
        { text: '快速开始', link: 'quick-start' },
        { text: '打包', link: 'pack' },
      ]
    },
    {
      text: '最佳实践',
      items: [
        { text: '使用项目模板', link: 'use-template' },
      ]
    },
    {
      items: [
        { text: '更新历史', link: 'update-history' },
      ]
    },
  ]
}

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

export const search: DefaultTheme.LocalSearchOptions['locales'] = {
  zh: {
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档'
      },
      modal: {
        noResultsText: '无法找到相关结果',
        resetButtonTitle: '清除查询条件',
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭'
        }
      }
    }
  }
}