<template>
  <app-page>
    <template #header>
      <HeaderMain :user="user" @prev-month="rekap.setPrevMonth" @next-month="rekap.setNextMonth" :date="rekap.date"/>
    </template>
    <template #content>
      <ListHistory :items="rekap?.details"  />
      <div style="margin-bottom: 200px;"></div>
    </template>
  </app-page>
</template>

<script setup>
import { useLoginXenterStore } from 'src/stores/xenter/auth/login'
import HeaderMain from './HeaderMain.vue'
import ListHistory from './comp/ListHistory.vue'
import { computed, onMounted } from 'vue'
import { useXenterAppStore } from 'src/stores/xenter'
import { useQuasar } from 'quasar'
import { useRekapAbsen } from 'src/stores/xenter/absensi/rekap'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

// eslint-disable-next-line no-unused-vars
const app = useXenterAppStore()
const $q = useQuasar()
const auth = useLoginXenterStore()
const rekap = useRekapAbsen()
const user = computed(() => {
  return auth?.user
})
onMounted(() => {
  console.log('q', $q)
  callFirst('loading')
})
function callFirst (val) {
  rekap.getRekap(dayjs().locale('id').format('MM'), val)
}
</script>
