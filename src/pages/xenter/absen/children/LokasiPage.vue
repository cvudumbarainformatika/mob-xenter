<template>
  <q-page  class="column fit absolute-top flex-center bg-white shadow-4" style="overflow: hidden;">
    <!-- <app-loadingxenter v-show="loading" /> -->
    <div  class="absolute-bottom full-width z-top">
      <q-card>
        <q-card-section>
          <div class="column flex-center">

            <div class="q-my-lg text-weight-bold">
              <span v-if="jarak > radius">Kamu Jauh Dari Kantor</span>
              <span v-else>Kamu Berada di Area Kantor</span>
            </div>
            <!-- <q-btn v-if="jarak > radius" class="q-mb-lg" color="negative" to="/absen">Kembali</q-btn> -->
            <div class="q-gutter-md">
              <q-btn class="q-mb-lg" color="negative" to="/absen">Kembali</q-btn>
              <q-btn class="q-mb-lg" color="primary" @click="scan = !scan">Lanjut Absen</q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div ref="mapRef" class="absolute-top fit"></div>

    <!-- dialog -->
    <scan-barcode-dialog v-model="scan" class="z-top"
      :kondisi="kondisi"
      :tanggal="tanggal"
      :jam="jam"
      :kategory="kategory"
    />
  </q-page>
</template>
<script setup>
import ScanBarcodeDialog from './complokasi/ScanBarcodeDialog.vue'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useGeolocation } from '@vueuse/core'
// import L from 'leaflet'

// const emits = defineEmits(['activated', 'deactivated'])

defineProps({
  kondisi: {
    type: String,
    default: null
  },
  tanggal: {
    type: String,
    default: null
  },
  jam: {
    type: String,
    default: null
  },
  kategory: {
    type: [Number, String],
    default: null
  }
})

onMounted(() => {
  // console.log('mounted', props.jam)
})

const scan = ref(false)
const mapRef = ref()
// const map = ref()
const lat = ref(0)
const lang = ref(0)

// const loading = ref(true)

const lokasiKantor = ref({
  lat: -7.745527419472046,
  lang: 113.21081986255665
})

const lokasiku = ref({
  lat: -7.745527419472046,
  lang: 113.21081986255665
})

const radius = ref(100)
const jarak = ref(1000)

// const { coords, locatedAt, error, resume, pause } = useGeolocation()
const { coords } = useGeolocation()

const koordinat = computed(() => {
  return coords.value
})

console.log('luar', koordinat?.value)

watchEffect(() => {
  lat.value = koordinat.value?.latitude
  lang.value = koordinat.value?.longitude
  lokasiku.value = {
    lat: koordinat.value?.latitude,
    lang: koordinat.value?.longitude
  }

  const res = hitungJarak(lokasiku.value, lokasiKantor.value)
  jarak.value = res
  // console.log('watch effect', res)
  // map.value?.setView([koordinat.value?.latitude, koordinat.value?.longitude], 13)
})

// const unwatch = watchEffect(() => {
//   unwatch()

//   console.log('watch effect', koordinat.value)
//   // lat.value = koordinat.value?.latitude
//   // lang.value = koordinat.value?.longitude
//   // map.value?.setView([koordinat.value?.latitude, koordinat.value?.longitude], 13)
// })

// onMounted(() => {
//   // emits('activated')
//   // console.log(mapRef.value)
//   // map.value = L.map(mapRef.value).setView([51.505, -0.09], 13)
//   // map.value = L.map(mapRef.value).fitWorld()
//   // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   //   maxZoom: 19,
//   //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//   // }).addTo(map.value)
//   // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   //   maxZoom: 19,
//   //   attribution: '© OpenStreetMap'
//   // }).addTo(map.value)
// })

// onUnmounted(() => {
//   // emits('deactivated')
// })

// function cekLocation (lok) {
//   // console.log(lok)
//   console.log('coba', lok.coords)
// }

function hitungJarak (lokasiku, lokasiKantor) {
  console.log('hitung jarak ...', lokasiku)
  if (lokasiku?.lat === lokasiKantor?.lat && lokasiku?.lang === lokasiKantor?.lang) {
    return 0
  }

  const radlat1 = (Math.PI * lokasiku.lat) / 180
  const radlat2 = (Math.PI * lokasiKantor.lat) / 180

  const theta = lokasiku.lang - lokasiKantor.lang
  const radtheta = (Math.PI * theta) / 180

  let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)

  if (dist > 1) {
    dist = 1
  }

  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344 // convert miles to km
  return Math.trunc(dist * 1000)
}
</script>

<style lang="scss" scoped>
.map{
  width:100vw;
  height:100%;
  background-color: $grey-2;
  overflow: hidden;
}
</style>
