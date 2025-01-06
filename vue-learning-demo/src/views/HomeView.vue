<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
</script>

<template>
  <main>
    <div class="home">
      <h1>Vue Todo 应用</h1>
      <p class="subtitle">选择要管理的任务类型</p>
      
      <div class="task-modules">
        <RouterLink to="/personal" class="module-card">
          <div class="card-content">
            <h2>个人任务</h2>
            <p>管理你的个人待办事项</p>
          </div>
        </RouterLink>

        <RouterLink to="/team" class="module-card">
          <div class="card-content">
            <h2>团队任务</h2>
            <p>管理团队共享的任务清单</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}

h1 {
  color: var(--color-primary);
  margin-bottom: 16px;
}

.subtitle {
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 40px;
}

.task-modules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.module-card {
  background: var(--color-card-bg);
  border-radius: 8px;
  padding: 30px;
  text-decoration: none;
  color: var(--color-text);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid var(--color-border);
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-content h2 {
  color: var(--color-primary);
  margin-bottom: 10px;
}

.card-content p {
  color: var(--color-text);
  opacity: 0.8;
}
</style>
