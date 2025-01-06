<template>
  <nav class="nav-bar">
    <RouterLink to="/" class="nav-brand">Todo App</RouterLink>
    <div class="nav-stats">
      <div class="stat-item">
        <span class="stat-label">个人任务:</span>
        <span class="stat-value">{{ personalStats }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">团队任务:</span>
        <span class="stat-value">{{ teamStats }}</span>
      </div>
    </div>
    <div class="nav-links">
      <RouterLink to="/" class="nav-link">首页</RouterLink>
      <RouterLink to="/overview" class="nav-link">任务概览</RouterLink>
      <RouterLink to="/personal" class="nav-link">个人任务</RouterLink>
      <RouterLink to="/team" class="nav-link">团队任务</RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '@/stores/todo'

const personalStore = useTodoStore('personal')
const teamStore = useTodoStore('team')

const personalStats = computed(() => {
  const total = personalStore.todos.length
  const completed = personalStore.todos.filter(todo => todo.completed).length
  return `${completed}/${total}`
})

const teamStats = computed(() => {
  const total = teamStore.todos.length
  const completed = teamStore.todos.filter(todo => todo.completed).length
  return `${completed}/${total}`
})
</script>

<style scoped>
.nav-bar {
  background: var(--color-card-bg);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-primary);
  text-decoration: none;
}

.nav-stats {
  display: flex;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-label {
  color: var(--color-text);
  opacity: 0.8;
}

.stat-value {
  background: var(--color-status-active);
  color: var(--color-status-active-text);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background: var(--color-hover-bg);
}

.nav-link.router-link-active {
  color: var(--color-primary);
  font-weight: bold;
}

@media (max-width: 768px) {
  .nav-bar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .nav-stats {
    order: 3;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
