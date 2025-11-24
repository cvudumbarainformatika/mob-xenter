import { defineStore } from 'pinia'

export const useXenterAppStore = defineStore('xenter-app', {
  state: () => ({
    loading: false,
    error: null,
    status: 'error'
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    setLoading (val) {
      this.loading = val
    },

    setError (msg) {
      this.error = msg
    },
    setStatus (info) {
      this.status = info ?? 'error'
    }
  }
})
