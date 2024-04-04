# WebSocket 管理器

## onMessage()

注册一个回调函数，在收到主程序的 WebSocket 消息后执行。

- **类型**

  ```ts
  function onMessage(
    callback: (msg: {type: string, content: any}) => void,
    options: onMessageOptions = {}
  ): void

  interface onMessageOptions {
    customWsServer?: string | URL
  }
  ```

- **详细信息**

  第一个参数传入一个回调函数，第二个参数配置 `onMessage` 的行为。

  `onMessageOptions.customWsServer` 属性配置自定义 WebSocket 服务器地址。如果你使用前端工具链在自建服务器上测试 HTML，这会很有帮助。
  
  ::: info
  该函数的本质是 `WebSocketManager.getInstance()` `WebSocketManager.connect()` `WebSocketManager.addMessageListener()` `getWebSocketURL()` 等 API 的组合，并将消息 json 进行了反序列化。
  :::

- **示例**

  ```js
  import { onMessage } from 'dimsum-chat'

  onMessage(msg => {
    console.log(msg)
  })
  ```


## WebSocketManager.getInstance()

获取唯一的 WebSocket 管理器实例。

- **类型**

  ```ts
  class WebSocketManager {
    static getInstance(): WebSocketManager
  }
  ```

- **示例**

  ```js
  import { WebSocketManager } from 'dimsum-chat'

  const webSocketManager = WebSocketManager.getInstance()
  ```

## WebSocketManager.connect()

连接到指定的 WebSocket 服务器。

- **类型**

  ```ts
  class WebSocketManager {
    connect(url: string | URL): void;
  }
  ```

- **详细信息**

  参数为要连接的 WebSocket 服务器 URL。

  该方法仅可以被调用一次。内部实现了自动重连方法，连接断开后将每3秒尝试重新连接。

- **示例**

  ```js
  import { WebSocketManager } from 'dimsum-chat'

  const webSocketManager = WebSocketManager.getInstance()
  webSocketManager.connect('ws://localhost:13499/websocket')
  ```

## WebSocketManager.addMessageListener()

注册一个监听器，在 WebSocket 客户端收到消息后执行。

- **类型**

  ```ts
  class WebSocketManager {
    addMessageListener(listener: (message: string) => void): void;
  }
  ```

- **详细信息**

  监听器接收的消息类型为 json 字符串，你需要将其反序列化后使用。

- **示例**

  ```js
  import { WebSocketManager } from 'dimsum-chat'

  const webSocketManager = WebSocketManager.getInstance()
  webSocketManager.connect('ws://localhost:13499/websocket')

  webSocketManager.addMessageListener((msg) => {
    let msgObj = JSON.parse(msg)
    console.log(msgObj)
  })
  ```

## WebSocketManager.removeMessageListener()

移除一个已经注册的监听器。

- **类型**

  ```ts
  class WebSocketManager {
    removeMessageListener(listener: (message: string) => void): void;
  }
  ```

- **示例**

  ```js
  webSocketManager.removeMessageListener(listener)
  ```

## getWebSocketURL()

获取当前页面对应的 WebSocket 服务器 URL `${protocol}//${host}/websocket`。

- **类型**

  ```ts
  function getWebSocketURL(): string;
  ```

- **示例**

  ```js
  import { WebSocketManager } from 'dimsum-chat'

  const webSocketManager = WebSocketManager.getInstance()
  const WebSocketURL = getWebSocketURL() // ws://localhost:13499/websocket
  webSocketManager.connect(WebSocketURL)
  ```

## getBfaceURL()

获取[加载B站头像 API](./general.md#bface) 的绝对 URL。

- **类型**

  ```ts
  function getBfaceURL(uid: string | number): string;
  ```

- **示例**

  ```js
  import { getBfaceURL } from 'dimsum-chat'

  const bfaceURL = getBfaceURL(123456) // http://localhost:13499/bface/123456
  ```