<template>
  <div class="team-tasks">
    <div class="module-header">
      <h2>团队任务</h2>
      <p>管理团队共享的任务清单</p>
    </div>
    <TodoList :storeKey="'team'" />
  </div>
</template>

<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
</script>

<style scoped>
.team-tasks {
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
