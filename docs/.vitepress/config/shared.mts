import { defineConfig } from 'vitepress'
import { search as zhSearch } from './zh.mjs'

export const shared = defineConfig({
  title: "DimSum Chat",

  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/img/dimsum-chat-logo-mini.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/img/dimsum-chat-logo-mini.png' }],
    ['meta', { name: 'theme-color', content: '#f6d365' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'DimSum Chat | Use & Dev Friendly Stream Beautifier' }],
    ['meta', { property: 'og:site_name', content: 'DimSum Chat' }],
    //['meta', { property: 'og:image', content: '' }],
    ['meta', { property: 'og:url', content: 'https://dimsum.chat/' }],
  ],

  themeConfig:{
    logo: '/img/dimsum-chat-logo-mini.svg',
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