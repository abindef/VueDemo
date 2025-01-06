import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  function toggleTheme() {
    isDark.value = !isDark.value
    updateTheme()
  }

  function updateTheme() {
    try {
      document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
    } catch (error) {
      console.warn('Failed to update theme:', error)
    }
  }

  // 初始化主题
  updateTheme()

  return {
    isDark,
    toggleTheme
  }
})
