<template>
  <div class="personal-tasks">
    <div class="module-header">
      <h2>个人任务</h2>
      <p>管理你的个人待办事项</p>
    </div>
    <TodoList :storeKey="'personal'" />
  </div>
</template>

<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
</script>

<style scoped>
.personal-tasks {
  padding: 20px;
}

.module-header {
  text-align: center;
  margin-bottom: 30px;
}

.module-header h2 {
  color: var(--color-primary);
  margin-bottom: 10px;
}

.module-header p {
  color: var(--color-text);
  opacity: 0.8;
}
</style>
