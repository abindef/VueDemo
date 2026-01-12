<template>
  <div class="demo-container">
    <h2>2️⃣ 计算属性与侦听器</h2>
    <p class="intro">计算属性用于基于响应式数据派生新值，侦听器用于响应数据变化执行副作用</p>

    <div class="demo-section">
      <h3>📌 computed - 计算属性</h3>
      <div class="code-demo">
        <div class="demo-box">
          <h4>购物车示例</h4>
          <div v-for="item in cart" :key="item.id" class="cart-item">
            <span>{{ item.name }}</span>
            <span>¥{{ item.price }} × {{ item.quantity }}</span>
            <button @click="item.quantity++">+</button>
            <button @click="item.quantity > 1 && item.quantity--">-</button>
          </div>
          <div class="total">
            <p>商品总数: <strong>{{ totalQuantity }}</strong></p>
            <p>总价: <strong>¥{{ totalPrice }}</strong></p>
            <p>折扣后: <strong>¥{{ discountedPrice }}</strong></p>
          </div>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li><code>computed()</code> 创建计算属性</li>
            <li>基于响应式依赖自动计算</li>
            <li>结果会被缓存，依赖不变不会重新计算</li>
            <li>比方法调用更高效</li>
            <li>只读，不能直接修改</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 可写计算属性</h3>
      <div class="code-demo">
        <div class="demo-box">
          <p>名: <input v-model="firstName" /></p>
          <p>姓: <input v-model="lastName" /></p>
          <p>全名: <input v-model="fullName" /></p>
          <p class="result">显示: <strong>{{ fullName }}</strong></p>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li>计算属性可以提供 getter 和 setter</li>
            <li>getter 用于读取值</li>
            <li>setter 用于设置值时的逻辑</li>
            <li>实现双向数据流</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 watch - 侦听器</h3>
      <div class="code-demo">
        <div class="demo-box">
          <p>搜索: <input v-model="searchQuery" placeholder="输入搜索内容..." /></p>
          <p>搜索次数: <strong>{{ searchCount }}</strong></p>
          <div class="log-box">
            <p v-for="(log, index) in searchLogs" :key="index">{{ log }}</p>
          </div>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li><code>watch()</code> 侦听响应式数据变化</li>
            <li>可以访问新值和旧值</li>
            <li>适合执行异步操作或开销较大的操作</li>
            <li>可以侦听多个数据源</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 watchEffect - 自动侦听</h3>
      <div class="code-demo">
        <div class="demo-box">
          <p>X: <input type="number" v-model.number="x" /></p>
          <p>Y: <input type="number" v-model.number="y" /></p>
          <p class="result">X + Y = <strong>{{ sum }}</strong></p>
          <p class="info">watchEffect 自动追踪了 x 和 y 的变化</p>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li><code>watchEffect()</code> 自动追踪依赖</li>
            <li>立即执行一次</li>
            <li>不需要明确指定侦听的数据</li>
            <li>适合简单的副作用逻辑</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="code-block">
      <h3>📝 核心代码示例</h3>
      <pre><code>import { ref, computed, watch, watchEffect } from 'vue'

// 1. 只读计算属性
const count = ref(0)
const double = computed(() => count.value * 2)

// 2. 可写计算属性
const firstName = ref('张')
const lastName = ref('三')
const fullName = computed({
  get: () => firstName.value + lastName.value,
  set: (val) => {
    [firstName.value, lastName.value] = val.split(' ')
  }
})

// 3. watch 侦听器
watch(count, (newVal, oldVal) => {
  console.log(`count 从 ${oldVal} 变为 ${newVal}`)
})

// 4. watchEffect 自动侦听
watchEffect(() => {
  console.log('count 的值是:', count.value)
})</code></pre>
    </div>

    <div class="tips-box">
      <h3>🎯 最佳实践</h3>
      <ul>
        <li><strong>计算属性 vs 方法：</strong>计算属性有缓存，性能更好</li>
        <li><strong>watch vs watchEffect：</strong>需要旧值用 watch，否则用 watchEffect</li>
        <li><strong>避免副作用：</strong>计算属性中不要修改其他状态</li>
        <li><strong>异步操作：</strong>在 watch 中执行，不在 computed 中</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue'

const cart = reactive([
  { id: 1, name: 'Vue3 教程', price: 99, quantity: 1 },
  { id: 2, name: 'JavaScript 高级', price: 129, quantity: 2 },
  { id: 3, name: 'TypeScript 实战', price: 149, quantity: 1 }
])

const totalQuantity = computed(() => {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0)
  console.log('计算总数量:', total)
  return total
})

const totalPrice = computed(() => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  console.log('计算总价:', total)
  return total
})

const discountedPrice = computed(() => {
  const discount = totalPrice.value > 300 ? 0.9 : 1
  return Math.round(totalPrice.value * discount)
})

const firstName = ref('张')
const lastName = ref('三')

const fullName = computed({
  get: () => {
    return firstName.value + ' ' + lastName.value
  },
  set: (val) => {
    const parts = val.split(' ')
    firstName.value = parts[0] || ''
    lastName.value = parts[1] || ''
  }
})

const searchQuery = ref('')
const searchCount = ref(0)
const searchLogs = ref([])

watch(searchQuery, (newVal, oldVal) => {
  searchCount.value++
  const log = `[${searchCount.value}] 从 "${oldVal}" 变为 "${newVal}"`
  searchLogs.value.unshift(log)
  if (searchLogs.value.length > 5) {
    searchLogs.value.pop()
  }
  console.log(log)
})

const x = ref(0)
const y = ref(0)
const sum = ref(0)

watchEffect(() => {
  sum.value = x.value + y.value
  console.log(`watchEffect: ${x.value} + ${y.value} = ${sum.value}`)
})
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

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  background: #f8f9fa;
  margin: 0.5rem 0;
  border-radius: 6px;
}

.cart-item button {
  padding: 0.3rem 0.8rem;
  margin-left: 0.3rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.total {
  margin-top: 1rem;
  padding: 1rem;
  background: #e8f4f8;
  border-radius: 6px;
  border-left: 4px solid #667eea;
}

.total p {
  margin: 0.5rem 0;
  color: #555;
}

.total strong {
  color: #667eea;
  font-size: 1.2rem;
}

.demo-box input {
  width: 100%;
  padding: 0.6rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  margin: 0.5rem 0;
}

.demo-box input:focus {
  outline: none;
  border-color: #667eea;
}

.result {
  margin-top: 1rem;
  padding: 1rem;
  background: #e8f4f8;
  border-radius: 6px;
}

.result strong {
  color: #667eea;
  font-size: 1.2rem;
}

.log-box {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  max-height: 150px;
  overflow-y: auto;
}

.log-box p {
  margin: 0.3rem 0;
  color: #555;
  font-size: 0.9rem;
  font-family: monospace;
}

.info {
  margin-top: 1rem;
  padding: 0.8rem;
  background: #fff3cd;
  border-radius: 6px;
  color: #856404;
  font-size: 0.9rem;
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
}
</style>
