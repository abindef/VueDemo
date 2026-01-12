# Vue3 核心概念详解

## 目录
- [响应式系统](#响应式系统)
- [计算属性与侦听器](#计算属性与侦听器)
- [组件生命周期](#组件生命周期)
- [组件通信](#组件通信)
- [指令系统](#指令系统)
- [Composition API](#composition-api)
- [状态管理 Pinia](#状态管理-pinia)

---

## 响应式系统

### 什么是响应式？
响应式是 Vue 的核心特性，当数据变化时，视图会自动更新。Vue3 使用 Proxy 实现响应式系统。

### ref vs reactive

#### ref - 基本类型
```javascript
import { ref } from 'vue'

const count = ref(0)
count.value++  // 在 JS 中需要 .value

// 在模板中自动解包，不需要 .value
<template>
  <div>{{ count }}</div>
</template>
```

**使用场景：**
- 基本类型：数字、字符串、布尔值
- 需要重新赋值的对象

#### reactive - 对象类型
```javascript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  name: '张三'
})

state.count++  // 直接访问属性
```

**使用场景：**
- 对象类型
- 数组类型
- 不需要重新赋值整个对象

### toRef 和 toRefs

#### toRef - 单个属性转 ref
```javascript
import { reactive, toRef } from 'vue'

const state = reactive({ count: 0 })
const count = toRef(state, 'count')

count.value++  // 会同步更新 state.count
```

#### toRefs - 所有属性转 ref
```javascript
import { reactive, toRefs } from 'vue'

const state = reactive({
  name: '张三',
  age: 25
})

const { name, age } = toRefs(state)
// 解构后仍保持响应式
```

### 响应式原理

**Vue2 (Object.defineProperty):**
- 需要递归遍历所有属性
- 无法检测新增/删除属性
- 无法检测数组索引和长度变化

**Vue3 (Proxy):**
- 可以监听整个对象
- 可以检测新增/删除属性
- 可以检测数组变化
- 性能更好

---

## 计算属性与侦听器

### computed - 计算属性

#### 只读计算属性
```javascript
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)
```

**特点：**
- 基于响应式依赖缓存
- 依赖不变时不会重新计算
- 比方法调用更高效

#### 可写计算属性
```javascript
const firstName = ref('张')
const lastName = ref('三')

const fullName = computed({
  get: () => firstName.value + lastName.value,
  set: (val) => {
    [firstName.value, lastName.value] = val.split(' ')
  }
})
```

### watch - 侦听器

#### 侦听单个数据源
```javascript
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newVal, oldVal) => {
  console.log(`count 从 ${oldVal} 变为 ${newVal}`)
})
```

#### 侦听多个数据源
```javascript
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log('count 或 name 变化了')
})
```

#### 深度侦听
```javascript
const state = reactive({ count: 0 })

watch(
  () => state.count,
  (newVal) => {
    console.log('count 变化:', newVal)
  }
)

// 深度侦听整个对象
watch(state, (newVal) => {
  console.log('state 变化:', newVal)
}, { deep: true })
```

### watchEffect - 自动侦听

```javascript
import { ref, watchEffect } from 'vue'

const count = ref(0)
const name = ref('张三')

watchEffect(() => {
  // 自动追踪 count 和 name
  console.log(`${name.value}: ${count.value}`)
})
```

**特点：**
- 立即执行一次
- 自动追踪依赖
- 不需要明确指定侦听的数据

### computed vs watch

| 特性 | computed | watch |
|------|----------|-------|
| 用途 | 计算派生值 | 执行副作用 |
| 缓存 | 有缓存 | 无缓存 |
| 返回值 | 必须返回值 | 不需要返回值 |
| 异步 | 不支持 | 支持 |

---

## 组件生命周期

### 生命周期钩子

```javascript
import { 
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

// 挂载前
onBeforeMount(() => {
  console.log('组件即将挂载')
})

// 挂载后 - 最常用
onMounted(() => {
  console.log('组件已挂载，DOM 可用')
  // 适合：API 请求、DOM 操作、初始化第三方库
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
})
```

### 生命周期流程

```
setup() 
  ↓
onBeforeMount - 模板编译完成，DOM 未挂载
  ↓
onMounted - DOM 已挂载，可以访问 DOM
  ↓
[数据变化]
  ↓
onBeforeUpdate - 数据变化，DOM 未更新
  ↓
onUpdated - DOM 已更新
  ↓
onBeforeUnmount - 组件即将卸载
  ↓
onUnmounted - 组件已卸载，清理资源
```

### 常见使用场景

**onMounted:**
- 发起 API 请求
- 初始化第三方库（图表、地图等）
- 设置定时器
- 添加事件监听器
- 访问 DOM 元素

**onUnmounted:**
- 清除定时器
- 移除事件监听器
- 取消未完成的请求
- 断开 WebSocket 连接
- 销毁第三方库实例

---

## 组件通信

### 1. Props - 父传子

#### 父组件
```vue
<template>
  <ChildComponent 
    :message="msg" 
    :count="10"
    :user="userInfo"
  />
</template>

<script setup>
import { ref } from 'vue'

const msg = ref('Hello')
const userInfo = ref({ name: '张三' })
</script>
```

#### 子组件
```vue
<script setup>
// 简单声明
const props = defineProps(['message', 'count'])

// 带类型验证
const props = defineProps({
  message: String,
  count: {
    type: Number,
    default: 0,
    required: true
  },
  user: {
    type: Object,
    default: () => ({})
  }
})
</script>
```

### 2. Emit - 子传父

#### 子组件
```vue
<script setup>
const emit = defineEmits(['update', 'delete'])

const handleClick = () => {
  emit('update', { id: 1, name: '新数据' })
}
</script>
```

#### 父组件
```vue
<template>
  <ChildComponent 
    @update="handleUpdate"
    @delete="handleDelete"
  />
</template>

<script setup>
const handleUpdate = (data) => {
  console.log('接收到数据:', data)
}
</script>
```

### 3. v-model - 双向绑定

#### 子组件
```vue
<template>
  <input 
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>
```

#### 父组件
```vue
<template>
  <CustomInput v-model="text" />
  <!-- 等价于 -->
  <CustomInput 
    :modelValue="text"
    @update:modelValue="text = $event"
  />
</template>
```

### 4. Provide / Inject - 跨层级

#### 祖先组件
```vue
<script setup>
import { provide, ref } from 'vue'

const theme = ref('dark')
provide('theme', theme)
</script>
```

#### 后代组件
```vue
<script setup>
import { inject } from 'vue'

const theme = inject('theme')
const theme = inject('theme', 'light')  // 带默认值
</script>
```

### 通信方式对比

| 方式 | 适用场景 | 特点 |
|------|----------|------|
| Props | 父→子 | 单向数据流 |
| Emit | 子→父 | 事件触发 |
| v-model | 父↔子 | 双向绑定 |
| Provide/Inject | 跨层级 | 避免 props 逐层传递 |
| Pinia | 全局 | 复杂状态管理 |

---

## 指令系统

### v-if / v-else / v-show

```vue
<!-- v-if: 条件为真时渲染 -->
<div v-if="show">显示内容</div>
<div v-else-if="type === 'A'">类型 A</div>
<div v-else>其他类型</div>

<!-- v-show: 通过 CSS display 控制 -->
<div v-show="show">显示内容</div>
```

**区别：**
- `v-if`: 真正的条件渲染，切换时元素会被销毁和重建
- `v-show`: 只是切换 CSS display 属性
- `v-if` 有更高的切换开销
- `v-show` 有更高的初始渲染开销

**使用建议：**
- 频繁切换用 `v-show`
- 条件很少改变用 `v-if`

### v-for

```vue
<!-- 遍历数组 -->
<div v-for="(item, index) in items" :key="item.id">
  {{ index }}: {{ item.name }}
</div>

<!-- 遍历对象 -->
<div v-for="(value, key, index) in object" :key="key">
  {{ key }}: {{ value }}
</div>

<!-- 遍历数字 -->
<div v-for="n in 10" :key="n">{{ n }}</div>
```

**注意事项：**
- 必须提供 `:key`，且 key 应该是唯一且稳定的
- 不要用 index 作为 key（除非列表是静态的）
- 不要和 `v-if` 一起使用（v-if 优先级更高）

### v-model

```vue
<!-- 文本输入 -->
<input v-model="text" />

<!-- 多行文本 -->
<textarea v-model="message"></textarea>

<!-- 复选框 -->
<input type="checkbox" v-model="checked" />

<!-- 单选框 -->
<input type="radio" v-model="picked" value="A" />

<!-- 下拉选择 -->
<select v-model="selected">
  <option value="A">A</option>
</select>
```

**修饰符：**
- `.lazy`: 在 change 事件后更新
- `.number`: 转换为数字
- `.trim`: 去除首尾空格

```vue
<input v-model.lazy="msg" />
<input v-model.number="age" />
<input v-model.trim="text" />
```

### v-bind

```vue
<!-- 属性绑定 -->
<img :src="imageUrl" :alt="imageAlt" />

<!-- class 绑定 -->
<div :class="{ active: isActive, disabled: isDisabled }"></div>
<div :class="[classA, classB]"></div>

<!-- style 绑定 -->
<div :style="{ color: textColor, fontSize: fontSize + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>
```

### v-on

```vue
<!-- 事件监听 -->
<button @click="handleClick">点击</button>
<button @click="count++">内联表达式</button>
<button @click="handleClick($event, 'param')">带参数</button>

<!-- 事件修饰符 -->
<button @click.stop="handleClick">阻止冒泡</button>
<form @submit.prevent="onSubmit">阻止默认行为</form>
<button @click.once="handleClick">只触发一次</button>

<!-- 按键修饰符 -->
<input @keyup.enter="onEnter" />
<input @keyup.esc="onEsc" />
<input @keyup.ctrl.enter="onCtrlEnter" />
```

---

## Composition API

### 为什么使用 Composition API？

**Options API 的问题：**
- 相关逻辑分散在不同选项中
- 逻辑复用困难（mixins 有命名冲突）
- TypeScript 支持不够好

**Composition API 的优势：**
- 更好的逻辑复用
- 更灵活的代码组织
- 更好的类型推导
- 更小的打包体积

### 自定义 Hook

#### useCounter
```javascript
// composables/useCounter.js
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
```

#### useMouse
```javascript
// composables/useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  
  const update = (event) => {
    x.value = event.pageX
    y.value = event.pageY
  }
  
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })
  
  return { x, y }
}
```

#### useFetch
```javascript
// composables/useFetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const fetchData = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(url)
      data.value = await response.json()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }
  
  return { data, loading, error, fetchData }
}
```

### 在组件中使用

```vue
<script setup>
import { useCounter } from './composables/useCounter'
import { useMouse } from './composables/useMouse'

const { count, increment, decrement } = useCounter(0)
const { x, y } = useMouse()
</script>
```

---

## 状态管理 Pinia

### 为什么需要状态管理？

**适用场景：**
- 多个组件需要共享状态
- 状态需要持久化
- 复杂的状态管理逻辑
- 需要在多个页面间传递数据

### 定义 Store

```javascript
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // State
  state: () => ({
    count: 0,
    name: '计数器'
  }),
  
  // Getters (计算属性)
  getters: {
    doubleCount: (state) => state.count * 2,
    
    // 可以访问其他 getter
    doubleCountPlusOne() {
      return this.doubleCount + 1
    }
  },
  
  // Actions (方法)
  actions: {
    increment() {
      this.count++
    },
    
    // 支持异步
    async fetchData() {
      const response = await fetch('/api/data')
      this.data = await response.json()
    }
  }
})
```

### 使用 Store

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

// 访问 state
console.log(store.count)

// 访问 getter
console.log(store.doubleCount)

// 调用 action
store.increment()

// 批量更新
store.$patch({
  count: 10,
  name: '新名称'
})

// 重置 state
store.$reset()
</script>
```

### 解构 Store

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

// 解构 state 和 getters（保持响应式）
const { count, doubleCount } = storeToRefs(store)

// 解构 actions（不需要 storeToRefs）
const { increment, decrement } = store
</script>
```

### Store 之间的通信

```javascript
// stores/user.js
import { defineStore } from 'pinia'
import { useCounterStore } from './counter'

export const useUserStore = defineStore('user', {
  actions: {
    async login() {
      // 访问其他 store
      const counterStore = useCounterStore()
      counterStore.increment()
    }
  }
})
```

### Pinia vs Vuex

| 特性 | Pinia | Vuex |
|------|-------|------|
| API | 简单直观 | 相对复杂 |
| TypeScript | 完整支持 | 需要额外配置 |
| Mutations | 不需要 | 需要 |
| 模块化 | 自动 | 手动配置 |
| DevTools | 支持 | 支持 |
| 体积 | 更小 | 较大 |

---

## 最佳实践

### 1. 组件设计原则
- 单一职责：每个组件只做一件事
- 可复用性：提取通用逻辑到组合函数
- Props 验证：始终验证 props 类型
- 事件命名：使用 kebab-case

### 2. 性能优化
- 使用 `v-show` 代替频繁切换的 `v-if`
- 为 `v-for` 提供唯一的 `key`
- 使用 `computed` 缓存计算结果
- 避免在模板中使用复杂表达式
- 使用 `watchEffect` 代替多个 `watch`

### 3. 代码组织
- 按功能组织代码，不按选项
- 提取可复用逻辑到组合函数
- 使用 TypeScript 提高类型安全
- 保持组件小而专注

### 4. 状态管理
- 局部状态用 `ref`/`reactive`
- 跨组件状态用 `provide`/`inject`
- 全局状态用 Pinia
- 避免过度使用全局状态

### 5. 调试技巧
- 使用 Vue DevTools
- 使用 `console.log` 追踪数据变化
- 使用 `watchEffect` 监控响应式数据
- 在浏览器中设置断点

---

## 学习资源

- [Vue3 官方文档](https://cn.vuejs.org/)
- [Vue Router 文档](https://router.vuejs.org/zh/)
- [Pinia 文档](https://pinia.vuejs.org/zh/)
- [Vite 文档](https://cn.vitejs.dev/)
- [Vue3 源码解析](https://github.com/vuejs/core)

---

## 下一步

1. **实践项目**：构建一个完整的应用
2. **TypeScript**：学习 Vue3 + TypeScript
3. **UI 框架**：学习 Element Plus、Ant Design Vue
4. **测试**：学习 Vitest、Vue Test Utils
5. **SSR**：学习 Nuxt 3
