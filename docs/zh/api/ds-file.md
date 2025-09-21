# 主程序 API：.ds文件

## 总览

一个点心应用（Widget）文件，通常使用 *.ds 作为文件扩展名，它是一种使用了 zip 压缩格式的压缩文档，并且内部包含一个 `guide.dimsum.json` 配置文件用于定义点心应用的基本信息和页面配置。

一个点心应用文件通常具有以下结构：

```
danmu-example.ds
├─ index.html
├─ guide.dimsum.json
└─ ...
```

## 配置文件 {guide-dimsum-json}

配置文件 `guide.dimsum.json` 用于定义点心应用的基本信息和页面配置。以下是一个基本的配置文件的结构示例：

```json
{
  "name": "弹幕样例",
  "version": "1.0.0",
  "base": "/danmu-example/",
  "description": "支持B站、B站开放平台、A站。",
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

该配置文件包含一个页面入口文件，其 URL 为：

```url
http://localhost:13499/danmu-example/index.html
```

### name

- **类型** `string`

  应用的名称，用于在点心CHAT中显示。

### version

- **类型** `string`

  应用的版本号，推荐遵循 [semver](https://semver.org/) 规范。

### base

- **类型** `string`

  应用的公共基础路径，用于指定应用的根目录，是区分每一个应用的**唯一标识**。在点心CHAT中访问应用时，会使用该路径拼接页面的路径。
  
  ::: warning
  **不同的应用应具有不同的公共基础路径名**。并规避以下关键字：`bface` `websocket`
  :::


### description

- **类型** `string`

  应用的描述信息，一般描述应用所支持的直播平台。

### pages

- **类型** `page[]`

  ```ts
  interface page {
    name: string
    path: string
    width?: number
    height?: number
    description: string
    openInBrowserAppMode: boolean
  }
  ```

  页面配置数组，用于定义应用的页面。

  #### page.name

  - **类型** `string`

    页面的名称。

  #### page.path

  - **类型** `string`

    页面的相对路径，相对于应用的公共基础路径。可包含url参数。

  #### page.width

  - **类型** `number`

    （暂未实装）页面的宽度，用于在主程序中预览。

  #### page.height

  - **类型** `number`

    （暂未实装）页面的高度，用于在主程序中预览。

  #### page.description

  - **类型** `string`

    页面的描述信息，一般描述页面的建议尺寸与推荐的布局位置。

  #### page.openInBrowserAppMode

  - **类型** `string`

    页面是否应该用浏览器的app模式打开，若设为 `true`，则仅显示一个*打开页面*按钮，而不显示URL编辑框与复制按钮。

### 多语言

点心 Chat 主程序 >= 1.4.1 支持多语言，可添加额外配置文件如 `guide.dimsum.en.json` 用于定义多语言配置。该文件需要遵循与 `guide.dimsum.json` 相同的结构。