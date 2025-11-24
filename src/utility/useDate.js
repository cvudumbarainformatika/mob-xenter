// import { reactive } from 'vue'
import { date } from 'quasar'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

export default function useDate () {
  // const state = reactive({
  //   date: new Date(),
  //   years: null
  // })

  const currentYear = () => {
    return new Date().getFullYear().toString()
  }
  const currentMonth = (val) => {
    const m = new Date().getMonth() + 1
    // let month = null
    if (val === null || val === undefined || val === 'undefined') {
      // month = m <= 9 ? '0' + m : m
      return m <= 9 ? '0' + m : m.toString()
    }

    return val <= 9 ? '0' + (val + 1) : (val + 1).toString()
  }
  const yearIntervals = () => {
    const years = []
    for (let i = 0; i < 5; i++) {
      years.push(subtractYears(i))
    }
    return years
  }

  function subtractYears (num) {
    const date = new Date()
    date.setFullYear(date.getFullYear() - num)
    return date.getFullYear().toString()
  }

  const dateDbFormat = (val) => {
    return date.formatDate(val, 'YYYY-MM-DD')
  }
  const arrBulan = (val) => {
    return ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  }

  const tgl = {
    fromJs: dayjs().locale('id'),
    formatDb: dayjs().locale('id').format('YYYY-MM-DD'),
    pukul: dayjs().locale('id').format('HH:mm'),
    hari: dayjs().locale('id').format('dddd'),
    bulan: dayjs().locale('id').format('MMMM'),
    blnnNstring: dayjs().locale('id').format('MM'),
    currentmonth: dayjs().locale('id').month(),
    currentYear: dayjs().locale('id').year()
  }

  return { currentYear, yearIntervals, dateDbFormat, arrBulan, currentMonth, tgl }
}
