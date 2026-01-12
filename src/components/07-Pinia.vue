<template>
  <div class="demo-container">
    <h2>7️⃣ Pinia 状态管理</h2>
    <p class="intro">Pinia 是 Vue 3 推荐的状态管理库，提供简单、类型安全的 API</p>

    <div class="demo-section">
      <h3>📌 Counter Store - 基础用法</h3>
      <div class="code-demo">
        <div class="demo-box">
          <h4>计数器状态</h4>
          <p>当前计数: <strong>{{ counterStore.count }}</strong></p>
          <p>双倍计数: <strong>{{ counterStore.doubleCount }}</strong></p>
          <button @click="counterStore.increment()">增加</button>
          <button @click="counterStore.decrement()">减少</button>
          <button @click="counterStore.reset()">重置</button>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li>使用 <code>defineStore</code> 定义 store</li>
            <li><code>state</code> - 存储状态</li>
            <li><code>getters</code> - 计算属性</li>
            <li><code>actions</code> - 修改状态的方法</li>
            <li>直接访问 store 的属性和方法</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 User Store - 用户管理</h3>
      <div class="code-demo">
        <div class="demo-box">
          <h4>用户信息</h4>
          <div v-if="userStore.isLoggedIn" class="user-info">
            <p>用户名: <strong>{{ userStore.user.name }}</strong></p>
            <p>邮箱: <strong>{{ userStore.user.email }}</strong></p>
            <p>角色: <strong>{{ userStore.user.role }}</strong></p>
            <button @click="userStore.logout()">退出登录</button>
          </div>
          <div v-else class="login-form">
            <input v-model="username" placeholder="用户名" />
            <input v-model="email" placeholder="邮箱" />
            <button @click="handleLogin">登录</button>
          </div>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li>管理用户登录状态</li>
            <li>使用 getters 计算派生状态</li>
            <li>actions 可以是异步的</li>
            <li>多个组件共享状态</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 Todo Store - 待办事项</h3>
      <div class="code-demo">
        <div class="demo-box">
          <h4>待办列表</h4>
          <div class="todo-input">
            <input 
              v-model="newTodo" 
              @keyup.enter="handleAddTodo"
              placeholder="输入待办事项..."
            />
            <button @click="handleAddTodo">添加</button>
          </div>
          
          <div class="todo-stats">
            <p>总数: {{ todoStore.todos.length }}</p>
            <p>已完成: {{ todoStore.completedCount }}</p>
            <p>未完成: {{ todoStore.uncompletedCount }}</p>
          </div>
          
          <div class="todo-list">
            <div 
              v-for="todo in todoStore.todos" 
              :key="todo.id"
              class="todo-item"
              :class="{ completed: todo.completed }"
            >
              <input 
                type="checkbox" 
                :checked="todo.completed"
                @change="todoStore.toggleTodo(todo.id)"
              />
              <span>{{ todo.text }}</span>
              <button @click="todoStore.removeTodo(todo.id)">删除</button>
            </div>
          </div>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li>管理复杂的列表状态</li>
            <li>使用 getters 计算统计信息</li>
            <li>actions 处理业务逻辑</li>
            <li>状态持久化（可选）</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 Store 之间的通信</h3>
      <div class="code-demo">
        <div class="demo-box">
          <h4>组合使用多个 Store</h4>
          <div class="store-info">
            <p>计数器: {{ counterStore.count }}</p>
            <p>用户: {{ userStore.isLoggedIn ? userStore.user.name : '未登录' }}</p>
            <p>待办数: {{ todoStore.todos.length }}</p>
          </div>
          <button @click="resetAll">重置所有状态</button>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li>可以在一个组件中使用多个 store</li>
            <li>Store 之间可以相互调用</li>
            <li>保持状态的独立性</li>
            <li>便于模块化管理</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="code-block">
      <h3>📝 Pinia Store 定义示例</h3>
      <pre><code>// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // State
  state: () => ({
    count: 0
  }),
  
  // Getters (计算属性)
  getters: {
    doubleCount: (state) => state.count * 2
  },
  
  // Actions (方法)
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    }
  }
})

// 在组件中使用
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
counterStore.increment()  // 调用 action
console.log(counterStore.count)  // 访问 state
console.log(counterStore.doubleCount)  // 访问 getter</code></pre>
    </div>

    <div class="tips-box">
      <h3>🎯 Pinia 优势</h3>
      <ul>
        <li><strong>简单直观：</strong>API 简单，易于学习</li>
        <li><strong>类型安全：</strong>完整的 TypeScript 支持</li>
        <li><strong>模块化：</strong>每个 store 都是独立的</li>
        <li><strong>DevTools：</strong>强大的开发者工具支持</li>
        <li><strong>轻量级：</strong>体积小，性能好</li>
        <li><strong>支持插件：</strong>可扩展性强</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCounterStore } from '../stores/counter'
import { useUserStore } from '../stores/user'
import { useTodoStore } from '../stores/todo'

const counterStore = useCounterStore()
const userStore = useUserStore()
const todoStore = useTodoStore()

const username = ref('')
const email = ref('')

const handleLogin = () => {
  if (username.value && email.value) {
    userStore.login({
      name: username.value,
      email: email.value,
      role: '开发者'
    })
    username.value = ''
    email.value = ''
  }
}

const newTodo = ref('')

const handleAddTodo = () => {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value)
    newTodo.value = ''
  }
}

const resetAll = () => {
  counterStore.reset()
  userStore.logout()
  todoStore.todos = []
  console.log('所有状态已重置')
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

.user-info {
  padding: 1rem;
  background: #e8f4f8;
  border-radius: 6px;
  border-left: 4px solid #667eea;
}

.login-form {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.todo-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.todo-input input {
  flex: 1;
  margin: 0;
}

.todo-input button {
  margin: 0;
}

.todo-stats {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.todo-stats p {
  margin: 0;
}

.todo-list {
  max-height: 300px;
  overflow-y: auto;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem;
  background: #f8f9fa;
  margin: 0.5rem 0;
  border-radius: 6px;
  transition: all 0.3s;
}

.todo-item:hover {
  background: #e8f4f8;
}

.todo-item.completed span {
  text-decoration: line-through;
  opacity: 0.6;
}

.todo-item input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.todo-item span {
  flex: 1;
  color: #555;
}

.todo-item button {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  background: #dc3545;
  margin: 0;
}

.store-info {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  margin-bottom: 1rem;
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
  .code-demo {
    grid-template-columns: 1fr;
  }
  
  .todo-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
