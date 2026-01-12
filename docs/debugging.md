# 前端调试技巧完全指南

## 目录
- [浏览器开发者工具](#浏览器开发者工具)
- [Vue DevTools](#vue-devtools)
- [Console 调试](#console-调试)
- [断点调试](#断点调试)
- [网络调试](#网络调试)
- [性能调试](#性能调试)
- [常见问题排查](#常见问题排查)

---

## 浏览器开发者工具

### 打开开发者工具
- **Windows/Linux**: `F12` 或 `Ctrl + Shift + I`
- **Mac**: `Cmd + Option + I`
- **右键菜单**: 右键 → 检查元素

### 主要面板介绍

#### 1. Elements (元素)
查看和修改 DOM 结构和 CSS 样式

**常用功能：**
- 查看元素结构
- 实时修改 HTML
- 调试 CSS 样式
- 查看盒模型
- 查看事件监听器

**快捷键：**
- `Ctrl + Shift + C`: 选择元素
- `H`: 隐藏元素
- `Delete`: 删除元素

#### 2. Console (控制台)
执行 JavaScript 代码和查看日志

**常用功能：**
- 查看错误和警告
- 执行 JavaScript 代码
- 查看变量值
- 测试 API

#### 3. Sources (源代码)
调试 JavaScript 代码

**常用功能：**
- 设置断点
- 单步执行
- 查看调用栈
- 监视变量

#### 4. Network (网络)
监控网络请求

**常用功能：**
- 查看请求详情
- 分析加载时间
- 查看请求头和响应
- 模拟网络速度

#### 5. Application (应用)
管理存储和缓存

**常用功能：**
- 查看 LocalStorage
- 查看 SessionStorage
- 查看 Cookies
- 清除缓存

---

## Vue DevTools

### 安装

**Chrome:**
1. 访问 Chrome Web Store
2. 搜索 "Vue.js devtools"
3. 点击 "添加至 Chrome"

**Firefox:**
1. 访问 Firefox Add-ons
2. 搜索 "Vue.js devtools"
3. 点击 "添加到 Firefox"

### 主要功能

#### 1. Components (组件树)
查看组件层级和状态

**功能：**
- 查看组件树结构
- 查看组件的 props、data、computed
- 实时修改组件状态
- 查看组件事件

**使用技巧：**
```javascript
// 在组件中添加 name 便于识别
export default {
  name: 'MyComponent'
}
```

#### 2. Timeline (时间线)
记录组件事件和状态变化

**功能：**
- 查看事件触发顺序
- 查看状态变化历史
- 性能分析

#### 3. Routes (路由)
查看路由信息

**功能：**
- 查看当前路由
- 查看路由参数
- 查看路由历史

#### 4. Pinia (状态管理)
查看和调试 Pinia store

**功能：**
- 查看 store 状态
- 查看 getters
- 触发 actions
- 时间旅行调试

---

## Console 调试

### 基本输出

```javascript
// 普通输出
console.log('普通信息')

// 警告
console.warn('警告信息')

// 错误
console.error('错误信息')

// 信息
console.info('提示信息')
```

### 格式化输出

```javascript
// 字符串格式化
console.log('用户 %s 年龄 %d', '张三', 25)

// CSS 样式
console.log(
  '%c样式化输出',
  'color: blue; font-size: 20px; font-weight: bold;'
)

// 多个样式
console.log(
  '%c成功 %c失败',
  'color: green;',
  'color: red;'
)
```

### 对象输出

```javascript
const user = { name: '张三', age: 25 }

// 普通输出
console.log(user)

// 表格输出
console.table(user)

// 目录输出
console.dir(user)

// JSON 格式
console.log(JSON.stringify(user, null, 2))
```

### 分组输出

```javascript
console.group('用户信息')
console.log('姓名: 张三')
console.log('年龄: 25')
console.groupEnd()

// 默认折叠
console.groupCollapsed('详细信息')
console.log('地址: 北京')
console.groupEnd()
```

### 计时

```javascript
console.time('操作耗时')
// 执行一些操作
for (let i = 0; i < 1000000; i++) {}
console.timeEnd('操作耗时')
```

### 断言

```javascript
const age = 15
console.assert(age >= 18, '年龄必须大于等于18')
```

### 追踪调用栈

```javascript
function a() {
  b()
}

function b() {
  console.trace('调用栈追踪')
}

a()
```

### 计数

```javascript
function increment() {
  console.count('点击次数')
}

increment()  // 点击次数: 1
increment()  // 点击次数: 2
console.countReset('点击次数')
increment()  // 点击次数: 1
```

---

## 断点调试

### 设置断点

#### 1. 代码中设置
```javascript
function calculate(a, b) {
  debugger  // 代码会在这里暂停
  return a + b
}
```

#### 2. 开发者工具中设置
1. 打开 Sources 面板
2. 找到对应的文件
3. 点击行号设置断点

### 断点类型

#### 1. 普通断点
在指定行暂停

#### 2. 条件断点
只在满足条件时暂停
```javascript
// 右键行号 → Add conditional breakpoint
// 输入条件: count > 10
```

#### 3. 日志断点
不暂停，只输出日志
```javascript
// 右键行号 → Add logpoint
// 输入: 'count:', count
```

#### 4. DOM 断点
- Subtree modifications: 子节点变化时暂停
- Attribute modifications: 属性变化时暂停
- Node removal: 节点删除时暂停

#### 5. 事件监听器断点
在特定事件触发时暂停
- Mouse → click
- Keyboard → keydown
- Load → load

### 调试控制

**快捷键：**
- `F8` 或 `Ctrl + \`: 继续执行
- `F10` 或 `Ctrl + '`: 单步跳过（Step Over）
- `F11` 或 `Ctrl + ;`: 单步进入（Step Into）
- `Shift + F11` 或 `Ctrl + Shift + ;`: 单步退出（Step Out）

### 监视变量

在 Sources 面板的 Watch 区域添加表达式：
```javascript
count
user.name
items.length
```

### 调用栈

查看函数调用顺序，点击可跳转到对应位置

### Scope (作用域)

查看当前作用域的变量：
- Local: 局部变量
- Closure: 闭包变量
- Global: 全局变量

---

## 网络调试

### Network 面板

#### 查看请求
1. 打开 Network 面板
2. 刷新页面
3. 点击请求查看详情

#### 请求信息
- **Headers**: 请求头和响应头
- **Preview**: 响应预览
- **Response**: 原始响应
- **Timing**: 时间分析

#### 过滤请求
- **All**: 所有请求
- **XHR**: Ajax 请求
- **JS**: JavaScript 文件
- **CSS**: 样式文件
- **Img**: 图片
- **Media**: 媒体文件
- **Font**: 字体文件

#### 模拟网络
1. 点击 "No throttling"
2. 选择网络速度（Fast 3G、Slow 3G 等）
3. 测试慢速网络下的表现

### 使用 Fetch/XHR 断点

1. 打开 Sources 面板
2. 展开 XHR/fetch Breakpoints
3. 添加 URL 模式
4. 请求匹配时会自动暂停

---

## 性能调试

### Performance 面板

#### 录制性能
1. 打开 Performance 面板
2. 点击录制按钮
3. 执行操作
4. 停止录制
5. 分析结果

#### 分析指标
- **FPS**: 帧率（应保持在 60fps）
- **CPU**: CPU 使用率
- **NET**: 网络活动
- **Heap**: 内存使用

### Lighthouse

#### 运行审计
1. 打开 Lighthouse 面板
2. 选择审计类别
3. 点击 "Generate report"
4. 查看建议

#### 审计类别
- **Performance**: 性能
- **Accessibility**: 可访问性
- **Best Practices**: 最佳实践
- **SEO**: 搜索引擎优化
- **PWA**: 渐进式 Web 应用

### Memory 面板

#### 检测内存泄漏
1. 打开 Memory 面板
2. 选择 "Heap snapshot"
3. 执行操作
4. 再次拍摄快照
5. 对比两次快照

---

## Vue 特定调试

### 响应式数据调试

```javascript
import { watchEffect } from 'vue'

// 监控所有依赖
watchEffect(() => {
  console.log('count:', count.value)
  console.log('name:', name.value)
})
```

### 组件调试

```javascript
import { onMounted, onUpdated } from 'vue'

onMounted(() => {
  console.log('组件已挂载')
  console.log('DOM:', this.$el)
})

onUpdated(() => {
  console.log('组件已更新')
})
```

### Props 验证

```javascript
defineProps({
  count: {
    type: Number,
    required: true,
    validator: (value) => {
      if (value < 0) {
        console.warn('count 不能为负数')
        return false
      }
      return true
    }
  }
})
```

### 自定义调试工具

```javascript
// composables/useDebug.js
export function useDebug(name) {
  const log = (...args) => {
    console.log(`[${name}]`, ...args)
  }
  
  const error = (...args) => {
    console.error(`[${name}]`, ...args)
  }
  
  const time = (label) => {
    console.time(`[${name}] ${label}`)
  }
  
  const timeEnd = (label) => {
    console.timeEnd(`[${name}] ${label}`)
  }
  
  return { log, error, time, timeEnd }
}

// 使用
const debug = useDebug('MyComponent')
debug.log('组件初始化')
debug.time('数据加载')
// ...
debug.timeEnd('数据加载')
```

---

## 常见问题排查

### 1. 数据不更新

**检查：**
- 是否使用了 `ref` 或 `reactive`
- 是否正确使用 `.value`
- 数组/对象是否正确更新

```javascript
// ❌ 错误
const count = 0
count++  // 不是响应式

// ✅ 正确
const count = ref(0)
count.value++
```

### 2. 组件不渲染

**检查：**
- 组件是否正确导入
- 组件是否正确注册
- 条件渲染是否正确
- key 是否唯一

```javascript
// ✅ 正确导入和使用
import MyComponent from './MyComponent.vue'

<MyComponent />
```

### 3. 事件不触发

**检查：**
- 事件名称是否正确
- 是否正确使用 `@` 或 `v-on:`
- 方法是否存在
- 是否被其他元素遮挡

```javascript
// ✅ 正确
<button @click="handleClick">点击</button>

const handleClick = () => {
  console.log('clicked')
}
```

### 4. Props 不生效

**检查：**
- 是否使用 `:` 绑定动态值
- Props 名称是否正确（kebab-case vs camelCase）
- 是否在子组件中声明

```javascript
// ✅ 正确
<ChildComponent :user-name="name" />

// 子组件
defineProps(['userName'])
```

### 5. 样式不生效

**检查：**
- CSS 选择器是否正确
- 是否有更高优先级的样式
- scoped 样式是否影响
- 样式是否被覆盖

```vue
<style scoped>
/* scoped 样式只影响当前组件 */
.button {
  color: blue;
}
</style>
```

### 6. 路由跳转失败

**检查：**
- 路由路径是否正确
- 路由是否已注册
- 路由参数是否正确

```javascript
// ✅ 正确
router.push('/user/123')
router.push({ name: 'user', params: { id: 123 } })
```

### 7. API 请求失败

**检查：**
- 网络连接
- API 地址是否正确
- 请求方法是否正确
- 请求头是否正确
- CORS 配置

```javascript
// 查看网络请求
console.log('请求 URL:', url)
console.log('请求方法:', method)
console.log('请求头:', headers)
```

---

## 调试最佳实践

### 1. 使用有意义的日志

```javascript
// ❌ 不好
console.log(data)

// ✅ 好
console.log('用户数据加载成功:', data)
console.log('API 响应时间:', Date.now() - startTime, 'ms')
```

### 2. 使用条件日志

```javascript
const DEBUG = import.meta.env.DEV

if (DEBUG) {
  console.log('调试信息:', data)
}
```

### 3. 使用断言

```javascript
console.assert(user !== null, '用户不能为空')
console.assert(items.length > 0, '列表不能为空')
```

### 4. 记录错误

```javascript
try {
  // 可能出错的代码
} catch (error) {
  console.error('错误详情:', {
    message: error.message,
    stack: error.stack,
    context: { user, data }
  })
}
```

### 5. 使用性能标记

```javascript
performance.mark('start')
// 执行操作
performance.mark('end')
performance.measure('操作耗时', 'start', 'end')

const measures = performance.getEntriesByType('measure')
console.log('耗时:', measures[0].duration, 'ms')
```

---

## 调试工具推荐

### 浏览器扩展
- **Vue DevTools**: Vue 专用调试工具
- **React DevTools**: React 调试（如果需要）
- **Redux DevTools**: Redux 调试
- **Wappalyzer**: 检测网站技术栈

### VS Code 扩展
- **Vetur**: Vue 语法高亮和智能提示
- **Vue Language Features (Volar)**: Vue 3 官方推荐
- **ESLint**: 代码检查
- **Prettier**: 代码格式化
- **Debugger for Chrome**: Chrome 调试

### 在线工具
- **CodePen**: 在线代码编辑器
- **JSFiddle**: 在线代码测试
- **Vue SFC Playground**: Vue 单文件组件在线测试

---

## 总结

**调试流程：**
1. 复现问题
2. 查看错误信息
3. 使用 console.log 定位问题
4. 使用断点深入调试
5. 修复问题
6. 验证修复

**调试技巧：**
- 从简单到复杂
- 逐步缩小范围
- 使用二分法定位
- 查看文档和源码
- 搜索相似问题
- 寻求帮助

**预防问题：**
- 使用 TypeScript
- 编写测试
- 代码审查
- 使用 ESLint
- 遵循最佳实践
