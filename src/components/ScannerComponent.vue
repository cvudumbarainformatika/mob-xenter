<template>
  <div class="scanner-container">
    <video ref="video" autoplay muted playsinline class="scanner-video"></video>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserMedia } from '@vueuse/core'

const video = ref(null)
const error = ref(null)
const isScanning = ref(false)
const emit = defineEmits(['decode'])

const { stream, start: startUserMedia, stop: stopUserMedia } = useUserMedia({
  constraints: { video: { facingMode: 'environment' } }
})

let barcodeDetector

const startScan = async () => {
  error.value = null
  isScanning.value = false
  try {
    if (!('BarcodeDetector' in window)) {
      error.value = 'Barcode Detector API tidak didukung di browser ini.'
      return
    }

    await startUserMedia()
    if (stream.value && video.value) {
      video.value.srcObject = stream.value
      video.value.onloadedmetadata = () => {
        // Beri sedikit waktu agar video stabil sebelum memulai deteksi
        setTimeout(() => {
          barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] })
          isScanning.value = true
          requestAnimationFrame(checkBarcode)
        }, 100) // Penundaan 100ms
      }
    }
  } catch (err) {
    error.value = 'Tidak dapat memulai kamera. Pastikan Anda memberikan izin.'
    console.error('Error saat memulai kamera:', err)
  }
}

const checkBarcode = async () => {
  console.log('checkBarcode: readyState', video.value.readyState, 'paused', video.value.paused, 'ended', video.value.ended)
  if (
    isScanning.value &&
    video.value &&
    barcodeDetector &&
    video.value.readyState >= 2 && // Minimal HAVE_CURRENT_DATA
    !video.value.paused && // Pastikan video tidak di-pause
    !video.value.ended // Pastikan video belum selesai
  ) {
    try {
      const barcodes = await barcodeDetector.detect(video.value)
      if (barcodes.length > 0) {
        emit('decode', barcodes[0].rawValue)
        stopScan()
      } else {
        requestAnimationFrame(checkBarcode)
      }
    } catch (e) {
      console.error('Error saat mendeteksi barcode (di dalam try-catch):', e)
      // Lanjutkan mencoba jika bukan error fatal yang mengharuskan penghentian
      if (e.name === 'InvalidStateError') {
        // InvalidStateError bisa terjadi jika elemen tidak valid, coba lagi
        requestAnimationFrame(checkBarcode)
      } else {
        // Error lain mungkin perlu penanganan lebih lanjut atau stop scan
        error.value = `Deteksi error: ${e.message}`
        stopScan()
      }
    }
  } else if (isScanning.value) {
    // Jika masih scanning tapi kondisi video belum siap, coba lagi frame berikutnya
    requestAnimationFrame(checkBarcode)
  }
}

const stopScan = () => {
  isScanning.value = false
  stopUserMedia()
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
