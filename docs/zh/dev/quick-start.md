# 快速开始

在本节中，我们将介绍如何在本地创建一个点心应用。

## 安装开发工具包

::: tip 前提条件

- 熟悉命令行
- 已安装 18.0 或更高版本的 [Node.js](https://nodejs.org/)

:::

确保你安装了最新版本的 [Node.js](https://nodejs.org/)，并且你的当前工作目录正是打算使用开发工具包的项目的目录。在命令行中运行以下命令 (不要带上 `$` 符号)：

::: code-group

```sh [npm]
$ npm add dimsum-chat
```

```sh [pnpm]
$ pnpm add dimsum-chat
```

```sh [yarn]
$ yarn add dimsum-chat
```

```sh [bun]
$ bun add dimsum-chat
```

:::

## 通过 CDN 使用开发工具包

::: danger 警告
中国大陆地区用户可能存在 CDN 访问受限问题，我们推荐你使用可访问性较高的 `fastly.jsdelivr.net` 域名。
:::

你如果不想使用 Node.js，可以借助 script 标签直接通过 CDN 来使用开发工具包：

```html
<script src="https://unpkg.com/dimsum-chat@0/dist/dimsum-chat.umd.cjs"></script>
```

这里我们使用了 unpkg，但你也可以使用任何提供 npm 包服务的 CDN，例如 [jsdelivr](https://www.jsdelivr.com/package/npm/dimsum-chat)：

```html
<script src="https://cdn.jsdelivr.net/npm/dimsum-chat@0/dist/dimsum-chat.umd.cjs"></script>
```

当然，你也可以下载此文件并自行提供服务。

通过 CDN 使用开发工具包时，不涉及“构建步骤”。这使得设置更加简单，并且可以用于增强静态的 HTML 或与后端框架集成。但是工具包内包含了大量小表情关键字及其 url 的列表，因此用户体验可能会受到 CDN 的网络传输速度的影响。

### 使用全局构建版本

上面的链接使用了*全局构建版本*的开发工具包，该版本的所有顶层 API 都以属性的形式暴露在了全局的 `DimSumChat` 对象上。这里有一个使用全局构建版本的例子：

```html
<script src="https://unpkg.com/dimsum-chat@0/dist/dimsum-chat.umd.cjs"></script>

<script>
  const { onMessage, Parser } = DimSumChat

  onMessage(msg => {
    const parser = new Parser(msg)
    console.log(parser)
  })
</script>
```

### 使用 ES 模块构建版本

在本文档的其余部分我们使用的主要是 [ES 模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)语法。现代浏览器大多都已原生支持 ES 模块。因此我们可以像这样通过 CDN 以及原生 ES 模块使用开发工具包：

```html
<script type="module">
  import { onMessage, Parser } from 'https://unpkg.com/dimsum-chat@0/dist/dimsum-chat.js'

  onMessage(msg => {
    const parser = new Parser(msg)
    console.log(parser)
  })
</script>
```

注意我们使用了 `<script type="module">`，且导入的 CDN URL 指向的是开发工具包的 **ES 模块构建版本**（非 umd 版本）。

::: info 注意
由于浏览器同源策略的限制，在使用 `type="module"` 加载 JavaScript 模块时，浏览器会要求这些模块的来源必须与包含它们的 HTML 页面的来源相同，或者遵循同源策略的规定。

但如果你使用点心 Chat 主程序提供的服务器加载 HTML 页面，则不必担心浏览器同源策略的限制。
:::

### 启用 Import maps

在上面的示例中，我们使用了完整的 CDN URL 来导入，但在文档的其余部分中，你将看到如下代码：

```js
import { onMessage } from 'dimsum-chat'
```

我们可以使用[导入映射表 (Import Maps)](https://caniuse.com/import-maps) 来告诉浏览器如何定位到导入的 `dimsum-chat`：

```html{1-7,10}
<script type="importmap">
  {
    "imports": {
      "dimsum-chat": "https://unpkg.com/dimsum-chat@0/dist/dimsum-chat.js"
    }
  }
</script>

<script type="module">
  import { onMessage, Parser } from 'dimsum-chat'

  onMessage(msg => {
    const parser = new Parser(msg)
    console.log(parser)
  })
</script>
```

你也可以在映射表中添加其他的依赖——但请务必确保你使用的是该库的 ES 模块版本。

::: warning 导入映射表的浏览器支持情况
导入映射表是一个相对较新的浏览器功能。请确保使用其[支持范围](https://caniuse.com/import-maps)内的浏览器。请注意，只有 Safari 16.4 以上版本支持。
:::

## 文件结构

假设选择在点心 Chat 主程序的目录中搭建点心应用项目，文件结构应该是这样的：

```
.
├─ Steamer
│  ├─ example-widget
│  │  ├─ guide.dimsum.json
│  │  ├─ index.html
│  │  └─ ...
│  └─ ...
└─ DimSum Chat.exe
```

为了快速开始，你可以先按以下示例完善 `guide.dimsum.json` 文件与 `index.html` 文件：

- **配置文件**

  配置文件 (`guide.dimsum.json`) 让你能够自定义点心应用的基本信息和页面配置。以下是一个基本的配置文件的结构示例：

  ```json
  {
    "name": "样例应用",
    "version": "1.0.0",
    "base": "/example-widget/",
    "description": "这是我的第一个应用，它支持所有直播平台的弹幕显示。",
    "pages": [
      {
        "name": "弹幕",
        "path": "index.html",
        "width": 400,
        "height": 600,
        "description": "建议尺寸400×600放置于任意位置。"
      }
    ]
  }
  ```

  ::: info 注意
  `base` 的属性值应该与点心应用的文件夹名称一致，并且添加 `/` 开头和结尾。
  :::

- **index.html**

  这是一个最基本的 HTML 文件，它把弹幕消息直接输出到 DOM 中。

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="referrer" content="no-referrer" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
      import { onMessage, Parser } from 'https://unpkg.com/dimsum-chat@0/dist/dimsum-chat.js'
      onMessage(msg => {
        const parser = new Parser(msg)
        if (parser.type === 'comment') {
          document.getElementById('app').innerHTML +=
            `<div>${parser.userName}：${parser.comment}</div>`;
        }
      })
    </script>
  </body>
  </html>
  ```

接下来，你可以打开点心 Chat 主程序，你将发现*样例应用*出现在了装扮页中！

尝试连接一个活跃的直播间，并在浏览器打开弹幕页面（默认情况下，URL 应该是 `http://localhost:13499/example-widget/index.html`），弹幕将在页面中正常显示。

但是，这个弹幕还有很多问题，例如 DOM 元素会永远堆积下去、页面不会正常滚动到底部、用户发送内容可能产生 XSS 攻击等。别担心，这些问题都能通过前端手段解决。

::: tip
如果在 `Streamer` 目录的子文件夹中存在 `guide.dimsum.json` 文件，并且子文件夹名称与 `base` 项内容相符，那么点心 Chat 主程序会认为这是一个合法的点心应用文件夹。
:::

## 修改项目的公共基础路径

这是简单但重要的一步，为了使得你的项目与其他作者的项目不发生冲突，你需要命名你的项目的公共基础路径，而不是使用示例中填写的 `/example-widget/`。

一般来说，公共基础路径应该遵循以下规则：

  - 仅使用小写字母与数字与 `-` 符号
  - `base` 应填写绝对 URL 路径名，例如 `/foo/`

我们也推荐您遵循 `author-theme-year-type` 的语义化格式（即 `作者-主题-年份-类型`），下面提供了一些示例：

```
moonmi-icecream-2024-danmaku
mid-autumn-2023-danmaku
terry-songlist-2023-widget
```

其中，`danmaku` 表明这是一个弹幕类型的应用，它可能包含了弹幕、礼物等消息的显示。`widget` 则表明这是一个工具类型的应用，比如点歌机等（是的，你不止可以用点心 Chat 实现弹幕样式）。

::: tip
早期由 Miego Live 官方出品的应用并未在公共基础路径包含作者信息，如 `mid-autumn-2023-danmaku`，但你无需担心会与它们冲突，因为路径中还存在年份的差别。但我们依旧建议路径中包含作者名称。
:::

确定公共基础路径的命名后，请修改配置文件 (`guide.dimsum.json`) 中的 `base` 属性值，同时重命名 `example-widget` 文件夹。

如果你使用了构建工具，可能还需要修改构建工具中的公共基础路径，将其修改为与项目的公共基础路径同名，或 `./`（用于嵌入形式的开发）。

## 下一步

- 基于你的前端知识完善这个点心应用，你还可以使用 [Vue](https://vuejs.org/) 之类的前端脚手架。

- 如果想更深入地了解主程序与开发工具提供的功能，请阅读 [API 文档](../api/general)。

- 点心应用开发完成后，务必阅读[打包指南](./pack)。