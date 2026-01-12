# Vue3 学习项目

## 项目简介
这是一个专为后端开发工程师设计的 Vue3 学习项目，包含了 Vue3 的核心概念演示和详细的学习文档。

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 访问项目
浏览器会自动打开 http://localhost:3000

## 项目结构
```
VueDemo/
├── src/
│   ├── components/          # 核心概念演示组件
│   │   ├── 01-Reactive.vue      # 响应式系统
│   │   ├── 02-Computed.vue      # 计算属性
│   │   ├── 03-Lifecycle.vue     # 生命周期
│   │   ├── 04-Components.vue    # 组件通信
│   │   ├── 05-Directives.vue    # 指令使用
│   │   ├── 06-CompositionAPI.vue # 组合式 API
│   │   └── 07-Pinia.vue         # 状态管理
│   ├── stores/              # Pinia 状态管理
│   ├── router/              # 路由配置
│   ├── App.vue              # 根组件
│   └── main.js              # 入口文件
├── docs/                    # 学习文档
│   ├── vue3-core.md         # Vue3 核心概念
│   └── debugging.md         # 前端调试技巧
├── package.json
├── vite.config.js
└── README.md
```

## 学习路径

### 第一步：理解响应式系统
- 查看 `01-Reactive.vue` 了解 ref 和 reactive 的使用
- 理解 Vue3 的响应式原理（Proxy）

### 第二步：掌握计算属性和侦听器
- 查看 `02-Computed.vue` 学习 computed 和 watch
- 理解计算属性的缓存机制

### 第三步：组件生命周期
- 查看 `03-Lifecycle.vue` 了解生命周期钩子
- 掌握组件的创建、更新、销毁过程

### 第四步：组件通信
- 查看 `04-Components.vue` 学习父子组件通信
- 掌握 props、emit、provide/inject

### 第五步：指令系统
- 查看 `05-Directives.vue` 学习常用指令
- 理解 v-if、v-for、v-model 等指令

### 第六步：组合式 API
- 查看 `06-CompositionAPI.vue` 学习 Composition API
- 理解逻辑复用和代码组织

### 第七步：状态管理
- 查看 `07-Pinia.vue` 学习 Pinia 状态管理
- 理解全局状态管理的必要性

## 核心概念速查

### 响应式数据
```javascript
import { ref, reactive } from 'vue'

// ref: 用于基本类型
const count = ref(0)
count.value++

// reactive: 用于对象类型
const state = reactive({ count: 0 })
state.count++
```

### 计算属性
```javascript
import { computed } from 'vue'

const doubleCount = computed(() => count.value * 2)
```

### 生命周期
```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue'

onMounted(() => console.log('组件已挂载'))
onUpdated(() => console.log('组件已更新'))
onUnmounted(() => console.log('组件已卸载'))
```

### 组件通信
```javascript
// 父组件传递 props
<ChildComponent :message="msg" />

// 子组件接收 props
defineProps(['message'])

// 子组件触发事件
const emit = defineEmits(['update'])
emit('update', newValue)
```

## 调试技巧

### 1. Vue DevTools
安装 Vue DevTools 浏览器扩展，可以查看组件树、状态、事件等

### 2. Console 调试
```javascript
console.log('调试信息', data)
console.table(arrayData)
console.trace('追踪调用栈')
```

### 3. 断点调试
- 在浏览器开发者工具的 Sources 面板设置断点
- 使用 `debugger` 语句暂停代码执行

### 4. 响应式数据调试
```javascript
import { watchEffect } from 'vue'

watchEffect(() => {
  console.log('数据变化:', state.value)
})
```

## 常见问题

### Q: ref 和 reactive 的区别？
A: 
- `ref` 用于基本类型，需要通过 `.value` 访问
- `reactive` 用于对象类型，直接访问属性
- 模板中使用时，ref 会自动解包，不需要 `.value`

### Q: 为什么使用 Composition API？
A: 
- 更好的逻辑复用（通过组合函数）
- 更好的类型推导（TypeScript 支持）
- 更灵活的代码组织
- 更小的打包体积（tree-shaking）

### Q: 什么时候使用 Pinia？
A: 
- 多个组件需要共享状态
- 状态需要持久化
- 需要在多个页面间传递数据
- 复杂的状态管理逻辑

## 学习资源

- [Vue3 官方文档](https://cn.vuejs.org/)
- [Vue Router 文档](https://router.vuejs.org/zh/)
- [Pinia 文档](https://pinia.vuejs.org/zh/)
- [Vite 文档](https://cn.vitejs.dev/)

## 下一步学习

1. **TypeScript 集成**: 学习在 Vue3 中使用 TypeScript
2. **UI 框架**: 学习 Element Plus、Ant Design Vue 等 UI 框架
3. **HTTP 请求**: 学习使用 axios 进行 API 调用
4. **项目实战**: 构建一个完整的后台管理系统

## 提示

- 多动手实践，修改示例代码观察效果
- 使用 Vue DevTools 查看组件状态变化
- 阅读 `docs/` 目录下的详细文档
- 遇到问题先查看控制台错误信息
