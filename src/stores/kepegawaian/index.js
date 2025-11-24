import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useKepegawaianStore = defineStore('kepegawaian', {
  state: () => ({
    kategoriPegawai: [],
    statusPegawai: [],
    golonganPegawai: [],
    dialogkebutuhanpegawai: false,
    kebutuhanPegawai: [],
    ygMasuk: 0,
    ygIjin: [],
    colorize: [
      { id: 'PNS', color: 'info', txtColor: 'dark', icon: 'diversity_3' },
      { id: 'PTT', color: 'accent', txtColor: 'white', icon: 'groups_2' },
      { id: 'PT', color: 'blue-4', txtColor: 'dark', icon: 'people' },
      { id: 'HonDa', color: 'light-green-10', txtColor: 'white', icon: 'diversity_2' },
      { id: 'CPNS', color: 'lime-10', txtColor: 'white', icon: 'diversity_3' },
      { id: 'MoU', color: 'primary', txtColor: 'white', icon: 'transfer_within_a_station' },
      { id: 'PPPK', color: 'blue-grey', txtColor: 'white', icon: 'diversity_3' },
      { id: 'ALL', color: 'dark', txtColor: 'white', icon: 'people' }
    ],

    icons: [
      { icon: 'medical_services', color: 'negative' },
      { icon: 'local_pharmacy', color: 'negative' },
      { icon: 'support_agent', color: 'indigo' },
      { icon: 'medical_information', color: 'teal' }
    ],

    flag: [
      { id: 'CUTI', color: 'negative', icon: 'person_3' },
      { id: 'IJIN', color: 'negative', icon: 'person_add_disabled' },
      { id: 'SAKIT', color: 'negative', icon: 'personal_injury' },
      { id: 'DL', color: 'primary', icon: 'accessible' }
    ],

    loading: false,
    params: {
      month: null,
      year: null
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
      await api.get('v1/dashboardexecutive/kepegawaian', params)
        .then(resp => {
          console.log('kepegawaian :', resp)
          if (resp.status === 200) {
            const data = resp.data
            this.kategoriPegawai = data.kategori_pegawai.length ? data.kategori_pegawai : []
            this.statusPegawai = data.status_pegawai.length ? data.status_pegawai : []
            this.golonganPegawai = data.golongan.length ? data.golongan : []
            this.ygMasuk = data.yg_absen.length
            this.ygIjin = data.yg_libur.length ? data.yg_libur : []
            this.kebutuhanPegawai = data.kebutuhanpegawai.length ? data.kebutuhanpegawai : []

            this.loading = false
          }
          this.loading = false
        })
    },

    setParams (payload) {
      if (payload) {
        const myArray = payload.split('-')
        this.params.month = myArray[0]
        this.params.year = myArray[1]
      }
    }

  }

})
