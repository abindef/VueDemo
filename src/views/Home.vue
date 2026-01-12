<template>
  <div class="home">
    <div class="welcome-card">
      <h2>👋 欢迎学习 Vue3</h2>
      <p>这个项目包含了 Vue3 的核心概念演示，每个示例都配有详细的代码注释和说明。</p>
    </div>

    <div class="learning-path">
      <h3>📖 学习路径</h3>
      <div class="path-grid">
        <div 
          v-for="(item, index) in learningPath" 
          :key="index"
          class="path-item"
          @click="navigateTo(item.path)"
        >
          <div class="path-number">{{ index + 1 }}</div>
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
          <ul class="key-points">
            <li v-for="point in item.keyPoints" :key="point">{{ point }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="quick-tips">
      <h3>💡 快速提示</h3>
      <div class="tips-grid">
        <div class="tip-card">
          <h4>🔧 开发工具</h4>
          <p>按 F12 打开浏览器开发者工具</p>
          <p>安装 Vue DevTools 扩展</p>
        </div>
        <div class="tip-card">
          <h4>📝 学习建议</h4>
          <p>按顺序学习每个概念</p>
          <p>动手修改代码观察效果</p>
        </div>
        <div class="tip-card">
          <h4>🐛 调试技巧</h4>
          <p>使用 console.log 输出信息</p>
          <p>在代码中设置断点调试</p>
        </div>
        <div class="tip-card">
          <h4>📚 文档资源</h4>
          <p>查看 docs 目录下的文档</p>
          <p>参考 Vue3 官方文档</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const learningPath = ref([
  {
    title: '响应式系统',
    path: '/reactive',
    description: '理解 Vue3 的响应式原理',
    keyPoints: ['ref 和 reactive 的使用', 'toRef 和 toRefs', '响应式原理（Proxy）']
  },
  {
    title: '计算属性',
    path: '/computed',
    description: '掌握计算属性和侦听器',
    keyPoints: ['computed 计算属性', 'watch 侦听器', 'watchEffect 自动侦听']
  },
  {
    title: '生命周期',
    path: '/lifecycle',
    description: '了解组件生命周期钩子',
    keyPoints: ['onMounted 挂载', 'onUpdated 更新', 'onUnmounted 卸载']
  },
  {
    title: '组件通信',
    path: '/components',
    description: '学习父子组件通信方式',
    keyPoints: ['Props 传递数据', 'Emit 触发事件', 'Provide/Inject 依赖注入']
  },
  {
    title: '指令系统',
    path: '/directives',
    description: '掌握 Vue 常用指令',
    keyPoints: ['v-if/v-show 条件渲染', 'v-for 列表渲染', 'v-model 双向绑定']
  },
  {
    title: '组合式 API',
    path: '/composition',
    description: '理解 Composition API 的优势',
    keyPoints: ['逻辑复用', '代码组织', '自定义 Hooks']
  },
  {
    title: '状态管理',
    path: '/pinia',
    description: '学习 Pinia 状态管理',
    keyPoints: ['Store 定义', 'State 状态', 'Actions 操作']
  }
])

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  text-align: center;
}

.welcome-card h2 {
  color: #667eea;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.welcome-card p {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
}

.learning-path {
  margin-bottom: 2rem;
}

.learning-path h3 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.path-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.path-item {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  padding-top: 3rem;
}

.path-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
}

.path-number {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.path-item h4 {
  color: #667eea;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.path-item p {
  color: #666;
  margin-bottom: 1rem;
}

.key-points {
  list-style: none;
  padding: 0;
}

.key-points li {
  color: #555;
  padding: 0.3rem 0;
  padding-left: 1.5rem;
  position: relative;
  font-size: 0.9rem;
}

.key-points li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
}

.quick-tips {
  margin-top: 2rem;
}

.quick-tips h3 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.tip-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.tip-card h4 {
  color: #667eea;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.tip-card p {
  color: #666;
  margin: 0.5rem 0;
  font-size: 0.95rem;
}
</style>
