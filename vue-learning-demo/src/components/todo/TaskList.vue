<!--
  TaskList.vue
  功能：任务列表组件
  职责：
  1. 显示任务列表
  2. 处理任务状态切换
  3. 处理任务删除
-->

<template>
  <ul class="todo-items">
    <li v-for="task in tasks" :key="task.id" class="todo-item">
      <div class="todo-content">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="$emit('toggle-task', task.id)"
        />
        <span :class="{ completed: task.completed }" class="todo-title">
          {{ task.title }}
        </span>
      </div>
      <div class="todo-details">
        <span class="todo-date">{{ formatDate(task.createdAt) }}</span>
        <span class="todo-status" :class="{ 'status-completed': task.completed }">
          {{ task.completed ? '已完成' : '进行中' }}
        </span>
        <button @click="$emit('remove-task', task.id)" class="delete-btn">
          删除
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Todo } from '@/types/todo'

defineProps<{
  tasks: Todo[]
}>()

defineEmits<{
  'toggle-task': [id: number]
  'remove-task': [id: number]
}>()

// 格式化日期的方法
const formatDate = (date: Date) => {
  return new Date(date).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
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

.delete-btn:hover {
  opacity: 0.9;
}
</style>
