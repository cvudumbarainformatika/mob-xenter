import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { date } from 'quasar'

export const usePelayananStore = defineStore('pelayanan', {
  state: () => ({
    items: [],
    data: [],
    tempatTidur: 0,
    tempatTidurTersedia: 0,
    tempatTidurTerisi: 0,
    dialogtt: false,
    dialogrincianpoli: false,

    poli: 0,
    poliHrIniBlm: 0,
    poliHrIniSdh: 0,
    igdHrIniBlm: 0,
    igdHrIniSdh: 0,
    dataPoliHrIniSdh: [],
    dataPoliHrIniBlm: [],
    masterPoli: [],

    poliTahun: [],
    ranapTahun: [],
    igdTahun: [],
    igd: 0,

    loading: false,
    params: {
      d: date.formatDate(new Date(), 'DD'),
      month: null,
      year: null,
      tgl: null
    },
    penunjang: {
      laborat: 0,
      radiologi: 0,
      hemodialisa: 0
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
        .get('v1/dashboardexecutive/pelayanan', params)
        .then((resp) => {
          console.log('pelayanan :', resp)
          if (resp.status === 200) {
            // ...
            const data = resp.data.tempat_tidur
            this.items = data.length > 0 ? data : []
            this.data = data
            this.tempatTidur =
              data.length > 0
                ? data.map((x) => x.total).reduce((x, y) => x + y, 0)
                : 0
            this.tempatTidurTersedia =
              data.length > 0
                ? data.map((x) => parseInt(x.sisa)).reduce((x, y) => x + y, 0)
                : 0
            this.tempatTidurTerisi =
              data.length > 0
                ? data.map((x) => parseInt(x.terisi)).reduce((x, y) => x + y, 0)
                : 0

            // const poliHrIniBlm = resp.data.poli_harinibelum
            this.poliHrIniBlm = resp.data.poli_hariinibelum
              ? resp.data.poli_hariinibelum.length
              : 0
            this.poliHrIniSdh = resp.data.poli_hariinisudah
              ? resp.data.poli_hariinisudah.length
              : 0
            this.dataPoliHrIniSdh = resp.data.poli_hariinisudah
              ? resp.data.poli_hariinisudah
              : []
            this.dataPoliHrIniBlm = resp.data.poli_hariinibelum
              ? resp.data.poli_hariinibelum
              : []
            this.poli =
              parseInt(this.poliHrIniBlm) + parseInt(this.poliHrIniSdh)
            this.igdHrIniBlm = resp.data.igd_hariinibelum
              ? resp.data.igd_hariinibelum.length
              : 0
            this.igdHrIniSdh = resp.data.igd_hariinisudah
              ? resp.data.igd_hariinisudah.length
              : 0
            this.igd = parseInt(this.igdHrIniBlm) + parseInt(this.igdHrIniSdh)

            this.poliTahun = resp.data.poli_tahun
            this.ranapTahun = resp.data.ranap_tahun
            this.igdTahun = resp.data.igd_tahun

            this.masterPoli = resp.data.poli
            this.penunjang.laborat = resp.data.penunjang_laborat?.total_pasien
            this.penunjang.radiologi = resp.data.penunjang_radiologi?.total_pasien
            this.penunjang.hemodialisa = resp.data.penunjang_hd?.total_pasien

            this.loading = false
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
    },

    countData (data, jns) {
      if (jns === 'total') {
        return data.map((x) => x.total).reduce((x, y) => x + y, 0)
      } else if (jns === 'terisi') {
        return data.map((x) => x.terisi).reduce((x, y) => x + y, 0)
      } else {
        return data.map((x) => x.sisa).reduce((x, y) => x + y, 0)
      }
    }
  }

})
