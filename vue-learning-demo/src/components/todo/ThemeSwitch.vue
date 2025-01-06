<!--
  ThemeSwitch.vue
  功能：主题切换按钮组件
  职责：
  1. 显示当前主题状态
  2. 提供主题切换功能
-->

<template>
  <div class="theme-switch">
    <button @click="themeStore.toggleTheme">
      {{ themeStore.isDark ? '切换到浅色' : '切换到深色' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<style scoped>
.theme-switch {
  text-align: right;
  margin-bottom: 20px;
}

button {
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

button:hover {
  opacity: 0.9;
}
</style>
