import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  
  getters: {
    isLoggedIn: (state) => state.user !== null,
    
    userName: (state) => state.user?.name || '游客'
  },
  
  actions: {
    login(userData) {
      this.user = userData
      console.log('User logged in:', userData)
    },
    
    logout() {
      this.user = null
      console.log('User logged out')
    },
    
    updateUser(userData) {
      if (this.user) {
        this.user = { ...this.user, ...userData }
        console.log('User updated:', this.user)
      }
    }
  }
})
