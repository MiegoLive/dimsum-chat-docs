---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: DimSum Chat
titleTemplate: 易于使用与开发的直播美化工具

hero:
  name: "DimSum Chat"
  text: "易于使用与开发的\n直播美化工具"
  tagline: 提供多直播平台接口与完整的前端操作权。非常灵活！
  actions:
    - theme: brand
      text: 用户手册
      link: /zh/user/q-a
    - theme: alt
      text: 开发者手册
      link: /zh/dev/quickstart
  image:
    src: /img/dimsum-chat-icon.png
    alt: DimSum Chat

features:
  - title: 易上手
    details: 致力于直观且无感的界面交互逻辑，让每个用户即使不阅读教程也能轻松上手。
  - title: 开放性
    details: 不断更新换代的开发者工具与开发教程，专注于简化繁琐的直播组件开发流程。
  - title: 跨平台
    details: 后端采用 Avalonia UI 与 .Net 架构，支持 Windows、Mac OS 与 Linux 等操作系统。
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #f6d365 30%, #fda085);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #f6d365 50%, #fda085 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>