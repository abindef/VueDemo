import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Todo } from '@/types/todo'
import { TodoFilter } from '@/types/todo'

// 类似于C#中的服务类
export const useTodoStore = defineStore('todo', () => {
    // 私有字段，类似于C#中的私有成员
    const todos = ref<Todo[]>([])
    const filter = ref<TodoFilter>(TodoFilter.All)

    // 计算属性，类似于C#中的只读属性
    const filteredTodos = computed(() => {
        switch (filter.value) {
            case TodoFilter.Active:
                return todos.value.filter(todo => !todo.completed)
            case TodoFilter.Completed:
                return todos.value.filter(todo => todo.completed)
            default:
                return todos.value
        }
    })

    // 方法，类似于C#中的公共方法
    function addTodo(title: string) {
        const todo: Todo = {
            id: Date.now(),
            title,
            completed: false,
            createdAt: new Date()
        }
        todos.value.push(todo)
    }

    function removeTodo(id: number) {
        const index = todos.value.findIndex(todo => todo.id === id)
        if (index !== -1) {
            todos.value.splice(index, 1)
        }
    }

    function toggleTodo(id: number) {
        const todo = todos.value.find(todo => todo.id === id)
        if (todo) {
            todo.completed = !todo.completed
        }
    }

    function setFilter(newFilter: TodoFilter) {
        filter.value = newFilter
    }

    // 返回公共API，类似于C#中的公共接口
    return {
        todos,
        filter,
        filteredTodos,
        addTodo,
        removeTodo,
        toggleTodo,
        setFilter
    }
})
