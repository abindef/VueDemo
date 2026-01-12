<template>
  <div class="demo-container">
    <h2>1️⃣ 响应式系统</h2>
    <p class="intro">Vue3 使用 Proxy 实现响应式系统，主要通过 ref 和 reactive 创建响应式数据</p>

    <div class="demo-section">
      <h3>📌 ref - 基本类型响应式</h3>
      <div class="code-demo">
        <div class="demo-box">
          <p>计数器: <strong>{{ count }}</strong></p>
          <button @click="increment">增加</button>
          <button @click="decrement">减少</button>
          <button @click="reset">重置</button>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li><code>ref()</code> 用于创建基本类型的响应式数据</li>
            <li>在 JS 中访问需要 <code>.value</code></li>
            <li>在模板中会自动解包，不需要 <code>.value</code></li>
            <li>修改值会自动触发视图更新</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 reactive - 对象类型响应式</h3>
      <div class="code-demo">
        <div class="demo-box">
          <p>用户信息:</p>
          <div class="user-info">
            <p>姓名: <strong>{{ user.name }}</strong></p>
            <p>年龄: <strong>{{ user.age }}</strong></p>
            <p>职位: <strong>{{ user.job }}</strong></p>
          </div>
          <button @click="updateUser">更新信息</button>
          <button @click="incrementAge">年龄+1</button>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li><code>reactive()</code> 用于创建对象的响应式数据</li>
            <li>直接访问属性，不需要 <code>.value</code></li>
            <li>只能用于对象类型（对象、数组）</li>
            <li>修改属性会自动触发视图更新</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 toRef 和 toRefs</h3>
      <div class="code-demo">
        <div class="demo-box">
          <p>产品名称: <strong>{{ productName }}</strong></p>
          <p>产品价格: <strong>{{ productPrice }}</strong></p>
          <button @click="updateProduct">更新产品</button>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li><code>toRef</code> 将响应式对象的单个属性转为 ref</li>
            <li><code>toRefs</code> 将响应式对象的所有属性转为 ref</li>
            <li>保持与原对象的响应式连接</li>
            <li>常用于解构响应式对象</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 响应式数组操作</h3>
      <div class="code-demo">
        <div class="demo-box">
          <div class="list-container">
            <div v-for="item in items" :key="item.id" class="list-item">
              {{ item.name }}
            </div>
          </div>
          <button @click="addItem">添加项目</button>
          <button @click="removeItem">删除项目</button>
          <button @click="updateFirstItem">更新第一项</button>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li>数组的变更方法（push、pop、shift 等）会触发更新</li>
            <li>直接修改索引也会触发更新（Vue3 改进）</li>
            <li>替换整个数组也会触发更新</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="code-block">
      <h3>📝 核心代码示例</h3>
      <pre><code>import { ref, reactive, toRef, toRefs } from 'vue'

// 1. ref - 基本类型
const count = ref(0)
count.value++  // 在 JS 中需要 .value

// 2. reactive - 对象类型
const user = reactive({
  name: '张三',
  age: 25
})
user.age++  // 直接访问属性

// 3. toRef - 单个属性转 ref
const name = toRef(user, 'name')
name.value = '李四'  // 会同步更新 user.name

// 4. toRefs - 所有属性转 ref
const { name, age } = toRefs(user)
name.value = '王五'  // 保持响应式</code></pre>
    </div>

    <div class="tips-box">
      <h3>🎯 最佳实践</h3>
      <ul>
        <li><strong>基本类型用 ref：</strong>数字、字符串、布尔值等</li>
        <li><strong>对象类型用 reactive：</strong>对象、数组等</li>
        <li><strong>解构时用 toRefs：</strong>保持响应式连接</li>
        <li><strong>模板中自动解包：</strong>ref 在模板中不需要 .value</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRef, toRefs } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
  console.log('count 增加:', count.value)
}

const decrement = () => {
  count.value--
  console.log('count 减少:', count.value)
}

const reset = () => {
  count.value = 0
  console.log('count 重置:', count.value)
}

const user = reactive({
  name: '张三',
  age: 25,
  job: '后端工程师'
})

const updateUser = () => {
  user.name = '李四'
  user.age = 28
  user.job = '全栈工程师'
  console.log('用户信息更新:', user)
}

const incrementAge = () => {
  user.age++
  console.log('年龄增加:', user.age)
}

const product = reactive({
  name: 'Vue3 教程',
  price: 99
})

const productName = toRef(product, 'name')
const productPrice = toRef(product, 'price')

const updateProduct = () => {
  productName.value = 'Vue3 进阶教程'
  productPrice.value = 199
  console.log('产品更新:', product)
}

const items = ref([
  { id: 1, name: '项目 1' },
  { id: 2, name: '项目 2' },
  { id: 3, name: '项目 3' }
])

let nextId = 4

const addItem = () => {
  items.value.push({ id: nextId++, name: `项目 ${nextId - 1}` })
  console.log('添加项目:', items.value)
}

const removeItem = () => {
  if (items.value.length > 0) {
    items.value.pop()
    console.log('删除项目:', items.value)
  }
}

const updateFirstItem = () => {
  if (items.value.length > 0) {
    items.value[0].name = '已更新的项目'
    console.log('更新第一项:', items.value[0])
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
  font-size: 0.95rem;
  transition: all 0.3s;
}

.demo-box button:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

.user-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  margin: 1rem 0;
}

.list-container {
  max-height: 200px;
  overflow-y: auto;
  margin: 1rem 0;
}

.list-item {
  padding: 0.8rem;
  background: #f8f9fa;
  margin: 0.5rem 0;
  border-radius: 6px;
  border-left: 3px solid #667eea;
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
