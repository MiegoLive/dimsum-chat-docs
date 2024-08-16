# 主程序 API：常规 {#main-api-general}

## 访问静态文件

获取 Streamer 目录（ `^1.0.0` 时，为 `%AppData%/MiegoLive/DimSumChat/Widgets/` ）下的文件。

- **方法** `GET`

- **API** `/path/to/file`

- **示例**

  例如，要访问 Streamer 目录下的 example 目录中的 index.html 文件，请使用以下 URL：

  **默认端口号** `13499`

  ```url
  http://localhost:13499/example/index.html
  ```

## 连接 ws 消息

连接主程序的 WebSocket 服务器，获取诸如聊天、礼物等消息。

- **API** `/websocket`

- **协议** `ws`

- **示例**

  ```js
  const webSocket = new WebSocket('ws://localhost:13499/websocket');
  ```

  所有 ws 消息均为 json 字符串且具有以下结构：

  ```json
  {
    "type": ..., // string
    "content": ... // string | object
  }
  ```

  对于哔哩哔哩 `bilibili` 与哔哩哔哩开放平台 `openblive` 消息，`type` 的内容为对应的 `CMD` 字段，支持所有消息类型。

  哔哩哔哩开放平台消息请参考[哔哩哔哩直播开放文档](https://open-live.bilibili.com/document/f9ce25be-312e-1f4a-85fd-fef21f1637f8)。

  对于爱稀饭 `acfun` 消息，支持以下类型：

  ```
  CommonActionSignalComment
  CommonActionSignalLike
  CommonActionSignalUserEnterRoom
  CommonActionSignalUserFollowAuthor
  CommonActionSignalGift
  AcfunStateSignalDisplayInfo
  CommonStateSignalDisplayInfo
  CommonStateSignalTopUsers
  CommonStateSignalRecentComment
  ```

  对于抖音 `douyin` 消息，支持以下类型：

  ```
  WebcastChatMessage
  WebcastGiftMessage
  WebcastLikeMessage
  WebcastMemberMessage
  WebcastSocialMessage
  WebcastRoomUserSeqMessage
  WebcastFansclubMessage
  WebcastControlMessage
  ```

  ::: tip 提示
  你应该使用[消息解析器](./parser)处理大多数情况，对于某些消息解析器未提供的接口，再通过原始消息结构进行数据解析。
  :::

## 加载哔哩哔哩头像 {#bface}

在登录哔哩哔哩账号的前提下，获取用户头像的图像二进制数据。

- **方法** `GET`

- **API** `/bface/{uid}` （未来将迁移至 `/api/bface/{uid}`）

- **返回类型** `binary` （ `^1.0.0` 时，为对用户头像 URL 的 302 重定向 ）

- **详细信息**

  当 `/Cache/bface/` 目录下存在与 uid 数字同名的图像文件时，不调用[哔哩哔哩接口](https://api.bilibili.com/x/web-interface/card)而是直接返回该图像，图像格式匹配遵循以下顺序：`.jpg, .png, .gif, .webp`。

  在调用网络接口获取头像图像后，会自动将图片保存至 `/Cache/bface/` 目录下，并以 uid 数字命名，保留图片原有拓展名。如：`/Cache/bface/123456.jpg`。

  ::: warning
  由于哔哩哔哩接口存在访问频率限制，当 API 访问间隔低于10秒时，会返回[哔哩哔哩默认头像](https://i0.hdslb.com/bfs/face/member/noface.jpg)的二进制数据。未被成功下载的头像会加入等待队列中，当 API 超过20秒未被访问时，会将等待队列中的用户头像缓存至 `/Cache/bface/` 目录。
  :::

- **示例**

  例如，要获取 uid 为 `123456` 的哔哩哔哩用户的头像图像数据，请使用以下URL：

  ```url
  http://localhost:13499/bface/123456
  ```

  在 HTML 中使用：
  ```html
  <img src="http://localhost:13499/bface/123456" alt="" />

  <img src="/bface/123456" alt="" />
  ```