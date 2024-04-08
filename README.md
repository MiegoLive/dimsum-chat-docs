<p align="center">
  <img alt="DimSum Chat logo" src="docs/public/img/dimsum-chat-icon.png" width="75px" />
  <h1 align="center">DimSum Chat Documentation</h1>
</p>

The repository holds the code and markdown source files for the DimSum Chat documentation website, which is accessible at [dimsum.chat](https://dimsum.chat)

## Index
- [Index](#index)
- [Documentation Issues](#documentation-issues)
- [Contributing](#contributing)
  - [Workflow](#workflow)
  - [Conventions](#conventions)
- [Local setup](#local-setup)
  - [Requirements](#requirements)
  - [Starting](#starting)
- [Thanks 💛](#thanks-)

## Documentation Issues
If you come across any issues with the documentation or have a feature request related explicitly to it, we encourage you to create a new [GitHub issue](https://github.com/MiegoLive/dimsum-chat-docs/issues/new). Before creating a new issue, we kindly request that you check for existing issues to avoid duplication. 

## Contributing
To contribute to DimSum Chat documentation, you need to fork this repository and submit a pull request for the Markdown and/or image changes that you're proposing.

### Workflow
The two suggested workflows are:

- For small changes, use the "Edit this page" button on each page to edit the Markdown file directly on GitHub.
- If you plan to make significant changes or preview the changes locally, clone the repo to your system to and follow the installation and local development steps in [Local setup](#local-setup).

### Conventions

- Use `kebab-case` for file and folder names.
  For example:
  - `/docs/dev/quick-start.md`
  - `/docs/api/websocket-manager.md`

- Images are important to bring the product to life and clarify the written content. For images you're adding to the repo, store them in the `img` subfolder inside `public` folder. For every topic there needs to be a folder inside `\public\img\` section, for example: `public\img\user\faq\example.png`.
  
  The [tutorial](https://vitepress.dev/zh/guide/asset-handling#base-url) on vitepress is very useful for the need to reference images.

## Local setup

### Requirements

- **Node version >= 18**

### Setup

```
pnpm install
```

### Starting 

```
pnpm run docs:dev
pnpm run docs:build
pnpm run docs:preview
```

## Thanks 💛

Thanks for all your contributions and efforts towards improving the DimSum Chat documentation. We thank you being part of our ✨ community ✨!
