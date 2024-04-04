# 快速开始

## 安装开发工具包

### 前提条件

- 熟悉命令行
- 已安装 18.0 或更高版本的 [Node.js](https://nodejs.org/)

确保你安装了最新版本的 [Node.js](https://nodejs.org/)，并且你的当前工作目录正是打算使用开发工具包的项目的目录。在命令行中运行以下命令 (不要带上 $ 符号)：

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

你可以借助 script 标签直接通过 CDN 来使用开发工具包：

```html
<script src="https://unpkg.com/dimsum-chat@0/dist/dimsum-chat.umd.cjs"></script>
```

这里我们使用了 unpkg，但你也可以使用任何提供 npm 包服务的 CDN，例如 [jsdelivr](https://www.jsdelivr.com/package/npm/dimsum-chat)：

```html
<script src="https://cdn.jsdelivr.net/npm/dimsum-chat@0/dist/dimsum-chat.umd.cjs"></script>
```

当然，你也可以下载此文件并自行提供服务。

通过 CDN 使用 Vue 时，不涉及“构建步骤”。这使得设置更加简单，并且可以用于增强静态的 HTML 或与后端框架集成。但是工具包内包含了大量小表情关键字及其 url 的列表，因此用户体验可能会收到网络传输速度的影响。

### 使用全局构建版本

上面的链接使用了全局构建版本的开发工具包，该版本的所有顶层 API 都以属性的形式暴露在了全局的 DimSumChat 对象上。这里有一个使用全局构建版本的例子：

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

在本文档的其余部分我们使用的主要是 [ES 模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)语法。现代浏览器大多都已原生支持 ES 模块。因此我们可以像这样通过 CDN 以及原生 ES 模块使用 Vue：

```html
<script type="module">
  import { onMessage, Parser } from 'https://unpkg.com/dimsum-chat@0/dist/dimsum-chat.js'

  onMessage(msg => {
    const parser = new Parser(msg)
    console.log(parser)
  })
</script>
```

注意我们使用了 `<script type="module">`，且导入的 CDN URL 指向的是开发工具包的 ES 模块构建版本（非 umd 版本）。

::: info
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