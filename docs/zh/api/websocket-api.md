# DimSumChat WebSocket API 详细文档

## 概述

DimSumChat 提供 WebSocket 接口用于实时接收弹幕消息、播放器状态等信息。所有消息均采用 JSON 格式传输。

### 连接信息

- **WebSocket 路径**: `ws://localhost:{port}/websocket`
- **默认端口**: `13500` (如端口被占用会自动递增)
- **消息格式**: JSON
- **编码**: UTF-8

### 通用消息结构

所有 WebSocket 消息遵循以下统一结构：

```json
{
  "type": "消息类型",
  "content": "消息内容（可以是对象、字符串或数字）"
}
```

## 消息类型详解

### 1. 组件信息交互

#### 1.1 组件信息请求 (`DimSumChatWidgetInfoRequest`)

**方向**: 服务器 -> 客户端

**触发时机**: 客户端连接建立时自动发送

**用途**: 请求 Widget 组件上报自身信息

**消息示例**:
```json
{
  "type": "DimSumChatWidgetInfoRequest",
  "content": {}
}
```

#### 1.2 组件信息响应 (`DimSumChatWidgetInfoResponse`)

**方向**: 客户端 -> 服务器

**触发时机**: 收到 `DimSumChatWidgetInfoRequest` 后应手动或自动响应

**用途**: 向服务器注册组件信息

**消息示例**:
```json
{
  "type": "DimSumChatWidgetInfoResponse",
  "content": {
    "base": "widget-name",
    "nickName": "我的组件"
  }
}
```
**字段说明**:
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| base | string | 否 | Widget 基础名称（标识符），默认为`"unknown"` |
| nickName | string | 否 | 显示昵称，用于跨组件通信 |

::: tip 提示
如果你使用 DimSum Chat 工具包，系统会**自动响应**一个默认的 `DimSumChatWidgetInfoResponse`，无需手动处理。工具包的默认响应包含以下信息：

```js
// 工具包自动响应的代码示例
switch (message.type) {
  case 'DimSumChatWidgetInfoRequest':
    response = {
      type: "DimSumChatWidgetInfoResponse",
      content: {
        base: getBaseNameFromURL(),  // 从 URL 中提取的基础名称
        url: window.location.href,   // 当前页面的完整 URL
      }
    };
}
```

如果需要自定义响应内容（例如设置昵称以支持跨组件通信），你可以手动发送 `DimSumChatWidgetInfoResponse` 消息。
:::

### 2. 房间信息 (`DimSumChatRoomInfo`)

**触发时机**: 周期性发送（间隔 30 秒）

**用途**: 告知客户端当前连接的直播平台及房间号

**支持平台**: 
- 抖音 (`douyin`)
- 快手 (`kuaishou`)
- CHZZK (`chzzk`)
- 抖音代理 (`douyin`)

**消息示例**:
```json
{
  "type": "DimSumChatRoomInfo",
  "content": {
    "platform": "douyin",
    "roomId": "7318456789012345678"
  }
}
```
**字段说明**:
| 字段 | 类型 | 说明 |
|------|------|------|
| platform | string | 平台标识：`douyin`、`kuaishou`、`chzzk` |
| roomId | string | 直播间 ID |

### 3. 播放器时间戳 (`DimSumChatPlayerTick`)

**方向**: 服务器 -> 客户端

**触发时机**: 酷狗播放器播放进度更新时

**用途**: 同步播放器当前播放时间

**消息示例**:
```json
{
  "type": "DimSumChatPlayerTick",
  "content": 125.67
}
```
**字段说明**:
| 字段 | 类型 | 说明 |
|------|------|------|
| content | number | 当前播放时间（秒），精度为毫秒 |

### 4. 播放器歌曲标题 (`DimSumChatPlayerNewTitle`)

**方向**: 服务器 -> 客户端

**触发时机**: 酷狗播放器切换歌曲时

**用途**: 通知客户端当前播放的歌曲名称

**消息示例**:
```json
{
  "type": "DimSumChatPlayerNewTitle",
  "content": "歌曲名称 - 歌手"
}
```
**字段说明**:
| 字段 | 类型 | 说明 |
|------|------|------|
| content | string | 歌曲标题（格式：歌曲名 - 歌手） |

### 5. 跨组件调用请求 (`DimSumChatCallMessageRequest`)

**方向**: 客户端 <-> 服务器 <-> 客户端

**触发时机**: Widget 之间需要相互调用时

**用途**: 实现 Widget 之间的通信，通过服务器中转消息

#### 5.1 发起调用（客户端 -> 服务器）

当需要调用其他 Widget 的功能时，发送以下消息：

**消息示例**:
```json
{
  "type": "DimSumChatCallMessageRequest",
  "content": {
    "targetNickName": "目标组件昵称",
    "requestData": {
      "action": "doSomething",
      "params": {
        "key": "value"
      }
    }
  }
}
```

**字段说明**:
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| targetNickName | string | 是 | 目标 Widget 的昵称 |
| requestData | object | 是 | 请求数据（自定义结构） |

#### 5.2 接收调用（服务器 -> 客户端）

目标 Widget 将收到转发的消息：

**消息示例**:
```json
{
  "type": "DimSumChatCallMessageRequest",
  "content": {
    "originationNickName": "发起者昵称",
    "requestData": {
      "action": "doSomething",
      "params": {
        "key": "value"
      }
    }
  }
}
```

**字段说明**:
| 字段 | 类型 | 说明 |
|------|------|------|
| originationNickName | string | 发起调用的 Widget 昵称 |
| requestData | object | 请求携带的数据（由发起方定义） |

::: tip 使用场景
跨组件调用适用于以下场景：
- Widget A 需要获取 Widget B 的数据
- Widget A 需要触发 Widget B 的某个功能
- 多个 Widget 之间需要协同工作

确保目标 Widget 已设置 `nickName`，否则无法被正确寻址。
:::

### 6. 弹幕消息

**方向**: 服务器 -> 客户端

**触发时机**: 接收到各直播平台的弹幕、礼物、点赞等事件时

**用途**: 转发直播平台的实时互动消息

**消息结构**:
```json
{
  "type": "平台特定的事件类型",
  "content": "平台原始消息数据（对象或JSON字符串）"
}
```