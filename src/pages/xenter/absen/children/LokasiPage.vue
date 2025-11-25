<template>
  <q-page class="column fit absolute-top flex-center bg-white shadow-4" style="overflow: hidden;">
    <div v-if="!scan">
      <div class="absolute-bottom full-width z-top">
        <q-card>
          <q-card-section>
            <div class="column flex-center">
              <div class="q-my-lg text-weight-bold">
                <span v-if="offlineError" class="text-negative">Tidak Ada Koneksi Internet</span>
                <span v-else-if="accuracyError" class="text-negative">Akurasi Lokasi Rendah ({{ currentAccuracy.toFixed(1) }}m)</span>
                <span v-else-if="isUserFar" class="text-negative">Kamu Jauh Dari Kantor</span>
                <span v-else class="text-primary">Kamu Berada di Area Kantor</span>
              </div>
              <div class="q-gutter-md">
                <q-btn class="q-mb-lg" color="negative" to="/absen">Kembali</q-btn>
                <q-btn
                  class="q-mb-lg"
                  color="primary"
                  @click="scan = true"
                  :disable="(isUserFar && !forceAbsen) || !isOnline || accuracyError"
                >
                  Lanjut Absen
                </q-btn>
              </div>
            </div>
            <!-- Info Jarak dan Status -->
            <div class="text-center q-mt-md">
              <div class="f-12">
                📍 Jarak ke kantor:
                <span :class="!isUserFar ? 'text-primary' : 'text-negative'">
                  {{ currentDistance.toFixed(1) }} m
                </span>
              </div>
              <div class="f-12">
                Status:
                <span :class="!isUserFar ? 'text-primary' : 'text-negative'">
                  {{ !isUserFar ? 'Di dalam area kantor' : 'Di luar area' }}
                </span>
              </div>
              <div class="f-12">
                Akurasi GPS:
                <span :class="!accuracyError ? 'text-primary' : 'text-negative'">
                  {{ currentAccuracy.toFixed(1) }} m
                </span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <RealtimeMap
        class="absolute-top fit"
        :kantorPos="lokasiKantor"
        :radiusKantor="radius"
        @update:distance="updateDistance"
        @update:isFar="updateIsFar"
      />
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
        <ScannerComponent v-else @decode="onDecodeString" @close="scan = false" />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useGeolocation, useNetwork } from '@vueuse/core'
import ScannerComponent from 'src/components/ScannerComponent.vue'
import RealtimeMap from 'src/pages/xenter/absen/RealtimeMap.vue'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios'
import { useAbsenContext } from 'src/pages/xenter/absen/absenContext'

const props = defineProps({
  kondisi: { type: String, default: null },
  tanggal: { type: String, default: null },
  jam: { type: String, default: null },
  kategory: { type: [Number, String], default: null }
})

const scan = ref(false)
const forceAbsen = ref(false) // Untuk debugging atau override jika diperlukan
const currentDistance = ref(0)
const isUserFar = ref(true)
const currentAccuracy = ref(0) // Akurasi GPS
const accuracyThreshold = ref(50) // Batas akurasi dalam meter
const accuracyError = ref(false) // Status error akurasi
const offlineError = ref(false) // Status error offline

// Lokasi kantor dan radius - bisa dipindahkan ke store atau config
const lokasiKantor = ref({ lat: -7.7449802744747185, lng: 113.210602 })
const radius = ref(75) // Radius kantor dalam meter

// Deteksi lokasi dari @vueuse/core
const { coords, error: geolocationError } = useGeolocation()
// Deteksi status network dari @vueuse/core
const { isOnline } = useNetwork()

// Watcher untuk Geolocation (untuk akurasi dan error)
watch(coords, (newCoords) => {
  if (newCoords?.accuracy !== undefined) {
    currentAccuracy.value = newCoords.accuracy
    accuracyError.value = newCoords.accuracy > accuracyThreshold.value
  }
}, { immediate: true })

// Watcher untuk error Geolocation (misal: izin ditolak)
watch(geolocationError, (newError) => {
  if (newError) {
    console.error('Geolocation Error:', newError.message)
    // Jika ada error geolocation, secara efektif anggap pengguna jauh
    // Atau tampilkan pesan spesifik untuk mengaktifkan lokasi
    isUserFar.value = true
    // accuracyError.value = true // Bisa juga diatur akurasi error
  } else {
    // Reset error jika lokasi berhasil didapat kembali
    // accuracyError.value = false
  }
}, { immediate: true })

// Watcher untuk status online
watch(isOnline, (onlineStatus) => {
  offlineError.value = !onlineStatus
  if (!onlineStatus) {
    console.warn('Anda sedang offline. Koneksi internet diperlukan untuk absen.')
  }
}, { immediate: true })

// Handler dari RealtimeMap
const updateDistance = (newDistance) => {
  currentDistance.value = newDistance
}

const updateIsFar = (status) => {
  isUserFar.value = status
}

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
    lokasi: 'ok',
    latitude: coords.value?.latitude,
    longitude: coords.value?.longitude,
    accuracy: coords.value?.accuracy
  }

  kirimQr.value = true
  waiting.value = true

  sendData(formData)
}

async function sendData (data) {
  console.log('sendData', data)

  try {
    await api.post('/v2/absensi/scan/qr', data)
    props.kondisi === 'masuk' ? saveStore('checkIn') : saveStore('checkOut')
  } catch (error) {
    err.value = 'Ada Kesalahan Harap Ulangi'
  } finally {
    waiting.value = false
  }
}
// --- End QR Scanner Logic ---

</script>

<style lang="scss" scoped>
.map {
  width: 100vw;
  height: 100%;
  background-color: $grey-2;
  overflow: hidden;
}

.f-12 {
  font-size: 0.75rem; /* Ukuran font yang lebih kecil */
}
</style>
