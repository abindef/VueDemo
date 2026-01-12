<template>
  <div class="demo-container">
    <h2>6️⃣ 组合式 API (Composition API)</h2>
    <p class="intro">Composition API 提供了更灵活的代码组织方式和更好的逻辑复用能力</p>

    <div class="demo-section">
      <h3>📌 自定义 Hook - useCounter</h3>
      <div class="code-demo">
        <div class="demo-box">
          <h4>计数器 Hook</h4>
          <p>计数: <strong>{{ count }}</strong></p>
          <p>双倍: <strong>{{ doubleCount }}</strong></p>
          <button @click="increment">增加</button>
          <button @click="decrement">减少</button>
          <button @click="reset">重置</button>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li>将可复用的逻辑提取到独立函数</li>
            <li>返回响应式数据和方法</li>
            <li>可以在多个组件中复用</li>
            <li>命名约定：use 开头</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 自定义 Hook - useMouse</h3>
      <div class="code-demo">
        <div class="demo-box">
          <h4>鼠标位置追踪</h4>
          <div class="mouse-tracker">
            <p>X: <strong>{{ x }}</strong></p>
            <p>Y: <strong>{{ y }}</strong></p>
            <div 
              class="cursor-dot" 
              :style="{ left: x + 'px', top: y + 'px' }"
            ></div>
          </div>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li>封装事件监听逻辑</li>
            <li>自动清理副作用</li>
            <li>在 onUnmounted 中移除监听器</li>
            <li>提高代码可维护性</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 自定义 Hook - useFetch</h3>
      <div class="code-demo">
        <div class="demo-box">
          <h4>数据获取 Hook</h4>
          <button @click="fetchData">获取数据</button>
          <div v-if="loading" class="loading">加载中...</div>
          <div v-else-if="error" class="error">错误: {{ error }}</div>
          <div v-else-if="data" class="data-box">
            <pre>{{ JSON.stringify(data, null, 2) }}</pre>
          </div>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li>封装异步请求逻辑</li>
            <li>统一处理加载、错误、数据状态</li>
            <li>可以添加缓存、重试等功能</li>
            <li>提高代码复用性</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 自定义 Hook - useLocalStorage</h3>
      <div class="code-demo">
        <div class="demo-box">
          <h4>本地存储 Hook</h4>
          <input v-model="storedValue" placeholder="输入内容..." />
          <p>存储的值: <strong>{{ storedValue }}</strong></p>
          <button @click="clearStorage">清除存储</button>
          <p class="info">刷新页面数据不会丢失</p>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li>封装 localStorage 操作</li>
            <li>自动同步到本地存储</li>
            <li>支持 JSON 序列化</li>
            <li>实现数据持久化</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="comparison">
      <h3>📊 Options API vs Composition API</h3>
      <div class="comparison-grid">
        <div class="comparison-item">
          <h4>Options API</h4>
          <pre><code>export default {
  data() {
    return {
      count: 0
    }
  },
  computed: {
    double() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('mounted')
  }
}</code></pre>
        </div>
        <div class="comparison-item">
          <h4>Composition API</h4>
          <pre><code>import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    const double = computed(() => 
      count.value * 2
    )
    
    const increment = () => {
      count.value++
    }
    
    onMounted(() => {
      console.log('mounted')
    })
    
    return { count, double, increment }
  }
}</code></pre>
        </div>
      </div>
    </div>

    <div class="code-block">
      <h3>📝 自定义 Hook 示例代码</h3>
      <pre><code>// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubleCount = computed(() => count.value * 2)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}

// 在组件中使用
import { useCounter } from './useCounter'

const { count, doubleCount, increment, decrement, reset } = useCounter(0)</code></pre>
    </div>

    <div class="tips-box">
      <h3>🎯 Composition API 优势</h3>
      <ul>
        <li><strong>更好的逻辑复用：</strong>通过组合函数实现逻辑复用</li>
        <li><strong>更好的类型推导：</strong>更好的 TypeScript 支持</li>
        <li><strong>更灵活的代码组织：</strong>按功能组织代码，而不是选项</li>
        <li><strong>更小的打包体积：</strong>更好的 tree-shaking 支持</li>
        <li><strong>更易于测试：</strong>纯函数更容易测试</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubleCount = computed(() => count.value * 2)
  
  const increment = () => {
    count.value++
    console.log('计数增加:', count.value)
  }
  
  const decrement = () => {
    count.value--
    console.log('计数减少:', count.value)
  }
  
  const reset = () => {
    count.value = initialValue
    console.log('计数重置:', count.value)
  }
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}

const { count, doubleCount, increment, decrement, reset } = useCounter(0)

