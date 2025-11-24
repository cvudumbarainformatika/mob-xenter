import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useXenterAppStore } from '..'

export const useRegisterXenter = defineStore('register-xenter', {
  state: () => ({
    search: '',
    result: null,
    error: null,
    status: 'error',
    password: '123456789'
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    async cariData () {
      const app = useXenterAppStore()
      app.setLoading(true)
      const payload = new FormData()
      payload.append('nik', this.search)
      payload.append('tgllahir', this.search)
      try {
        const resp = await api.post('/v2/data/cari-pegawai', payload)
        // console.log('caripegawai', resp)
        if (resp?.status === 200) {
          if (resp?.data?.message) {
            this.error = resp?.data?.message
            this.status = 'error'
            app.setLoading(false)
          } else {
            this.result = resp?.data
            app.setLoading(false)
          }
        } else {
          this.error = 'Maaf, Ada kesalahan, harap Ulangi!'
          this.status = 'error'
          app.setLoading(false)
        }
      } catch (error) {
        this.error = 'Maaf, Ada kesalahan, harap Ulangi!'
        this.status = 'error'
      }
    },

    async registerUser () {
      const app = useXenterAppStore()
      app.setLoading(true)
      const form = {
        username: this.result?.nik,
        password: this.password,
        pegawai_id: this.result?.id,
        device: 'ios',
        nama: this.result?.nama
      }

      try {
        const resp = await api.post('/v2/register', form)
        console.log(resp)
        if (resp.status === 201) {
          this.error = 'Selamat, Anda berhasil Register'
          this.status = 'info'
          app.setLoading(false)
        } else {
          this.error = 'Maaf, Ada kesalahan, harap Ulangi!'
          this.status = 'error'
          app.setLoading(false)
        }
      } catch (error) {
        this.error = 'Maaf, Ada kesalahan, harap Ulangi!'
        this.status = 'error'
        app.setLoading(false)
      }
    },

    setErrorNull () {
      this.error = null
    },
    setResultNull () {
      this.result = null
    }
  }
})
