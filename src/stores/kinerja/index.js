import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useKinerjaStore = defineStore('kinerja', {
  state: () => ({
    items: [],
    data: {
      series: [
        {
          name: 'Jumlah Terjual',
          type: 'bar',
          data: []
        }
      ]
    },
    loading: false
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    async getData () {
      this.loading = true
      try {
        const resp = await api.get('v1/dashboardexecutive/ikm')
        console.log('kinerja :', resp)

        if (resp.status === 200) {
          const data = resp.data
          this.items = data.length > 0 ? data : []

          // ambil label tahun
          const tahun = data.map(item => item.tahun)
          // ambil jumlah (pastikan angka)
          const jumlah = data.map(item => parseFloat(item.jumlah))

          // simpan ke state
          this.data = {
            xAxis: {
              type: 'category',
              data: tahun
            },
            series: [
              {
                name: 'Indeks Kepuasan Masyarakat',
                type: 'bar',
                label: {
                  show: false,
                  position: 'right',
                  formatter: '{c}'
                },
                data: jumlah
              }
            ]
          }
        }
      } finally {
        this.loading = false
      }
    }
  } // const params = { params: this.params }
})
