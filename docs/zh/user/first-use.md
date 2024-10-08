# 初次使用

## 加入我们的 QQ 群

我们推荐你加入我们的 QQ 群，以便及时获取到最新的消息，以及视频教程和各种免费福利。

<div class="d-flex flex-column align-start ga-2">
  <v-btn variant="text" prepend-icon="mdi-qqchat" @click="openLink('https://qm.qq.com/q/5EdvAgUkHC')">
    <template v-slot:prepend>
      <v-icon color="#1472d0"></v-icon>
    </template>
    糕社1群：459021248（已满）
  </v-btn>
  <v-btn variant="text" prepend-icon="mdi-qqchat" @click="openLink('https://qm.qq.com/q/f2onlgoAuI')">
    <template v-slot:prepend>
      <v-icon color="#1472d0"></v-icon>
    </template>
    糕社2群：832347958
  </v-btn>
</div>


## 基础知识

### 主程序

主程序一般指点心 Chat 主程序，它是一个可执行文件，你需要运行它才能使用点心 Chat 的功能。

- 例如，在 Windows 系统中，它是一个名为 `DimSumChat.Avalonia.exe` 可执行文件。其中，`DimSumChat` 是 “点心 Chat” 的英文名称，`Avalonia` 是我们使用的 UI 框架。

- 你下载到的文件很可能是压缩包的形式，例如 `点心Chat_win-x64_ver1.0.4.zip`，其中，`win-x64` 表示系统架构是 64 位的 Windows，`ver1.0.4` 表示版本号是 `1.0.4`。**你需要解压后才能运行其中的可执行文件**。

<div v-if="dimsumVersion">
目前，主程序的最新版本为：
<v-chip color="primary" @click="openLink(dimsumDownloadUrl)">
  <v-icon icon="mdi-cloud-download" start></v-icon>
  {{ dimsumVersion }}
</v-chip>
</div>

### ds 文件

ds 文件是实际上包含你要使用的弹幕样式、礼物效果等内容的文件，你可以把它理解为样式/应用的资源安装包，它和点心 Chat 主程序缺一不可。

### 样式/应用

样式/应用是指点心 Chat 内置的各种弹幕样式、礼物效果等内容，你可以在主程序的 **我的应用** 选项卡中通过 ds 文件安装、删除这些样式/应用。

## 准备好你的文件

### 1. 点心 Chat 主程序

首先，你需要确认下载了点心 Chat 的主程序，并解压到一个合适的位置。

- 出于使用方便的考量，你需要把压缩包中的主程序 `DimSumChat.Avalonia.exe` 解压到一个便于启动与查找的文件夹，比如 `D:\点心Chat\`。你可以创建一个这样的文件夹，然后在其中解压压缩包。

- 解压后，你可以运行 `DimSumChat.Avalonia.exe`，程序窗口应该能够正常弹出。

### 2. ds 文件

你应该能够从购买渠道获取到对应的 ds 文件，例如 `2024月光序章样式_ver1.1.4.ds`。

- 出于收纳习惯的考量，你应该把 ds 文件放置在一个合适的文件夹，比如 `D:\点心Chat\我的ds文件\`。你可以创建一个这样的文件夹，然后把 ds 文件复制到其中。

## 安装 ds 文件到主程序中

首先，运行点心 Chat 主程序，程序窗口应该能够正常弹出。

请点击左侧导航栏的 **我的应用**，然后点击 **通过 .ds 文件安装应用** 按钮，此时可以在弹出的窗口中前往你存放 ds 文件的目录，如 `D:\点心Chat\我的ds文件\`，然后，选择你准备好的 ds 文件，如 `2024月光序章样式_ver1.1.4.ds`。

::: info 注意
所有的弹幕样式或小工具都是基于浏览器实现的，因此它依赖于能添加浏览器源的直播软件。

如果你使用的是抖音直播伴侣，则需要借助 OBS 添加浏览器源，然后通过 OBS 的虚拟摄像头将 OBS 的画面投射到直播伴侣的摄像头源中。

为了保证点心应用顺利加载，**请先打开点心 Chat 主程序，再开启 OBS 等直播工具**。否则你可能需要在直播工具中刷新大量的浏览器源。
:::

## 添加浏览器源

一般来说，你需要复制 URL 的内容，然后输入到浏览器源的 URL 中。但是，也有一些样式需要你先打开一个设置页面，进行一些个性化设置，以获得最终的 URL。

## 连接直播间

请点击左侧导航栏的 **开启直播**，切换到 **哔哩哔哩**、**爱稀饭**、**抖音** 等你要直播的平台的选项卡，填写对应的信息后连接直播间。

<script setup>
import { ref, onMounted } from 'vue';

function openLink(url) {
  window.open(url, '_blank');
}

const dimsumVersion = ref(undefined);
const dimsumDownloadUrl = ref(undefined);

onMounted(() => {
  fetch('http://dimsum-update.miego.live/api/v1/update.json')
   .then(response => response.json())
   .then(data => {
      dimsumVersion.value = data.version;
      dimsumDownloadUrl.value = data.downloadUrl;
    })
   .catch(error => {
      console.error(error);
    });
});
</script>