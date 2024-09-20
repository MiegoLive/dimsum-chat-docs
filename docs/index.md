---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: DimSum Chat 前端技术分享
titleTemplate: Use & Dev Friendly Stream Beautifier.

hero:
  name: "DimSum Chat"
  text: "Use & Dev Friendly\nStream Beautifier."
  tagline: Provide many live platform interfaces and complete front-end operation rights. Very flexible!
  actions:
    - theme: brand
      text: Chinese Translation
      link: /zh/
  image:
    src: /img/dimsum-chat-icon.png
    alt: DimSum Chat

features:
  - title: Easy to Use
    details: Dedicated to an intuitive and effortless interface interaction logic, ensuring users can easily get started without tutorials.
  - title: Openness
    details: Constantly updated developer tools and tutorials aimed at streamlining the complex widget development process.
  - title: Cross-Platform
    details: Backend built on Avalonia UI and .Net architecture, supporting Windows, Mac OS, and Linux operating systems.
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