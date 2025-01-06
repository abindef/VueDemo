<!--
  TaskFilters.vue
  功能：任务过滤器组件
  职责：
  1. 显示所有过滤选项
  2. 处理过滤器切换事件
-->

<template>
  <div class="todo-filters">
    <button
      v-for="filter in filters"
      :key="filter"
      :class="{ active: currentFilter === filter }"
      @click="$emit('filter-change', filter)"
    >
      {{ filter }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { TodoFilter } from '@/types/todo'

defineProps<{
  currentFilter: TodoFilter
  filters: TodoFilter[]
}>()

defineEmits<{
  'filter-change': [filter: TodoFilter]
}>()
</script>

<style scoped>
.todo-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 5px 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-card-bg);
  color: var(--color-text);
  cursor: pointer;
}

button.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

button:hover {
  opacity: 0.9;
}
</style>
