---
title: 常用工具安装
---

# 常用工具安装

以下常用工具均可一键安装到 DimSum Chat，点击按钮即可唤起主程序自动安装（需要主程序版本版本>=1.5.7）。

<div class="widget-install-grid" v-if="tools.length">
  <div
    v-for="tool in tools"
    :key="tool.slug"
    class="widget-card"
    :class="{ loaded: tool.ready, failed: tool.error }"
  >
    <div class="widget-card-body">
      <h3 class="widget-name">{{ tool.name }}</h3>
      <p class="widget-desc">{{ tool.desc }}</p>
    </div>
    <div class="widget-card-footer">
      <template v-if="tool.ready">
        <span class="widget-version">ver {{ tool.version }}</span>
        <button class="install-btn" @click="install(tool)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          一键安装
        </button>
      </template>
      <template v-else-if="tool.error">
        <span class="widget-error-msg">获取版本信息失败</span>
        <button class="retry-btn" @click="fetchTool(tool)">重试</button>
      </template>
      <template v-else>
        <span class="widget-loading">正在获取版本...</span>
      </template>
    </div>
  </div>
</div>

<script setup>
import { ref, onMounted } from 'vue'

const TOOLS = [
  {
    slug: 'dimsum-vote-helper-widget',
    name: '投票助手',
    desc: '直播间互动投票助手，支持预设选项、实时计票。',
  },
  {
    slug: 'dimsum-tools',
    name: '小工具合集',
    desc: '包含计算器、计时、倒计时、随机数生成。',
  },
  {
    slug: 'dimsum-song-list-widget',
    name: '点心点歌机',
    desc: '观众点歌工具，支持展示页和后台管理。可配置联动网易云音乐自动播放。',
  },
  {
    slug: 'dimsum-danmaku-viewer-panel',
    name: '弹幕监控面板',
    desc: '主播专用弹幕监控面板。可浮窗查看弹幕。',
  },
]

const tools = ref(TOOLS.map(t => ({ ...t, version: '', downloadUrl: '', ready: false, error: false })))

function b64urlEncode(str) {
  // 使用 TextEncoder 避免 unescape 的兼容性问题
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  bytes.forEach(b => binary += String.fromCharCode(b))
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function install(tool) {
  const uri = `dimsum-chat://widget/install?u64=${b64urlEncode(tool.downloadUrl)}`
  window.open(uri, '_self')
}

async function fetchTool(tool) {
  tool.ready = false
  tool.error = false
  const url = `https://dimsum-update.miego.live/widgets/${tool.slug}/update.json`
  try {
    const r = await fetch(url)
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    const data = await r.json()
    tool.version = data.version
    tool.downloadUrl = data.downloadUrl
    tool.ready = true
  } catch {
    tool.error = true
  }
}

onMounted(() => {
  tools.value.forEach(t => fetchTool(t))
})
</script>

<style scoped>
.widget-install-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.widget-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.2s ease;
}

.widget-card.loaded {
  border-color: var(--vp-c-brand-1);
}

.widget-card.failed {
  border-color: #f44336;
}

.widget-name {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.4rem;
}

.widget-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

.widget-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.widget-version {
  font-size: 0.8rem;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.install-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  background: var(--vp-c-brand-1);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: opacity 0.2s ease;
}

.install-btn:hover {
  opacity: 0.85;
}

.widget-loading {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.widget-error-msg {
  font-size: 0.8rem;
  color: #f44336;
}

.retry-btn {
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .widget-install-grid {
    grid-template-columns: 1fr;
  }
}
</style>
