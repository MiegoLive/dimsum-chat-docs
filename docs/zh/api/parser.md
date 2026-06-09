<!--
  MAINTAINER: 修改 Parser 属性列表时，必须同步更新 docs/public/llm/parser-types.txt。
  parser-types.txt 是 AI Agent 使用的权威类型声明，属性名/类型/平台可用性必须与本文一致。
  两文件维护约定：
  1. SDK 源码变更 → 先更新 parser-types.txt（逐字段对照源码）
  2. 再更新本文（补充用法示例和详细说明）
  3. 两文件加/删属性时必须互相核对
-->

# 消息解析器

## new Parser()

创建一个消息解析器。

- **类型**

  ```ts
  class Parser{
    public constructor(rawMsg: {type: string, content: any})
  }
  ```

- **详细信息**

  消息解析器用于把主程序发送的直播间消息解析为便于使用的对象，并且最大程度地兼容了各个直播平台的消息结构。

  ::: tip
  消息解析器拥有属性值缓存机制，仅会在初次访问该对象的属性时产生少量的计算，因此您可以毫无负担地使用它。
  :::

- **示例**

  ```js
  import { Parser, onMessage } from 'dimsum-chat'

  onMessage((msg) => {
    const parser = new Parser(msg)
    console.log(parser)
  })

  // 在 0.1.4 之后，onMessage 的回调函数会额外传入一个 Parser 对象
  onMessage((_msg, parser) => {
    console.log(parser)
  })
  ```

---

## parser.rawType

原始消息类型。

- **类型** `string`

- **支持平台** 全平台

---

## parser.rawContent

原始消息内容。

::: warning
来自 `bilibili` 与 `openblive` 的原始消息为 json 字符串，但存入 `rawContent` 前会被反序列化。

因此，当您需要使用原始消息的内容时，无需再次对其反序列化。
:::

- **类型** `any`

- **支持平台** 全平台

---

## parser.platform

消息所属直播平台。

- **类型** `'acfun' | 'openblive' | 'bilibili' | 'douyin' | 'kuaishou' | 'chzzk' | undefined`

- **支持平台** 全平台

---

## parser.type

消息类型。

- **类型**

  ```ts
  type MessageType = 'comment' | 'gift' | 'follow' | 'joinclub' | 'like' |
                    'guard' | 'superchat' | 'enter' | 'share' | undefined;
  ```

- **详细信息**

  `guard` 与 `superchat` 类型的消息原本为 `bilibili` 与 `openblive` 平台的消息。出于兼容性考虑，Chzzk 平台的 Donation 事件被归类为 `superchat` 类型，Subscription 事件被归类为 `guard` 类型。Subscription 事件的 Tier 1 与 Tier 2 分别被映射为 `guardLevel` 属性的 `3` 与 `2` 值。

- **支持平台** 全平台

---

## parser.userName

用户名。

- **类型** `string | undefined`

- **支持平台** 全平台

---

## parser.uid

用户 ID。对于 Chzzk 平台可能返回 `"anonymous"`。

- **类型** `number | string | undefined`

- **支持平台** 全平台

---

## parser.avatar

用户头像 URL。

::: tip B 站头像跨域问题
B 站头像 URL 存在跨域限制，建议配合 `getBfaceURL()` 使用：

```js
const avatar = parser.platform === 'bilibili' && parser.uid
  ? getBfaceURL(parser.uid)
  : parser.avatar
```
:::

- **类型** `string | undefined`

- **支持平台** bilibili、openblive、acfun、douyin、kuaishou

---

## parser.clubLevel

粉丝团/守护团等级。

- **类型** `number | undefined`

- **支持平台** bilibili、openblive、acfun、douyin

---

## parser.clubName

粉丝团/守护团名称。

- **类型** `string | undefined`

- **支持平台** bilibili、openblive、acfun、douyin

---

## parser.acfunClubUid

Acfun 守护团所属主播的用户 ID。

- **类型** `number | undefined`

- **支持平台** acfun

---

## parser.douyinSubscribe

用户在当前抖音直播间的会员订阅情况。

- **类型** `0 | 1 | 2 | undefined`

- **详细信息**

  `0` 为非会员，`1` 为月费会员，`2` 为年费会员。

- **支持平台** douyin

---

## parser.comment

弹幕聊天内容。

::: tip
当 `parser.type` 为 `comment` 或 `superchat` 时，此属性均有值。
对于 `superchat` 消息，`comment` 与 `superChatComment` 返回相同内容。
:::

- **类型** `string | undefined`

- **支持平台** 全平台（仅在 `type=comment` 或 `type=superchat` 时有值）

---

## parser.getCommentHTML()

简单地将评论构造为 HTML 字符串。这在一般情况下构造评论消息的渲染内容时很有用。

返回的 HTML 已做 XSS 安全转义，可以直接设置到 `innerHTML`。

