<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
</script>

<template>
  <main>
    <h1>Vue Todo 应用</h1>
    <p class="intro">这是一个用Vue 3和TypeScript构建的Todo应用</p>
    <TodoList />
  </main>
</template>

<style scoped>
main {
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 10px;
}

.intro {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}
</style>
