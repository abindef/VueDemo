<template>
  <div class="app">
    <header class="header">
      <h1>🚀 Vue3 学习项目</h1>
      <p>专为后端开发工程师设计的 Vue3 核心概念演示</p>
    </header>

    <nav class="nav">
      <router-link 
        v-for="route in routes" 
        :key="route.path" 
        :to="route.path"
        class="nav-link"
      >
        {{ route.name }}
      </router-link>
    </nav>

    <main class="main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="footer">
      <p>💡 提示：打开浏览器开发者工具（F12）查看控制台输出</p>
      <p>📚 建议安装 Vue DevTools 浏览器扩展以获得更好的调试体验</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const routes = ref([
  { path: '/', name: '首页' },
  { path: '/reactive', name: '1. 响应式系统' },
  { path: '/computed', name: '2. 计算属性' },
  { path: '/lifecycle', name: '3. 生命周期' },
  { path: '/components', name: '4. 组件通信' },
  { path: '/directives', name: '5. 指令系统' },
  { path: '/composition', name: '6. 组合式API' },
  { path: '/pinia', name: '7. 状态管理' }
])
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.nav {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-link {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  background: #f5f5f5;
  transition: all 0.3s;
  font-weight: 500;
}

.nav-link:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.footer {
  background: #2c3e50;
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.footer p {
  margin: 0.5rem 0;
  opacity: 0.9;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
