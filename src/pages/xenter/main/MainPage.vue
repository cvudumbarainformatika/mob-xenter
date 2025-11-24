<template>
  <app-page>
    <template #header>
      <header-main :user="user?.pegawai" />
    </template>
    <template #content>
      <div class="grad column flex-center">
        <div class="text-h4 text-weight-bold text-white">{{ tgl?.pukuls }}</div>
        <div class="f-14 text-dark">{{ tgl?.hari }} {{ tgl?.tanggal }} {{ tgl?.bulan }} {{ tgl?.currentYear }}</div>
      </div>
      <ContentOne />
      <JadwalHarian :key="currentJadwal" :current-jadwal="currentJadwal" />
      <HistoryAbsensi />
      <CalendarSection />
      <div style="margin-bottom: 100px;"></div>
    </template>
  </app-page>
</template>

<script setup>
import { useLoginXenterStore } from 'src/stores/xenter/auth/login'
import { useJadwal } from 'src/stores/xenter/absensi/jadwal'
import { useRekapAbsen } from 'src/stores/xenter/absensi/rekap'
import HeaderMain from './HeaderMain.vue'
import ContentOne from './contents/ContentOne.vue'
import JadwalHarian from './contents/JadwalHarian.vue'
import HistoryAbsensi from './contents/HistoryAbsensi.vue'
import CalendarSection from './contents/CalendarSection.vue'

import { useDater } from 'src/composable/dater'
import { computed, onMounted } from 'vue'
// import { useRouter } from 'vue-router'

const auth = useLoginXenterStore()
const user = computed(() => {
  return auth?.user
})

const { tgl, dayjs } = useDater()
// const router = useRouter()
const store = useJadwal()
const rekap = useRekapAbsen()

const currentJadwal = computed(() => store.getCurrentJadwal(tgl?.value?.hari))

onMounted(() => {
  console.log('main', tgl)
  callFirst('loading')
})

function callFirst (val) {
  store.getJadwals(val)
  rekap.getRekap(dayjs().locale('id').format('MM'), val)
}
</script>

<style lang="scss" scoped>
.grad{
  border: none;
  width: 100%;
  height: 100px;
  background: $primary;
  background: linear-gradient(180deg, $primary 0%, rgba(6,195,233,1) 52%, rgba(255,255,255,1) 86%);
}
</style>
