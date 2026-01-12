import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  
  getters: {
    doubleCount: (state) => state.count * 2
  },
  
  actions: {
    increment() {
      this.count++
      console.log('Counter incremented:', this.count)
    },
    
    decrement() {
      this.count--
      console.log('Counter decremented:', this.count)
    },
    
    reset() {
      this.count = 0
      console.log('Counter reset')
    }
  }
})
