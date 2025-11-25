<template>
  <div class="scanner-container">
    <video ref="video" autoplay muted playsinline class="scanner-video"></video>
    <q-btn
      class="absolute-top-right q-ma-md"
      color="white"
      size="lg"
      icon="close"
      flat
      round
      @click="emit('close')"
      style="z-index: 100;"
    />
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="startScan">Coba Lagi</button>
    </div>
    <div v-if="!error && !isScanning" class="loading-message">
      <p>Mempersiapkan kamera...</p>
    </div>
  </div>
</template>

<script setup>
/* global BarcodeDetector */
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useUserMedia } from '@vueuse/core'

const video = ref(null)
const error = ref(null)
const isScanning = ref(false)
const emit = defineEmits(['decode', 'close']) // Tambahkan 'close' event

const { stream, start: startUserMedia, stop: stopUserMedia } = useUserMedia({
  constraints: { video: { facingMode: 'environment' } }
})

let barcodeDetector
let animationFrameId

const initBarcodeDetector = () => {
  if (!('BarcodeDetector' in window)) {
    error.value = 'Barcode Detector API tidak didukung di browser ini.'
    return false
  }
  try {
    barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] })
    console.log('ScannerComponent: BarcodeDetector berhasil diinisialisasi.')
    return true
  } catch (e) {
    console.error('ScannerComponent: Gagal menginisialisasi BarcodeDetector:', e)
    error.value = `Gagal menginisialisasi detektor barcode: ${e.message}`
    return false
  }
}

const startScan = async () => {
  error.value = null
  isScanning.value = false
  cancelAnimationFrame(animationFrameId) // Hentikan frame sebelumnya jika ada

  if (!initBarcodeDetector()) {
    return
  }

  try {
    await startUserMedia()
    if (stream.value && video.value) {
      video.value.srcObject = stream.value
      // nextTick memastikan elemen video sudah di-render di DOM
      await nextTick()

      video.value.onloadedmetadata = () => {
        console.log('ScannerComponent: Metadata video dimuat. Memulai deteksi dalam 100ms...')
        // Beri sedikit waktu agar video stabil sebelum memulai deteksi
        setTimeout(() => {
          isScanning.value = true
          animationFrameId = requestAnimationFrame(checkBarcode)
        }, 100) // Penundaan 100ms
      }
      // Jika metadata sudah dimuat karena video sudah aktif
      if (video.value.readyState >= 1) { // HAVE_METADATA
        video.value.onloadedmetadata() // Panggil secara manual
      }
    } else {
      error.value = 'Tidak ada stream video atau elemen video tidak ditemukan.'
    }
  } catch (err) {
    error.value = 'Tidak dapat memulai kamera. Pastikan Anda memberikan izin.'
    console.error('ScannerComponent: Error saat memulai kamera:', err)
  }
}

const checkBarcode = async () => {
  // Tambahkan pemeriksaan ini di awal
  if (!video.value) {
    console.log('checkBarcode: video.value adalah null, menghentikan loop deteksi.')
    cancelAnimationFrame(animationFrameId)
    return
  }

  console.log('checkBarcode: readyState', video.value.readyState, 'paused', video.value.paused, 'ended', video.value.ended, 'videoWidth', video.value.videoWidth, 'videoHeight', video.value.videoHeight)

  if (!isScanning.value || !barcodeDetector) {
    cancelAnimationFrame(animationFrameId)
    return
  }

  // Hanya deteksi jika video memiliki data dan tidak di-pause/ended
  if (video.value.readyState >= 2 && !video.value.paused && !video.value.ended && video.value.videoWidth > 0 && video.value.videoHeight > 0) {
    try {
      const barcodes = await barcodeDetector.detect(video.value)
      if (barcodes.length > 0) {
        emit('decode', barcodes[0].rawValue)
        stopScan()
        return // Hentikan rekursi setelah deteksi sukses
      }
    } catch (e) {
      console.error('ScannerComponent: Error saat mendeteksi barcode:', e)
      if (e.name === 'InvalidStateError' || e.name === 'DOMException') {
        // InvalidStateError bisa terjadi jika elemen tidak valid, coba lagi
        // DOMException kadang terjadi saat kamera baru saja dihentikan atau belum siap
        // Lanjutkan jika error menunjukkan kondisi sementara
      } else {
        // Error lain mungkin perlu penanganan lebih lanjut atau stop scan
        error.value = `Deteksi error: ${e.message}`
        stopScan()
        return
      }
    }
  } else {
    console.log('ScannerComponent: Video belum siap untuk deteksi atau kondisi tidak valid.')
  }

  // Lanjutkan memanggil frame berikutnya
  animationFrameId = requestAnimationFrame(checkBarcode)
}

const stopScan = () => {
  isScanning.value = false
  stopUserMedia()
  cancelAnimationFrame(animationFrameId)
  console.log('stopScan: Kamera dihentikan.')
}

onMounted(startScan)

onUnmounted(stopScan)
</script>

<style scoped>
.scanner-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000;
}

.scanner-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.error-message, .loading-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
</style>
