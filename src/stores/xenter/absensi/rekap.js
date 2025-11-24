import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

import { api } from 'boot/axios'
import { useXenterAppStore } from '..'

export const useRekapAbsen = defineStore('rekap-absen', {
  state: () => ({
    rekaps: [],
    hadir: [],
    libur: [],
    alphas: [],

    details: [],

    // FLAG
    IJIN: 0,
    SAKIT: 0,
    CUTI: 0,
    DL: 0,
    EXTRA: 0,
    DISPEN: 0,
    A: 0,
    CB: 0,
    TERLAMBAT: '0',
    HADIR: 0,

    currentmonth: dayjs().locale('id').month(),
    currentYear: dayjs().locale('id').year(),
    date: dayjs().locale('id'),

    days: dayjs().daysInMonth(),

    tanggalSekarang: dayjs().locale('id').format('YYYY-MM-DD')
  }),
  // getters: {

  // },
  actions: {
    async getRekap (bulan, val) {
      const app = useXenterAppStore()
      app.error = null
      val === 'loading' ? app.loading = true : app.loading = false
      try {
        const resp = await api.get(`/v2/absensi/history/data?bulan=${bulan}`)
        // console.log('rekap absen bulan ini', resp)
        this.rekapReducer(resp?.data, app)
        // console.log('rekap absen bulan ini', this.details)
      } catch (error) {
        console.error(error)
        app.error = 'error response'
        app.loading = false
      }
    },
    rekapReducer (payload, app) {
      const rekaps = payload
      const hadirs = rekaps.masuk ? rekaps.masuk : []
      const ijins = rekaps.libur ? rekaps.libur : []
      const alphas = rekaps.alpha ? rekaps.alpha : []
      const protas = rekaps.prota ? rekaps.prota : []

      this.rekaps = rekaps
      this.hadir = hadirs
      this.libur = ijins
      this.alphas = alphas

      const bukanShift = hadirs.length ? hadirs[0].kategory_id < 3 : false // INI UNTUK KATEGORY BUKAN SHIft

      const details = []
      for (let i = 0; i < this.days; i++) {
        const urut = i + 1
        const tgl = urut > 9 ? urut.toString() : `0${urut}`
        const bln = dayjs(this.date).month() + 1 > 9 ? dayjs(this.date).month() + 1 : `0${dayjs(this.date).month() + 1}`
        const thn = dayjs(this.date).year()
        const tanggal = `${thn}-${bln}-${tgl}`

        const data = hadirs.filter(x => x.tanggal === tanggal)[0]
        const hari = dayjs(`${tanggal} 07:00:00`).locale('id').format('dddd')
        const msk = data ? data.masuk : false
        const masuk = msk ? dayjs(data.created_at).locale('id').format('HH:mm') : false
        const plg = data ? data.pulang : false
        const pulang = plg ? dayjs(data.updated_at).locale('id').format('HH:mm') : false
        const kategory = data ? data.kategory : null

        const dataijin = ijins.filter(x => x.tanggal === tanggal)[0]
        const dataalpha = alphas.filter(x => x.tanggal === tanggal)[0]

        let dataprota = false
        if (bukanShift) {
          dataprota = protas.filter(x => x.tgl_libur === tanggal)[0]
        }

        let status = false
        let terlambat = 0
        if (this.tanggalSekarang >= tanggal) {
          if (dataijin) {
            status = 'IJIN'
            terlambat = 0
          } else {
            if (msk) {
              status = 'MSK'
              terlambat = this.hitungTelat(data)
            } else {
              if (dataprota) {
                status = 'CB'
                terlambat = 0
              } else {
                status = dataalpha ? 'A'
                  : this.tanggalSekarang === tanggal ? 'WAIT' : 'LIBUR'
                terlambat = 0
              }
            }
          }
        }

        const obj = {
          tgl,
          tanggal,
          tanggalMasuk: masuk ? data.tanggal : false,
          masuk,
          pulang,
          hari,
          ijin: dataijin ? dataijin.flag : false,
          alpha: dataalpha || false,
          prota: !!dataprota,
          kategory,
          not_shift: bukanShift,
          status,
          terlambat

        }
        details.push(obj)
      }

      this.details = details.length > 0
        ? details.sort((a, b) => a.tanggal > b.tanggal ? -1 : 1) : []
      // FLAG
      this.CUTI = details.filter(x => x.ijin === 'CUTI').length
      this.IJIN = details.filter(x => x.ijin === 'IJIN').length
      this.SAKIT = details.filter(x => x.ijin === 'SAKIT').length
      this.DL = details.filter(x => x.ijin === 'DL').length
      this.EXTRA = details.filter(x => x.ijin === 'EXTRA').length
      this.DISPEN = details.filter(x => x.ijin === 'DISPEN').length
      this.HADIR = details.filter(x => x.status === 'MSK').length
      this.A = details.filter(x => x.status === 'A').length

      // terlambat
      // eslint-disable-next-line no-return-assign
      this.TERLAMBAT = this.toHoursAndMinutes(details.reduce((a, v) => a = a + v.terlambat, 0))

      app.loading = false
    },

    hitungTelat (x) {
      const jamMasukKategory = x.kategory ? x.kategory?.masuk : '00:00:00'
      const jamMasukServer = dayjs(x.created_at).format('HH:mm:ss')

      const tglKategory = dayjs(x.tanggal).format('YYYY-MM-DD')
      const tglMasukServer = dayjs(x.created_at).format('YYYY-MM-DD')

      const date1 = dayjs(tglMasukServer + ' ' + jamMasukServer) // masuk
      const date2 = dayjs(tglKategory + ' ' + jamMasukKategory) // kategory

      const terlambat = date1 > date2
      let hitung = 0

      if (terlambat) {
        hitung = date1.diff(date2, 'minute')
      }
      return hitung
    },

    toHoursAndMinutes (totalMinutes) {
      const hours = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60

      return `${hours > 0 ? ` ${hours} jam` : ''}` +
        `${minutes > 0 ? ` ${minutes.toFixed(0)} mnt` : ''}`
    },

    setPrevMonth () {
      if (this.currentmonth > 0) {
        const month = this.currentmonth - 1
        this.currentmonth = month
        this.date = dayjs().month(month).locale('id')

        const bulan = dayjs().month(month).locale('id').format('MM')
        this.getRekap(bulan, 'loading')
      }
    },

    setNextMonth () {
      const m = dayjs().month()
      if (this.currentmonth !== m) {
        const month = this.currentmonth + 1
        this.currentmonth = month
        this.date = dayjs().month(month).locale('id')
        const bulan = dayjs().month(month).locale('id').format('MM')
        this.getRekap(bulan, 'loading')
      }
    }

  }

})
