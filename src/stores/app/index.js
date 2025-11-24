import { defineStore } from 'pinia'
import { date } from 'quasar'

export const useAppStore = defineStore('app', {
  state: () => ({
    height: window.innerHeight,
    width: window.innerWidth,
    monts: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    mm: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    currentDay: date.formatDate(new Date(), 'DD'),
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear()
  }),
  getters: {
    txt140: (state) => state.width * 0.072916, // 140px
    txt100: (state) => state.width * 0.052083, // 100px
    txt80: (state) => state.width * 0.04166, // 80px
    txt70: (state) => state.width * 0.0364583, // 70px
    txt50: (state) => state.width * 0.0260416, // 50px
    txt48: (state) => state.width * 0.025, // 48px
    txt32: (state) => state.width * 0.016666, // 32px
    txt28: (state) => state.width * 0.014583, // 28px
    txtH5: (state) => state.width * 0.0125, // text-h5 || 1.5rem || 24 px
    txtXl: (state) => state.width * 0.02083, // 40px
    txtLg: (state) => state.width * 0.009375, // 18px
    txtMd: (state) => state.width * 0.0072916, // 14px
    txtSm: (state) => state.width * 0.00625, // 12px
    txtXs: (state) => state.width * 0.0052083 // 10px
  },
  actions: {
    setCurrentMonth (val) {
      this.currentMonth = val
    },
    setCurrentYear (val) {
      this.currentYear = val
    }
  }
})
