<template>
  <q-page class="column">
    <app-loadingxenter v-if="app.loading" />
    <AppErrorXenter v-if="!app.loading && app.error !== null"
      :msg="app.error"
      :status="app.status"
      @ok="app.setError(null)"
    />
    <!-- head -->
    <div class="col-auto">
      <header-main :user="user?.pegawai" />
    </div>
    <!-- content -->
    <div class="col full-height relative-position">
      <div class="absolute full-height full-width scroll">
        <ContentOne />
        <JadwalHarian />
        <HistoryAbsensi />
        <CalendarSection />
        <div style="padding-bottom: 100px;"></div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useLoginXenterStore } from 'src/stores/xenter/auth/login'
import HeaderMain from './HeaderMain.vue'
import ContentOne from './contents/ContentOne.vue'
import JadwalHarian from './contents/JadwalHarian.vue'
import HistoryAbsensi from './contents/HistoryAbsensi.vue'
import CalendarSection from './contents/CalendarSection.vue'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useXenterAppStore } from 'src/stores/xenter'
import { useQuasar } from 'quasar'

const app = useXenterAppStore()
// eslint-disable-next-line no-unused-vars
const $q = useQuasar()
const auth = useLoginXenterStore()
const user = computed(() => {
  return auth?.user
})
const router = useRouter()
onMounted(() => {
  // console.log('q', $q)
})

// eslint-disable-next-line no-unused-vars
function toScan () {
  router.push({ path: '/scan-barcode' })
}

// eslint-disable-next-line no-unused-vars
function logout () {
  console.log('logout')
  auth.logout().then(() => {
    router.replace({ path: '/auth' })
  })
}
</script>
