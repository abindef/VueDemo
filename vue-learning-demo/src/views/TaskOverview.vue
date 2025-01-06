<template>
  <div class="task-overview">
    <h1>任务概览</h1>
    
    <div class="overview-grid">
      <!-- 个人任务概览 -->
      <div class="overview-section">
        <h2>个人任务</h2>
        <div class="stats-cards">
          <div class="stat-card">
            <span class="stat-title">总任务</span>
            <span class="stat-value">{{ personalStore.todos.length }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-title">已完成</span>
            <span class="stat-value">{{ personalCompletedCount }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-title">进行中</span>
            <span class="stat-value">{{ personalActiveCount }}</span>
          </div>
        </div>
        
        <div class="recent-tasks">
          <h3>最近的任务</h3>
          <ul class="task-list">
            <li v-for="task in recentPersonalTasks" :key="task.id" class="task-item">
              <div class="task-status" :class="{ completed: task.completed }">
                {{ task.completed ? '✓' : '○' }}
              </div>
              <div class="task-details">
                <span class="task-title" :class="{ completed: task.completed }">{{ task.title }}</span>
                <span class="task-date">{{ formatDate(task.createdAt) }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 团队任务概览 -->
      <div class="overview-section">
        <h2>团队任务</h2>
        <div class="stats-cards">
          <div class="stat-card">
            <span class="stat-title">总任务</span>
            <span class="stat-value">{{ teamStore.todos.length }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-title">已完成</span>
            <span class="stat-value">{{ teamCompletedCount }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-title">进行中</span>
            <span class="stat-value">{{ teamActiveCount }}</span>
          </div>
        </div>

        <div class="recent-tasks">
          <h3>最近的任务</h3>
          <ul class="task-list">
            <li v-for="task in recentTeamTasks" :key="task.id" class="task-item">
              <div class="task-status" :class="{ completed: task.completed }">
                {{ task.completed ? '✓' : '○' }}
              </div>
              <div class="task-details">
                <span class="task-title" :class="{ completed: task.completed }">{{ task.title }}</span>
                <span class="task-date">{{ formatDate(task.createdAt) }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '@/stores/todo'

const personalStore = useTodoStore('personal')
const teamStore = useTodoStore('team')

// 个人任务统计
const personalCompletedCount = computed(() => 
  personalStore.todos.filter(todo => todo.completed).length
)
const personalActiveCount = computed(() => 
  personalStore.todos.filter(todo => !todo.completed).length
)

// 团队任务统计
const teamCompletedCount = computed(() => 
  teamStore.todos.filter(todo => todo.completed).length
)
const teamActiveCount = computed(() => 
  teamStore.todos.filter(todo => !todo.completed).length
)

// 最近的任务（最新的5个）
const recentPersonalTasks = computed(() => 
  [...personalStore.todos]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5)
)

const recentTeamTasks = computed(() => 
  [...teamStore.todos]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5)
)

// 格式化日期
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
.task-overview {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: var(--color-primary);
  margin-bottom: 2rem;
  text-align: center;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
}

.overview-section {
  background: var(--color-card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--color-hover-bg);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.stat-title {
  display: block;
  color: var(--color-text);
  opacity: 0.8;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-primary);
}

.recent-tasks {
  margin-top: 2rem;
}

h3 {
  color: var(--color-text);
  margin-bottom: 1rem;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid var(--color-border);
  gap: 1rem;
}

.task-status {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.task-status.completed {
  background-color: var(--color-primary);
  color: white;
}

.task-details {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-title {
  color: var(--color-text);
}

.task-title.completed {
  text-decoration: line-through;
  color: var(--color-completed);
}

.task-date {
  font-size: 0.9rem;
  color: var(--color-completed);
}

@media (max-width: 768px) {
  .overview-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>