function useMouse() {
  const x = ref(0)
  const y = ref(0)
  
  const update = (event) => {
    x.value = event.pageX
    y.value = event.pageY
  }
  
  onMounted(() => {
    window.addEventListener('mousemove', update)
    console.log('鼠标追踪已启动')
  })
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
    console.log('鼠标追踪已停止')
  })
  
  return { x, y }
}

const { x, y } = useMouse()

function useFetch() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const fetchData = async () => {
    loading.value = true
    error.value = null
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      data.value = {
        id: 1,
        title: 'Vue3 教程',
        author: '张三',
        date: new Date().toLocaleDateString()
      }
      
      console.log('数据获取成功:', data.value)
    } catch (e) {
      error.value = e.message
      console.error('数据获取失败:', e)
    } finally {
      loading.value = false
    }
  }
  
  return {
    data,
    loading,
    error,
    fetchData
  }
}

const { data, loading, error, fetchData } = useFetch()

function useLocalStorage(key, initialValue) {
  const storedValue = ref(initialValue)
  
  const loadFromStorage = () => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        storedValue.value = JSON.parse(item)
      }
    } catch (e) {
      console.error('读取 localStorage 失败:', e)
    }
  }
  
  const saveToStorage = (value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      console.log('保存到 localStorage:', value)
    } catch (e) {
      console.error('保存 localStorage 失败:', e)
    }
  }
  
  const clearStorage = () => {
    try {
      window.localStorage.removeItem(key)
      storedValue.value = initialValue
      console.log('清除 localStorage')
    } catch (e) {
      console.error('清除 localStorage 失败:', e)
    }
  }
  
  onMounted(() => {
    loadFromStorage()
  })
  
  return {
    storedValue: computed({
      get: () => storedValue.value,
      set: (value) => {
        storedValue.value = value
        saveToStorage(value)
      }
    }),
    clearStorage
  }
}

const { storedValue, clearStorage } = useLocalStorage('vue-demo-storage', '')
</script>

<style scoped>
.demo-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h2 {
  color: #667eea;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.intro {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.demo-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.demo-section h3 {
  color: #333;
  margin-bottom: 1rem;
}

.code-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
}

.demo-box {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.demo-box h4 {
  color: #667eea;
  margin-bottom: 1rem;
}

.demo-box p {
  margin: 0.5rem 0;
  color: #555;
}

.demo-box strong {
  color: #667eea;
  font-size: 1.2rem;
}

.demo-box button {
  margin: 0.5rem 0.5rem 0 0;
  padding: 0.6rem 1.2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.demo-box button:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

.demo-box input {
  width: 100%;
  padding: 0.6rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  margin: 0.5rem 0;
  font-size: 1rem;
}

.demo-box input:focus {
  outline: none;
  border-color: #667eea;
}

.mouse-tracker {
  position: relative;
  height: 200px;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 1rem 0;
  overflow: hidden;
}

.mouse-tracker p {
  position: absolute;
  top: 10px;
  left: 10px;
  margin: 0.3rem 0;
  z-index: 10;
}

.cursor-dot {
  position: fixed;
  width: 20px;
  height: 20px;
  background: #667eea;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}

.loading {
  padding: 2rem;
  text-align: center;
  color: #667eea;
  font-weight: bold;
}

.error {
  padding: 1rem;
  background: #f8d7da;
  color: #721c24;
  border-radius: 6px;
  margin: 1rem 0;
}

.data-box {
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
}

.data-box pre {
  margin: 0;
  color: #555;
  font-size: 0.9rem;
}

.info {
  margin-top: 1rem;
  padding: 0.8rem;
  background: #d1ecf1;
  border-radius: 6px;
  color: #0c5460;
  font-size: 0.9rem;
}

.comparison {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.comparison h3 {
  color: #333;
  margin-bottom: 1.5rem;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.comparison-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.comparison-item h4 {
  color: #667eea;
  margin-bottom: 1rem;
}

.comparison-item pre {
  margin: 0;
  background: #2d3748;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}

.comparison-item code {
  color: #a0aec0;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  line-height: 1.6;
}

.code-explanation {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.code-explanation h4 {
  color: #667eea;
  margin-bottom: 1rem;
}

.code-explanation ul {
  list-style: none;
  padding: 0;
}

.code-explanation li {
  padding: 0.5rem 0;
  color: #555;
  line-height: 1.6;
}

.code-block {
  margin: 2rem 0;
  background: #2d3748;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
}

.code-block h3 {
  color: white;
  margin-bottom: 1rem;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  color: #a0aec0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.tips-box {
  background: #d4edda;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #28a745;
  margin-top: 2rem;
}

.tips-box h3 {
  color: #155724;
  margin-bottom: 1rem;
}

.tips-box ul {
  list-style: none;
  padding: 0;
}

.tips-box li {
  padding: 0.5rem 0;
  color: #155724;
}

.tips-box strong {
  color: #0c3d1a;
}

@media (max-width: 768px) {
  .code-demo,
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}
</style>