- **类型**

  ```ts
  class Parser {
    getCommentHTML(options?: commentParseOptions): string | undefined
  }

  interface commentParseOptions {
    stickerStyle?: string;
    stickerClass?: string;
    emotStyle?: string;
    emotClass?: string;
    acfunCustomStickers?: {
      keyWord: string;
      path: string;
    }[];
    acfunCustomHtmlBuilder?: (stickerPath: string, content: string) => string;
  }
  ```

- **详细信息**

  `stickerStyle` 贴纸表情的 css 样式。

  `stickerClass` 贴纸表情的 css 类。

  当消息为贴纸表情类消息时，仅返回一个 img 元素的 HTML 字符串：

  ```html
  <img src="${stickerUrl}" alt="" style="${stickerStyle}" class="${stickerClass}">
  ```

  `emotStyle` 小表情的 css 样式。

  `emotClass` 小表情的 css 类。

  当消息不为贴纸表情类消息，且包含小表情时，小表情关键词将替换为 img 元素的 HTML 字符串：

  ```html
  <img src="${emotUrl}" alt="" style="${emotStyle}" class="${emotClass}">
  ```

  `acfunCustomStickers` 自定义 acfun 贴纸表情。当且仅当 `platform` 为 `'acfun'` 时生效。

  `acfunCustomHtmlBuilder` 自定义 acfun 评论 HTML 的构建器。默认构建器为格式化字符串：

  ```html
  <div style="display:flex;">
  <img src="${stickerPath}" alt="" style="${stickerStyle}" class="${stickerClass}">
  <div style="flex-grow:1;">${content}</div>
  </div>
  ```

- **支持平台** 全平台（仅在 `type=comment` 时有值）


## parser.CommentBuilder()

自定义评论内容构建器。相比 `getCommentHTML()` 提供更灵活的控制。

- **类型**

  ```ts
  class Parser {
    CommentBuilder(
      builder: (
        comment: string,
        stickerUrl?: string,
        emots?: [string, string][]
      ) => string
    ): string | undefined;
  }
  ```

- **详细信息**

  参数是一个构建函数，返回你构建的评论字符串。

  `comment` 是经过 HTML 安全转义后的弹幕聊天内容。若要使用原始内容，请使用 `parser.comment`。

  `stickerUrl` 是B站贴纸表情的图片 URL。

  `emots` 是小表情的 URL 列表，`emots[i][0]` 为关键词，`emots[i][1]` 为小表情的图片 URL。

- **示例**

```js
const comment = parser.CommentBuilder((comment, stickerUrl, emots) => {
  // 如果为贴纸表情，则不需要显示文字内容
  if (stickerUrl !== undefined) {
    return '';
  }
  let content = comment;
  if (emots !== undefined) {
    // 将小表情关键词替换为图片元素字符串
    emots.forEach(emot => {
      const re = new RegExp(`\\${emot[0]}`, "g");
      content = content.replace(re,
      `<img style="display:inline-block;vertical-align:baseline;height:32px;"
      src="${emot[1]}" alt="">`);
    });
  }
  return content;
});
```

- **支持平台** 全平台（仅在 `type=comment` 时有值）

---

## parser.guardLevel

大航海等级 / 大航海购买等级。

- **类型** `0 | 3 | 2 | 1 | undefined`

- **详细信息**

  `0` 为路人，`3` 为舰长，`2` 为提督，`1` 为总督。

  当 `type` 为 `guard` 时，表示本次购买的大航海等级；其它消息类型中表示该用户当前的大航海等级。

  Chzzk 平台的 Subscription 事件也支持此属性，Tier 1 映射为 `3`（舰长），Tier 2 映射为 `2`（提督），非订阅用户返回 `0`。

- **支持平台** bilibili、openblive、chzzk

---

## parser.guardNum

大航海购买数量。B 站表示购买月数，Chzzk 表示订阅月数。

- **类型** `number | undefined`

- **支持平台** bilibili、openblive、chzzk

---

## parser.guardPrice

大航海购买价格（CNY）。

- **类型** `number | undefined`

- **支持平台** bilibili、openblive

---

## parser.chzzkTier

Chzzk 订阅等级（1–3）。

- **类型** `number | undefined`

- **支持平台** chzzk

---

## parser.chzzkTierMonth

Chzzk 订阅月数。

- **类型** `number | undefined`

- **支持平台** chzzk

---

## parser.giftName

礼物名称。

- **类型** `string | undefined`

- **支持平台** acfun、bilibili、openblive、douyin、kuaishou（仅在 `type=gift` 时有值）

---

## parser.giftNum

礼物数量。抖音和快手已由 SDK 内部处理连击去重，每次返回增量值，开发者无需额外处理。

- **类型** `number | undefined`

- **支持平台** acfun、bilibili、openblive、douyin、kuaishou（仅在 `type=gift` 时有值）

---

## parser.giftUnitPrice

单个礼物价格（CNY）。免费礼物（如 B 站银瓜子）返回 `0`。

- **类型** `number | undefined`

- **支持平台** acfun、bilibili、openblive、douyin、kuaishou（仅在 `type=gift` 时有值）

