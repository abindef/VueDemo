<template>
  <div class="todo-list">
    <!-- 输入框部分 -->
    <div class="todo-input">
      <input
        v-model="newTodo"
        @keyup.enter="handleAddTodo"
        placeholder="添加新任务"
        type="text"
      />
      <button @click="handleAddTodo">添加</button>
    </div>

    <!-- 过滤器部分 -->
    <div class="todo-filters">
      <button
        v-for="filterType in filters"
        :key="filterType"
        :class="{ active: store.filter === filterType }"
        @click="store.setFilter(filterType)"
      >
        {{ filterType }}
      </button>
    </div>

    <!-- 列表部分 -->
    <ul class="todo-items">
      <li v-for="todo in store.filteredTodos" :key="todo.id" class="todo-item">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="store.toggleTodo(todo.id)"
        />
        <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        <button @click="store.removeTodo(todo.id)" class="delete-btn">删除</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todo'
import { TodoFilter } from '@/types/todo'

// 获取store实例（类似于C#中的依赖注入）
const store = useTodoStore()

// 本地状态（类似于C#中的私有字段）
const newTodo = ref('')
const filters = [TodoFilter.All, TodoFilter.Active, TodoFilter.Completed]

// 方法（类似于C#中的事件处理器）
const handleAddTodo = () => {
  if (newTodo.value.trim()) {
    store.addTodo(newTodo.value.trim())
    newTodo.value = ''
  }
}
</script>

<style scoped>
.todo-list {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.todo-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.todo-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-filters button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}

.todo-filters button.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.todo-items {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-item .completed {
  text-decoration: line-through;
  color: #999;
}

.delete-btn {
  margin-left: auto;
  padding: 5px 10px;
  border: none;
  background: #ff4444;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}
</style>
