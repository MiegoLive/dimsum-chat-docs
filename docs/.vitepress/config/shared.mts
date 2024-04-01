import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: "DimSum Chat",
  themeConfig:{
    logo: '/img/logo.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MiegoLive/dimsum-chat-docs' }
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
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
      }
    }
  }
})