<template>
  <div class="demo-container">
    <h2>3️⃣ 组件生命周期</h2>
    <p class="intro">生命周期钩子让你在组件的不同阶段执行代码</p>

    <div class="demo-section">
      <h3>📌 生命周期演示</h3>
      <div class="code-demo">
        <div class="demo-box">
          <h4>计时器组件</h4>
          <p>运行时间: <strong>{{ seconds }}</strong> 秒</p>
          <p>更新次数: <strong>{{ updateCount }}</strong></p>
          <button @click="toggleTimer">{{ isRunning ? '暂停' : '开始' }}</button>
          <button @click="resetTimer">重置</button>
          <div class="lifecycle-log">
            <h5>生命周期日志:</h5>
            <div v-for="(log, index) in logs" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
        </div>
        <div class="code-explanation">
          <h4>💡 生命周期钩子：</h4>
          <ul>
            <li><code>onBeforeMount</code> - 挂载前</li>
            <li><code>onMounted</code> - 挂载后（DOM 可用）</li>
            <li><code>onBeforeUpdate</code> - 更新前</li>
            <li><code>onUpdated</code> - 更新后</li>
            <li><code>onBeforeUnmount</code> - 卸载前</li>
            <li><code>onUnmounted</code> - 卸载后（清理）</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 动态组件演示</h3>
      <div class="code-demo">
        <div class="demo-box">
          <button @click="showChild = !showChild">
            {{ showChild ? '卸载子组件' : '挂载子组件' }}
          </button>
          <ChildComponent v-if="showChild" :message="childMessage" />
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li>组件挂载时触发 onMounted</li>
            <li>组件卸载时触发 onUnmounted</li>
            <li>在 onUnmounted 中清理定时器、事件监听等</li>
            <li>查看控制台查看完整生命周期</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="lifecycle-diagram">
      <h3>📊 生命周期流程图</h3>
      <div class="diagram">
        <div class="phase">
          <div class="hook setup">setup()</div>
          <p>组件创建，响应式数据初始化</p>
        </div>
        <div class="arrow">↓</div>
        <div class="phase">
          <div class="hook">onBeforeMount</div>
          <p>模板编译完成，DOM 未挂载</p>
        </div>
        <div class="arrow">↓</div>
        <div class="phase">
          <div class="hook mounted">onMounted</div>
          <p>DOM 已挂载，可以访问 DOM 元素</p>
        </div>
        <div class="arrow">↓</div>
        <div class="phase update-phase">
          <div class="hook">onBeforeUpdate</div>
          <p>数据变化，DOM 未更新</p>
          <div class="arrow">↓</div>
          <div class="hook">onUpdated</div>
          <p>DOM 已更新</p>
        </div>
        <div class="arrow">↓</div>
        <div class="phase">
          <div class="hook">onBeforeUnmount</div>
          <p>组件即将卸载</p>
        </div>
        <div class="arrow">↓</div>
        <div class="phase">
          <div class="hook unmount">onUnmounted</div>
          <p>组件已卸载，清理资源</p>
        </div>
      </div>
    </div>

    <div class="code-block">
      <h3>📝 核心代码示例</h3>
      <pre><code>import { onBeforeMount, onMounted, onBeforeUpdate, 
         onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

// 挂载前
onBeforeMount(() => {
  console.log('组件即将挂载')
})

// 挂载后 - 最常用，可以访问 DOM
onMounted(() => {
  console.log('组件已挂载，DOM 可用')
  // 适合：初始化第三方库、发起 API 请求、设置定时器
})

// 更新前
onBeforeUpdate(() => {
  console.log('数据变化，DOM 即将更新')
})

// 更新后
onUpdated(() => {
  console.log('DOM 已更新')
})

// 卸载前
onBeforeUnmount(() => {
  console.log('组件即将卸载')
})

// 卸载后 - 清理资源
onUnmounted(() => {
  console.log('组件已卸载')
  // 适合：清除定时器、取消事件监听、断开连接
})</code></pre>
    </div>

    <div class="tips-box">
      <h3>🎯 最佳实践</h3>
      <ul>
        <li><strong>onMounted：</strong>初始化操作、API 请求、DOM 操作</li>
        <li><strong>onUnmounted：</strong>清理定时器、事件监听、取消请求</li>
        <li><strong>避免在 onUpdated 中修改状态：</strong>可能导致无限循环</li>
        <li><strong>setup 中的代码：</strong>在所有生命周期钩子之前执行</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

const seconds = ref(0)
const updateCount = ref(0)
const isRunning = ref(false)
const logs = ref([])
let timer = null

const addLog = (message) => {
  const timestamp = new Date().toLocaleTimeString()
  logs.value.unshift(`[${timestamp}] ${message}`)
  if (logs.value.length > 8) {
    logs.value.pop()
  }
}

onBeforeMount(() => {
  console.log('🔵 onBeforeMount: 组件即将挂载')
  addLog('onBeforeMount: 组件即将挂载')
})

onMounted(() => {
  console.log('🟢 onMounted: 组件已挂载，DOM 可用')
  addLog('onMounted: 组件已挂载')
})

onBeforeUpdate(() => {
  console.log('🟡 onBeforeUpdate: 数据变化，DOM 即将更新')
})

onUpdated(() => {
  updateCount.value++
  console.log('🟠 onUpdated: DOM 已更新，更新次数:', updateCount.value)
})

onBeforeUnmount(() => {
  console.log('🔴 onBeforeUnmount: 组件即将卸载')
  addLog('onBeforeUnmount: 组件即将卸载')
})

onUnmounted(() => {
  console.log('⚫ onUnmounted: 组件已卸载')
  if (timer) {
    clearInterval(timer)
  }
})

const toggleTimer = () => {
  isRunning.value = !isRunning.value
  if (isRunning.value) {
    timer = setInterval(() => {
      seconds.value++
    }, 1000)
    addLog('计时器已启动')
  } else {
    clearInterval(timer)
    addLog('计时器已暂停')
  }
}

const resetTimer = () => {
  seconds.value = 0
  updateCount.value = 0
  isRunning.value = false
  if (timer) {
    clearInterval(timer)
  }
  addLog('计时器已重置')
}

const showChild = ref(false)
const childMessage = ref('子组件消息')
</script>

<script>
import { defineComponent, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted } from 'vue'

const ChildComponent = defineComponent({
  name: 'ChildComponent',
  props: ['message'],
  setup(props) {
    onBeforeMount(() => {
      console.log('🔵 子组件 onBeforeMount')
    })

    onMounted(() => {
      console.log('🟢 子组件 onMounted')
    })

    onBeforeUnmount(() => {
      console.log('🔴 子组件 onBeforeUnmount')
    })

    onUnmounted(() => {
      console.log('⚫ 子组件 onUnmounted')
    })

    return { props }
  },
  template: `
    <div class="child-component">
      <h5>子组件已挂载</h5>
      <p>{{ message }}</p>
      <p>查看控制台查看生命周期日志</p>
    </div>
  `
})

export default {
  components: {
    ChildComponent
  }
}
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

.lifecycle-log {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
}

.lifecycle-log h5 {
  color: #667eea;
  margin-bottom: 0.5rem;
}

.log-item {
  padding: 0.5rem;
  margin: 0.3rem 0;
  background: white;
  border-radius: 4px;
  font-size: 0.85rem;
  color: #555;
  font-family: monospace;
}

.child-component {
  margin-top: 1rem;
  padding: 1rem;
  background: #e8f4f8;
  border-radius: 6px;
  border-left: 4px solid #667eea;
}

.child-component h5 {
  color: #667eea;
  margin-bottom: 0.5rem;
}

.lifecycle-diagram {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.lifecycle-diagram h3 {
  color: #333;
  margin-bottom: 1.5rem;
}

.diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.phase {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  text-align: center;
  min-width: 300px;
}

.hook {
  padding: 0.8rem 1.5rem;
  background: #667eea;
  color: white;
  border-radius: 6px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-family: monospace;
}

.hook.setup {
  background: #48bb78;
}

.hook.mounted {
  background: #4299e1;
}

.hook.unmount {
  background: #f56565;
}

.phase p {
  color: #666;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.update-phase {
  background: #fff3cd;
  border: 2px dashed #ffc107;
}

.arrow {
  font-size: 2rem;
  color: #667eea;
  margin: 0.5rem 0;
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

.code-explanation code {
  background: #f8f9fa;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: #667eea;
  font-family: 'Courier New', monospace;
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
  background: #fff3cd;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
  margin-top: 2rem;
}

.tips-box h3 {
  color: #856404;
  margin-bottom: 1rem;
}

.tips-box ul {
  list-style: none;
  padding: 0;
}

.tips-box li {
  padding: 0.5rem 0;
  color: #856404;
}

.tips-box strong {
  color: #533f03;
}

@media (max-width: 768px) {
  .code-demo {
    grid-template-columns: 1fr;
  }
  
  .phase {
    min-width: 200px;
  }
}
</style>
