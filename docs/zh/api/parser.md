# 消息解析器

## new Parser()

创建一个消息解析器。

- **类型**

  ```ts
  class Parser{
    public constructor(rawMsg: {type: string, content: any})
  }
  ```

- **示例**

  ```js
  import { Parser, onMessage } from 'dimsum-chat'

  onMessage(msg => {
    const parser = new Parser(msg)
    console.log(parser)
  })
  ```

## parser.rawType

原始消息类型。

- **类型** `string` 

## parser.rawContent

原始消息内容。

- **类型** `any` 

## parser.platform

消息所属直播平台。

- **类型** `'acfun' | 'openblive' | 'bilibili' | 'douyin' | undefined` 

## parser.type

消息类型。

- **类型**

  ```ts
  type MessageType = 'comment' | 'gift' | 'follow' | 'joinclub' | 'like' | 
                    'guard' | 'superchat' | 'enter' | 'share' | undefined;
  ```

## parser.userName

用户名。

- **类型** `string | undefined`

## parser.uid

用户ID。

- **类型** `number | string | undefined`

## parser.clubLevel

粉丝团/守护团等级。

- **类型** `number | undefined`

## parser.clubName

粉丝团/守护团名称。

- **类型** `string | undefined`

## parser.acfunClubUid

Acfun 守护团所属主播的用户 ID。

- **类型** `number | undefined`

## parser.avatar

用户头像 URL。

- **类型** `string | undefined`

## parser.comment

弹幕聊天内容。

- **类型** `string | undefined`

## parser.getCommentHTML()

简单地将评论构造为 HTML 字符串。

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

  当消息为贴纸表情类消息时，仅返回一个 img 元素的 html 字符串：

  ```html
  <img src="${stickerUrl}" alt="" style="${stickerStyle}" class="${stickerClass}">
  ```

  `emotStyle` 小表情的 css 样式。

  `emotClass` 小表情的 css 类。

  当消息不为贴纸表情类消息，且包含小表情时，小表情关键词将替换为 img 元素的 html 字符串：

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


## parser.CommentBuilder()

自定义评论内容构建器。

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

  `comment` 是经过 html 安全转义后的弹幕聊天内容。若要使用原始内容，请使用 `parser.comment`。

  `stickerUrl` 是B站贴纸表情的图片 URL。

  `emots` 是小表情的 URL 列表，`emots[i][0]` 为关键词，`emots[i][1]` 为小表情的图片 URL。

- **示例**

```js
const comment = parser.CommentBuilder((comment, stickerUrl, emots) => {
  if (stickerUrl !== undefined) {
    return '';
  }
  let content = comment;
  if (emots !== undefined) {
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

## parser.guardLevel

大航海等级 / 大航海购买等级。

- **类型** `0 | 3 | 2 | 1 | undefined`

## parser.guardNum

大航海购买数量。

- **类型** `number | undefined`

## parser.guardPrice

大航海购买价格（CNY）。

- **类型** `number | undefined`

## parser.giftName

礼物名称。

- **类型** `string | undefined`

## parser.giftNum

礼物数量。

- **类型** `number | undefined`

## parser.giftUnitPrice

单个礼物价格（CNY）。

- **类型** `number | undefined`

## parser.giftTotalPrice

礼物总价值（CNY）。

- **类型** `number | undefined`

## parser.superChatComment

超级聊天评论。

- **类型** `string | undefined`

## parser.superChatPrice

超级聊天价格。

- **类型** `number | undefined`

## parser.price

广义价格，可能为礼物、大航海、超级聊天的价格。

- **类型** `number | undefined`

## parser.getAbstractLevel()

获取抽象化分级。

- **类型**

  ```ts
  class Parser {
    getAbstractLevel(options?: abstractLevelOptions): number | undefined;
  }

  interface abstractLevelOptions {
    douyinSteps?: number[]
    acfunSteps?: number[]
    acfunClubUid?: number
  }
  ```

- **详细信息**

  `douyinSteps` `acfunSteps` 默认值为 `[7, 11, 15]`。
  
  以默认值为例，当 `this.clubLevel <= 7` 时，返回值为 `0`。当 `this.clubLevel <= 11` 时，返回值为 `1`。以此类推，当 `this.clubLevel > 15` 时，返回值为 `3`。

  若设置了 `acfunClubUid` 的数值，则当且仅当 `this.acfunClubUid === acfunClubUid` 才会返回大于 0 的数值。

  B站与B站开放平台消息将根据大航海等级计算：`0-无 1-舰长 2-提督 3-总督`。请注意，这与 `this.guardLevel` 是不一致的。