---

## parser.giftTotalPrice

礼物总价值（CNY）。等价于 `giftNum * giftUnitPrice`。

- **类型** `number | undefined`

- **支持平台** 全平台（依赖 `giftNum` 与 `giftUnitPrice` 均有值时返回）

---

## parser.giftImage

礼物图片 URL。

- **类型** `string | undefined`

- **支持平台** acfun、bilibili、openblive、douyin、kuaishou（仅在 `type=gift` 时有值）

---

## parser.superChatComment

超级聊天评论内容。

- **类型** `string | undefined`

- **支持平台** bilibili、openblive、chzzk（仅在 `type=superchat` 时有值）

---

## parser.superChatPrice

超级聊天价格。B 站与 OpenBLive 为人民币（元），Chzzk 为韩元（KRW）。

- **类型** `number | undefined`

- **支持平台** bilibili、openblive、chzzk（仅在 `type=superchat` 时有值）

---

## parser.price

广义价格，根据消息类型自动选择对应的价格属性：

| 消息类型     | 对应属性            |
|------------|-------------------|
| `gift`     | `giftTotalPrice`  |
| `superchat`| `superChatPrice`  |
| `guard`    | `guardPrice`      |
| 其它       | `undefined`       |

- **类型** `number | undefined`

- **支持平台** 全平台

---

## parser.getAbstractLevel()

获取用户的抽象化分级。如果你将用户的渲染样式进行了多种等级区分，这会很有帮助。

- **类型**

  ```ts
  class Parser {
    getAbstractLevel(options?: abstractLevelOptions): number | undefined;
  }

  interface abstractLevelOptions {
    douyinSteps?: number[]
    kuaishouSteps?: number[]
    acfunSteps?: number[]
    acfunClubUid?: number
  }
  ```

- **详细信息**

  `douyinSteps`、`kuaishouSteps`、`acfunSteps` 默认值均为 `[7, 11, 15]`。

  以默认值为例，当 `clubLevel <= 7` 时返回 `0`，`<= 11` 返回 `1`，`<= 15` 返回 `2`，`> 15` 返回 `3`。

  各平台的映射规则：

  | 平台        | 映射方式                                                   |
  |-----------|---------------------------------------------------------|
  | douyin    | 根据 `clubLevel` 和 `douyinSteps` 分段映射为 0–3          |
  | kuaishou  | 根据 `clubLevel` 和 `kuaishouSteps` 分段映射为 0–3        |
  | acfun     | 根据 `clubLevel` 和 `acfunSteps` 分段映射为 0–3；<br>若设置了 `acfunClubUid`，只有当 `acfunClubUid === 目标主播 UID` 时才返回 >0 的值 |
  | bilibili / openblive | 根据 `guardLevel` 转换为 0–3（总督→3、提督→2、舰长→1、无→0） |
  | chzzk     | 直接使用 `chzzkTier` 的值                                  |

  ::: warning
  B 站与 OpenBLive 的返回值为总督=3、提督=2、舰长=1、无=0，这与 `guardLevel` 的数值关系（总督=1、提督=2、舰长=3、无=0）是**相反**的，请留意区分。
  :::

---

## 消息类型与属性速查

下表列出了各消息类型下**有值**的核心属性。未列出的属性在该类型下可能返回 `undefined`，需做空值检查。

| 属性              | comment | gift | guard | superchat | like | follow | enter |
|------------------|:-------:|:----:|:-----:|:---------:|:----:|:------:|:-----:|
| `userName`       | ✔       | ✔    | ✔     | ✔         | ✔    | ✔      | ✔     |
| `uid`            | ✔       | ✔    | ✔     | ✔         | ✔    | ✔      | ✔     |
| `avatar`         | ✔       | ✔    | —     | —         | —    | —      | —     |
| `comment`        | ✔       | —    | —     | ✔         | —    | —      | —     |
| `giftName`       | —       | ✔    | —     | —         | —    | —      | —     |
| `giftNum`        | —       | ✔    | —     | —         | —    | —      | —     |
| `giftImage`      | —       | ✔    | —     | —         | —    | —      | —     |
| `giftUnitPrice`  | —       | ✔    | —     | —         | —    | —      | —     |
| `giftTotalPrice` | —       | ✔    | —     | —         | —    | —      | —     |
| `guardLevel`     | ✔       | —    | ✔     | —         | —    | —      | —     |
| `guardNum`       | —       | —    | ✔     | —         | —    | —      | —     |
| `guardPrice`     | —       | —    | ✔     | —         | —    | —      | —     |
| `superChatComment`| —      | —    | —     | ✔         | —    | —      | —     |
| `superChatPrice` | —       | —    | —     | ✔         | —    | —      | —     |
| `price`          | —       | ✔    | ✔     | ✔         | —    | —      | —     |
| `clubLevel`      | ✔       | —    | —     | ✔         | —    | —      | —     |
| `clubName`       | ✔       | —    | —     | ✔         | —    | —      | —     |
