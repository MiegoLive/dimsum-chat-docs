import { defineConfig } from 'vitepress'
import { search as zhSearch } from './zh.mjs'

export const shared = defineConfig({
  title: "DimSum Chat",

  lastUpdated: true,

  themeConfig:{
    logo: '/img/logo.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MiegoLive/dimsum-chat-docs' }
    ],
    search: {
      provider: 'local',
      options: {
        locales: { ...zhSearch }
      }
    }
  }
})