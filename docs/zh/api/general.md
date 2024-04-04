# 主程序 API：常规 {#main-api-general}

## 访问静态文件

获取 Streamer 目录（ `< 1.0.0` ）下的文件。

- **方法** `GET`

- **API** `/path/to/file`

- **示例**

  例如，要访问 Streamer 目录下的 example 目录中的 index.html 文件，请使用以下 URL：

  **默认端口号** `13499`

  ```url
  http://localhost:13499/example/index.html
  ```

## 连接ws消息

连接主程序的 WebSocket 服务器，获取诸如聊天、礼物等消息。

- **API** `/websocket`

- **协议** `ws`

- **示例**

  ```js
  const webSocket = new WebSocket('ws://localhost:13499/websocket');
  ```

## 加载B站头像 {#bface}

在登录B站账号的前提下，获取用户头像的图像二进制数据。

- **方法** `GET`

- **API** `/bface/{uid}`

- **返回类型** `binary`

- **详细信息**

  当 `/Cache/bface/` 目录下存在与 uid 数字同名的图像文件时，不调用[B站接口](https://api.bilibili.com/x/web-interface/card)而是直接返回该图像，图像格式匹配遵循以下顺序：`.jpg, .png, .gif, .webp`。

  在调用网络接口获取头像图像后，会自动将图片保存至 `/Cache/bface/` 目录下，并以 uid 数字命名，保留图片原有拓展名。如：`/Cache/bface/123456.jpg`。

  ::: warning
  由于B站接口存在访问频率限制，当 API 访问间隔低于10秒时，会返回[B站默认头像](https://i0.hdslb.com/bfs/face/member/noface.jpg)的二进制数据。未被成功下载的头像会加入等待队列中，当 API 超过20秒未被访问时，会将等待队列中的用户头像缓存至 `/Cache/bface/` 目录。
  :::

- **示例**

  例如，要获取 uid 为 `123456` 的B站用户的头像图像数据，请使用以下URL：

  ```url
  http://localhost:13499/bface/123456
  ```

  在 HTML 中使用：
  ```html
  <img src="http://localhost:13499/bface/123456" alt="" />

  <img src="/bface/123456" alt="" />
  ```