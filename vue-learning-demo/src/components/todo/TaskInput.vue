<!--
  TaskInput.vue
  功能：任务输入组件
  职责：
  1. 提供任务输入界面
  2. 处理任务添加事件
-->

<template>
  <div class="todo-input">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @keyup.enter="$emit('add-task')"
      placeholder="添加新任务"
      type="text"
    />
    <button @click="$emit('add-task')">添加</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
  'add-task': []
}>()
</script>

<style scoped>
.todo-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid var(--color-input-border);
  border-radius: 4px;
  background: var(--color-card-bg);
  color: var(--color-text);
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
