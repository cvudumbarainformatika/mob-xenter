import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useXenterAppStore } from '..'

export const useScanXenterStore = defineStore('scan-xenter', {
  state: () => ({
    code: null
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    setCode (val) {
      this.code = val
    },

    kirimQr (form) {
      const app = useXenterAppStore()
      app.setLoading(true)
      return new Promise((resolve, reject) => {
        api.post('/v2/user/send-qr', form).then(resp => {
          app.setLoading(false)
          app.setStatus('info')
          app.setError('Anda Berhasil Login')
          resolve(resp)
        }).catch(error => {
          app.setLoading(false)
          app.setStatus('error')
          app.setError('Maaf Harap ulangi, Ada kesalahan')
          reject(error)
        })
      })
    }
  }
})
