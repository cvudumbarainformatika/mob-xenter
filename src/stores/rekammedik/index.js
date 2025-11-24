import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { date } from 'quasar'

export const useRekammedikStore = defineStore('rekammedik', {
  state: () => ({
    items: [],
    data: [],

    loading: false,
    params: {
      d: date.formatDate(new Date(), 'DD'),
      month: null,
      year: null,
      tgl: null
    },

    topProductsData: {
      products: [],
      series: [
        {
          name: 'Jumlah Terjual',
          type: 'bar',
          data: []
        }
      ]
    },

    topIcd10Datarajal: {
      icd10rajal: [],
      series: [
        {
          name: 'Jumlah Terjual',
          type: 'bar',
          data: []
        }
      ]
    },

    topIcd10Dataigd: {
      icd10igd: [],
      series: [
        {
          name: 'Jumlah Terjual',
          type: 'bar',
          data: []
        }
      ]
    },

    borlostoi: {
      isiborlostoi: [],
      series: [
        {
          name: 'Jumlah Terjual',
          type: 'bar',
          data: []
        }
      ]
    },

    pieSeries:
  {
    name: '',
    type: 'pie',
    radius: ['40%', '70%'],
    data: [
      // { value: 1048, name: 'BOR' },
      // { value: 735, name: 'LOS' },
      // { value: 580, name: 'TOI' },
      // { value: 484, name: 'Keramik' },
      // { value: 300, name: 'Lainnya' }
    ]
  },

    salesTrendData: {
      trendMonths: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Mei',
        'Jun',
        'Jul',
        'Agu',
        'Sep',
        'Okt',
        'Nov',
        'Des'
      ],
      trendSeries: []
    }
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    async getData (payload) {
      this.loading = true
      this.setParams(payload)
      const params = { params: this.params }
      console.log(params)
      await api
        .get('v1/dashboardexecutive/rekammedik', params)
        .then((resp) => {
          if (resp.status === 200) {
            // const dataTopIcd10ranap = resp.data.topicd10ranap
            const datax = resp.data
            console.log('datax', datax.topicd10ranap)

            if (datax && datax.topicd10ranap && Array.isArray(datax.topicd10ranap)) {
              // Untuk chart horizontal, kita perlu membalik urutan agar yang terbesar muncul di atas
              const reversedData = [...datax.topicd10ranap].reverse()

              // Pastikan products adalah array
              this.topProductsData.products = reversedData.map((item) => item.keterangan)

              // Warna-warna untuk batang chart
              const colors = [
                '#5470c6',
                '#91cc75',
                '#fac858',
                '#ee6666',
                '#73c0de',
                '#3ba272',
                '#fc8452',
                '#9a60b4',
                '#ea7ccc',
                '#8dc1a9'
              ]

              // Buat data dengan warna berbeda untuk setiap item
              const itemsWithColors = reversedData.map((item, index) => ({
                value: item.jumlah,
                itemStyle: {
                  color: colors[index % colors.length]
                }
              }))

              // Pastikan series adalah array yang berisi objek
              this.topProductsData.series = [
                {
                  name: 'ICD 10 Ranap',
                  type: 'bar',
                  data: itemsWithColors,
                  label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}'
                  }
                }
              ]
            }

            const datarajal = resp.data
            if (datarajal && datarajal.topicd10rajal && Array.isArray(datarajal.topicd10rajal)) {
              // Untuk chart horizontal, kita perlu membalik urutan agar yang terbesar muncul di atas
              const reversedData = [...datarajal.topicd10rajal].reverse()

              // Pastikan products adalah array
              this.topIcd10Datarajal.icd10rajal = reversedData.map((item) => item.keterangan)

              // Warna-warna untuk batang chart
              const colors = [
                '#5470c6',
                '#91cc75',
                '#fac858',
                '#ee6666',
                '#73c0de',
                '#3ba272',
                '#fc8452',
                '#9a60b4',
                '#ea7ccc',
                '#8dc1a9'
              ]

              // Buat data dengan warna berbeda untuk setiap item
              const itemsWithColors = reversedData.map((item, index) => ({
                value: item.jumlah,
                itemStyle: {
                  color: colors[index % colors.length]
                }
              }))

              // Pastikan series adalah array yang berisi objek

              this.topIcd10Datarajal.series = [
                {
                  name: 'Top 10 ICD 10 Rawat Jalan',
                  type: 'bar',
                  data: itemsWithColors,
                  label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}'
                  }
                }
              ]
            }

            const dataigd = resp.data
            if (datarajal && dataigd.topicd10igd && Array.isArray(dataigd.topicd10igd)) {
              // Untuk chart horizontal, kita perlu membalik urutan agar yang terbesar muncul di atas
              const reversedData = [...dataigd.topicd10igd].reverse()

              // Pastikan products adalah array
              this.topIcd10Dataigd.icd10igd = reversedData.map((item) => item.keterangan)

              // Warna-warna untuk batang chart
              const colors = [
                '#5470c6',
                '#91cc75',
                '#fac858',
                '#ee6666',
                '#73c0de',
                '#3ba272',
                '#fc8452',
                '#9a60b4',
                '#ea7ccc',
                '#8dc1a9'
              ]

              // Buat data dengan warna berbeda untuk setiap item
              const itemsWithColors = reversedData.map((item, index) => ({
                value: item.jumlah,
                itemStyle: {
                  color: colors[index % colors.length]
                }
              }))

              // Pastikan series adalah array yang berisi objek

              this.topIcd10Dataigd.series = [
                {
                  name: 'Top 10 ICD 10 IGD',
                  type: 'bar',
                  data: itemsWithColors,
                  label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}'
                  }
                }
              ]
            }
            const borloi = resp.data

            if (borloi && borloi.borlostoy && Array.isArray(borloi.borlostoy)) {
              // Untuk chart horizontal, kita perlu membalik ur
              const data = {
                series: [
                  { name: 'BOR', data: borloi.borlostoy.map((item) => item.bor) },
                  { name: 'LOS', data: borloi.borlostoy.map((item) => item.los) },
                  { name: 'TOI', data: borloi.borlostoy.map((item) => item.toi) },
                  { name: 'BTO', data: borloi.borlostoy.map((item) => item.bto) }
                ]
              }

              this.borlostoi = data

              this.loading = false
            }
          }

          this.loading = false
        })
        .catch((e) => {
          this.loading = false
        })
    },

    setParams (payload) {
      if (payload) {
        const myArray = payload.split('-')

        this.params.tgl = myArray[1] + '-' + myArray[0] + '-' + myArray[2]
        this.params.month = myArray[0]
        this.params.year = myArray[1]
        this.d = myArray[2]
      }
    }
  }

})
