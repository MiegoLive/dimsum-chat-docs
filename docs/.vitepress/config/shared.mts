import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: "DimSum Chat",
  themeConfig:{
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MiegoLive/dimsum-chat-docs' }
    ],
    search: {
      provider: 'local'
    }
  }
})