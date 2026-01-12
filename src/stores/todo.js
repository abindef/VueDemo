import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [
      { id: 1, text: '学习 Vue3 基础', completed: true },
      { id: 2, text: '掌握 Composition API', completed: false },
      { id: 3, text: '学习 Pinia 状态管理', completed: false }
    ],
    nextId: 4
  }),
  
  getters: {
    completedCount: (state) => {
      return state.todos.filter(todo => todo.completed).length
    },
    
    uncompletedCount: (state) => {
      return state.todos.filter(todo => !todo.completed).length
    },
    
    completedTodos: (state) => {
      return state.todos.filter(todo => todo.completed)
    },
    
    uncompletedTodos: (state) => {
      return state.todos.filter(todo => !todo.completed)
    }
  },
  
  actions: {
    addTodo(text) {
      this.todos.push({
        id: this.nextId++,
        text,
        completed: false
      })
      console.log('Todo added:', text)
    },
    
    removeTodo(id) {
      const index = this.todos.findIndex(todo => todo.id === id)
      if (index > -1) {
        this.todos.splice(index, 1)
        console.log('Todo removed:', id)
      }
    },
    
    toggleTodo(id) {
      const todo = this.todos.find(todo => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
        console.log('Todo toggled:', id, todo.completed)
      }
    },
    
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
      console.log('Completed todos cleared')
    }
  }
})
