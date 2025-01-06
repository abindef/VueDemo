<!--
  TodoList.vue
  功能：Todo列表组件
  职责：
  1. 展示和管理待办事项列表
  2. 提供添加、删除、切换完成状态的功能
  3. 支持任务过滤
-->

<template>
  <div class="todo-list">
    <!-- 主题切换 -->
    <ThemeSwitch />

    <!-- 任务输入区域 -->
    <TaskInput
      v-model="newTodo"
      @add-task="handleAddTodo"
    />

    <!-- 任务过滤器 -->
    <TaskFilters
      :current-filter="store.filter"
      :filters="filters"
      @filter-change="store.setFilter"
    />

    <!-- 任务列表 -->
    <TaskList
      :tasks="store.filteredTodos"
      @toggle-task="store.toggleTodo"
      @remove-task="store.removeTodo"
    />
  </div>
</template>

<script setup lang="ts">
// 导入依赖
import { ref, defineProps } from 'vue'
import { useTodoStore } from '@/stores/todo'
import { TodoFilter } from '@/types/todo'

// 导入子组件
import ThemeSwitch from './todo/ThemeSwitch.vue'
import TaskInput from './todo/TaskInput.vue'
import TaskFilters from './todo/TaskFilters.vue'
import TaskList from './todo/TaskList.vue'

// Props 定义
interface Props {
  storeKey?: string
}
const props = defineProps<Props>()

// Store 初始化
const store = useTodoStore(props.storeKey || 'default')

// 本地状态
const newTodo = ref('')
const filters = [TodoFilter.All, TodoFilter.Active, TodoFilter.Completed]

// 事件处理
const handleAddTodo = () => {
  const title = newTodo.value.trim()
  if (title) {
    store.addTodo(title)
    newTodo.value = ''
  }
}
</script>

<style scoped>
/* 布局样式 */
.todo-list {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: var(--color-card-bg);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.theme-switch {
  text-align: right;
  margin-bottom: 20px;
}

.todo-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid var(--color-input-border);
  border-radius: 4px;
  background: var(--color-card-bg);
  color: var(--color-text);
}

.todo-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-filters button {
  padding: 5px 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-card-bg);
  color: var(--color-text);
  cursor: pointer;
}

.todo-filters button.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.todo-items {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.2s;
}

.todo-item:hover {
  background-color: var(--color-hover-bg);
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.todo-title {
  font-size: 1.1em;
  color: var(--color-text);
}

.todo-details {
  display: flex;
  align-items: center;
  gap: 15px;
}

.todo-date {
  color: var(--color-completed);
  font-size: 0.9em;
}

.todo-status {
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.9em;
  background-color: var(--color-status-active);
  color: var(--color-status-active-text);
}

.status-completed {
  background-color: var(--color-status-completed);
  color: var(--color-status-completed-text);
}

.completed {
  text-decoration: line-through;
  color: var(--color-completed);
}

.delete-btn {
  padding: 5px 10px;
  border: none;
  background: var(--color-danger);
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button {
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

button:hover {
  opacity: 0.9;
}
</style>

<style>
:root {
  --color-card-bg: #fff;
  --color-input-border: #ddd;
  --color-border: #ddd;
  --color-text: #333;
  --color-primary: #4CAF50;
  --color-hover-bg: #f9f9f9;
  --color-completed: #999;
  --color-status-active: #e8f5e9;
  --color-status-active-text: #2e7d32;
  --color-status-completed: #eeeeee;
  --color-status-completed-text: #757575;
  --color-danger: #ff4444;
}

[data-theme="dark"] {
  --color-card-bg: #333;
  --color-input-border: #555;
  --color-border: #555;
  --color-text: #fff;
  --color-primary: #4CAF50;
  --color-hover-bg: #444;
  --color-completed: #666;
  --color-status-active: #2e7d32;
  --color-status-active-text: #fff;
  --color-status-completed: #757575;
  --color-status-completed-text: #fff;
  --color-danger: #ff4444;
}
</style>
