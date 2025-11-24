<template>
  <app-page>
    <template #header>
      <header-main :user="user?.pegawai" />
    </template>
    <template #content>
      <list-jadwal :items="store.jadwals" @clicked="clickedItem" />
      <!-- dialog -->
      <DialogPilihJadwal v-model="bukaDialog" :items="store.kategories" :hari="selectHari"
      @close="bukaDialog = !bukaDialog"  />

    </template>
  </app-page>
</template>

<script setup>
import { useLoginXenterStore } from 'src/stores/xenter/auth/login'
import HeaderMain from './HeaderMain.vue'
import ListJadwal from './comp/ListJadwal.vue'
import DialogPilihJadwal from './comp/DialogPilihJadwal.vue'
import { computed, onMounted, ref } from 'vue'
import { useJadwal } from 'src/stores/xenter/absensi/jadwal'
// import { useRouter } from 'vue-router'
// import { useXenterAppStore } from 'src/stores/xenter'
// import { useQuasar } from 'quasar'

// const app = useXenterAppStore()
// const $q = useQuasar()
const store = useJadwal()
const auth = useLoginXenterStore()

const bukaDialog = ref(false)
const selectJadwal = ref(null)
const selectHari = ref(null)

const user = computed(() => {
  return auth?.user
})
// const router = useRouter()
onMounted(() => {
  // console.log('jadwal', $q)

  callFirst('no')
})

function callFirst (val) {
  selectJadwal.value = null
  selectHari.value = null
  store.getJadwals(val)
  store.getKategories()
}

function clickedItem (val) {
  // console.log(val)
  selectHari.value = val
  if (val.kategory_id > 2 || !val.kategory) {
    console.log('bisa click', val)
    bukaDialog.value = true
  } else {
    console.log('patent')
  }
}

// function pilihjadwal (item) {
//   selectJadwal.value = item
// }
</script>
