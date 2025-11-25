<template>
  <q-page class="column fit absolute-top flex-center bg-white shadow-4" style="overflow: hidden;">
    <div v-if="!scan">
      <div class="absolute-bottom full-width z-top">
        <q-card>
          <q-card-section>
            <div class="column flex-center">
              <div class="q-my-lg text-weight-bold">
                <span v-if="jarak > radius">Kamu Jauh Dari Kantor</span>
                <span v-else>Kamu Berada di Area Kantor</span>
              </div>
              <div class="q-gutter-md">
                <q-btn class="q-mb-lg" color="negative" to="/absen">Kembali</q-btn>
                <q-btn class="q-mb-lg" color="primary" @click="scan = true">Lanjut Absen</q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div ref="mapRef" class="absolute-top fit"></div>
    </div>

    <q-dialog v-model="scan" persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down">
      <q-card class="bg-dark text-white full-height full-width">
        <q-btn class="absolute-top-right" color="white" size="lg" icon="close" flat round @click="scan = false" />
        <div v-if="kirimQr" class="column fit flex-center">
          <div v-if="waiting">
            <q-spinner-dots color="white" size="2em" />
            <div>Harap tunggu</div>
          </div>
          <div v-else>
            <div v-if="err === null">Absensi Berhasil</div>
            <div v-else>{{ err }}</div>
            <q-btn label="Kembali" color="primary" size="lg" @click="backTo()" />
          </div>
        </div>
        <ScannerComponent v-else @decode="onDecodeString" />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useGeolocation } from '@vueuse/core'
import ScannerComponent from 'src/components/ScannerComponent.vue'
import { useRouter } from 'vue-router'
// eslint-disable-next-line no-unused-vars
import { api } from 'src/boot/axios'
import { useAbsenContext } from 'src/pages/xenter/absen/absenContext'

const props = defineProps({
  kondisi: { type: String, default: null },
  tanggal: { type: String, default: null },
  jam: { type: String, default: null },
  kategory: { type: [Number, String], default: null }
})
const scan = ref(false)
const mapRef = ref()
const lat = ref(0)
const lang = ref(0)

const lokasiKantor = ref({ lat: -7.745527419472046, lang: 113.21081986255665 })
const lokasiku = ref({ lat: -7.745527419472046, lang: 113.21081986255665 })

const radius = ref(100)
const jarak = ref(1000)

const { coords } = useGeolocation()
const koordinat = computed(() => coords.value)

watchEffect(() => {
  lat.value = koordinat.value?.latitude
  lang.value = koordinat.value?.longitude
  lokasiku.value = { lat: koordinat.value?.latitude, lang: koordinat.value?.longitude }
  jarak.value = hitungJarak(lokasiku.value, lokasiKantor.value)
})

// --- QR Scanner Logic ---
const router = useRouter()
// eslint-disable-next-line no-unused-vars
const { saveStore } = useAbsenContext()
const waiting = ref(false)
const kirimQr = ref(false)
const err = ref(null)

function backTo () {
  router.replace({ path: '/absen' })
}

function onDecodeString (val) {
  console.log('hasil decode', val)

  const formData = {
    qr: val,
    tanggal: props.tanggal,
    jam: props.jam,
    status: props.kondisi,
    kategory_id: props.kategory,
    lokasi: 'ok'
  }
  kirimQr.value = true
  waiting.value = true

  sendData(formData)
}

async function sendData (data) {
  console.log('sendData', data)

  // try {
  //   await api.post('/v2/absensi/scan/qr', data)
  //   props.kondisi === 'masuk' ? saveStore('checkIn') : saveStore('checkOut')
  // } catch (error) {
  //   err.value = 'Ada Kesalahan Harap Ulangi'
  // } finally {
  //   waiting.value = false
  // }
}
// --- End QR Scanner Logic ---

function hitungJarak (lokasiku, lokasiKantor) {
  if (lokasiku?.lat === lokasiKantor?.lat && lokasiku?.lang === lokasiKantor?.lang) {
    return 0
  }
  const radlat1 = (Math.PI * lokasiku.lat) / 180
  const radlat2 = (Math.PI * lokasiKantor.lat) / 180
  const theta = lokasiku.lang - lokasiKantor.lang
  const radtheta = (Math.PI * theta) / 180
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
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
.map {
  width: 100vw;
  height: 100%;
  background-color: $grey-2;
  overflow: hidden;
}
</style>
