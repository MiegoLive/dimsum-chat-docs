<template>
  <div class="bonk-updater">
    <!-- Step 1: Upload -->
    <div v-if="step === 'upload'" class="step-upload">
      <div class="upload-zone" :class="{ dragging }" @click="triggerUpload" @dragover.prevent="dragging = true" @dragleave="dragging = false" @drop.prevent="handleDrop">
        <div class="upload-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <p class="upload-title">点击或拖拽上传你的砸砸乐 .ds 文件</p>
        <p class="upload-hint">用于验证你已购买砸砸乐</p>
      </div>
      <input ref="fileInput" type="file" accept=".ds" style="display: none" @change="handleFileSelect" />
    </div>

    <!-- Step 2: Verifying -->
    <div v-if="step === 'verifying'" class="step-verifying">
      <div class="spinner"></div>
      <p>正在验证文件...</p>
    </div>

    <!-- Step 3: Success -->
    <div v-if="step === 'success'" class="step-success">
      <div class="success-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <h3>验证通过！</h3>
      <p class="verify-info">
        识别到：<strong>{{ detectedName }}</strong>（版本 {{ detectedVersion }}）
      </p>
      <div class="action-buttons">
        <button class="download-btn" @click="handleDownload" :disabled="!latestInfo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {{ latestInfo ? `下载最新版砸砸乐 (ver${latestInfo.version})` : fetchFailed ? '获取版本信息失败' : '获取版本信息中...' }}
        </button>
        <a v-if="fetchFailed" class="retry-link" @click="fetchLatestInfo">重新获取</a>
        <button class="reset-btn" @click="reset">重新验证</button>
      </div>
    </div>

    <!-- Step 3: Fail -->
    <div v-if="step === 'fail'" class="step-fail">
      <div class="fail-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </div>
      <h3>验证未通过</h3>
      <p class="fail-reason">{{ failReason }}</p>
      <button class="reset-btn" @click="reset">重新选择文件</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import JSZip from 'jszip'

type Step = 'upload' | 'verifying' | 'success' | 'fail'
interface LatestInfo { version: string; downloadUrl: string }

const step = ref<Step>('upload')
const dragging = ref(false)
const fileInput = ref<HTMLInputElement>()

const detectedName = ref('')
const detectedVersion = ref('')
const failReason = ref('')
const latestInfo = ref<LatestInfo | null>(null)
const fetchFailed = ref(false)

// Timeout + retry constants
const FETCH_TIMEOUT = 10000 // 10s
const MAX_RETRIES = 2 // 3 attempts total

// Known identifiers for bonk widget across all versions
const BONK_NAMES = ['礼物砸砸乐', '抖音礼物砸脸']
const BONK_BASES = ['/dimsum-bonk-2024-widget/', '/douyin-bonk-2024-widget/']

const UPDATE_JSON_URL = 'https://dimsum-update.miego.live/widgets/dimsum-bonk-2024-widget/update.json'

async function fetchLatestInfo() {
  fetchFailed.value = false
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT)
    try {
      const r = await fetch(UPDATE_JSON_URL, { signal: controller.signal })
      const data = await r.json()
      latestInfo.value = { version: data.version, downloadUrl: data.downloadUrl }
      return
    } catch {
      // retry on timeout or network error
    } finally {
      clearTimeout(timer)
    }
  }
  fetchFailed.value = true
}

function triggerUpload() {
  fileInput.value?.click()
}

function handleFileSelect(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    processFile(target.files[0])
  }
}

function handleDrop(e: DragEvent) {
  dragging.value = false
  const file = e.dataTransfer?.files[0]
  if (file) {
    processFile(file)
  }
}

async function processFile(file: File) {
  if (!file.name.endsWith('.ds')) {
    step.value = 'fail'
    failReason.value = '请上传 .ds 格式的文件，您上传的文件格式不正确。'
    return
  }

  step.value = 'verifying'

  try {
    const zip = await JSZip.loadAsync(file)

    const guideFile = zip.file('guide.dimsum.json')
    if (!guideFile) {
      step.value = 'fail'
      failReason.value = '文件中未找到 guide.dimsum.json，这不是一个有效的点心Chat应用文件。'
      return
    }

    const content = await guideFile.async('string')
    const guide = JSON.parse(content)

    const name: string = guide.name || ''
    const base: string = guide.base || ''
    const version: string = guide.version || ''

    const isBonk = BONK_NAMES.includes(name) || BONK_BASES.includes(base)

    if (!isBonk) {
      step.value = 'fail'
      failReason.value = `该文件是「${name}」，不是砸砸乐应用。本页面仅提供砸砸乐的更新服务。`
      return
    }

    detectedName.value = name
    detectedVersion.value = version
    step.value = 'success'
    fetchLatestInfo()
  } catch (err: any) {
    step.value = 'fail'
    failReason.value = `文件解析失败：${err.message || '未知错误'}。请确认文件完整且未损坏。`
  }
}

function handleDownload() {
  if (!latestInfo.value) return
  const url = latestInfo.value.downloadUrl
  const filename = url.split('/').pop() || '礼物砸砸乐.ds'
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function reset() {
  step.value = 'upload'
  detectedName.value = ''
  detectedVersion.value = ''
  failReason.value = ''
  latestInfo.value = null
  fetchFailed.value = false
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<style scoped>
.bonk-updater {
  max-width: 520px;
  margin: 2rem auto;
  font-family: var(--vp-font-family-base);
}

/* Upload Zone */
.upload-zone {
  border: 2px dashed var(--vp-c-divider);
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
  background: var(--vp-c-bg-soft);
}

.upload-zone:hover,
.upload-zone.dragging {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft-updated, rgba(244, 211, 94, 0.05));
}

.upload-icon {
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.upload-title {
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.upload-hint {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  line-height: 1.5;
}

/* Verifying */
.step-verifying {
  text-align: center;
  padding: 3rem 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Success */
.step-success {
  text-align: center;
  padding: 2rem;
}

.success-icon {
  color: #4caf50;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.step-success h3 {
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.verify-info {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand-1);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.download-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Fail */
.step-fail {
  text-align: center;
  padding: 2rem;
}

.fail-icon {
  color: #f44336;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.step-fail h3 {
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.fail-reason {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Reset Button */
.reset-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  border-color: var(--vp-c-text-3);
  color: var(--vp-c-text-1);
}

.retry-link {
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.retry-link:hover {
  opacity: 0.8;
}
</style>
