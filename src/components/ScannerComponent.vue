<template>
  <div class="scanner-container">
    <video ref="video" autoplay class="scanner-video"></video>
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="startScan">Coba Lagi</button>
    </div>
  </div>
</template>

<script setup>
/* global BarcodeDetector */
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserMedia } from '@vueuse/core'

const video = ref(null)
const error = ref(null)
const emit = defineEmits(['decode'])

const { stream, start: startUserMedia, stop: stopUserMedia } = useUserMedia({
  constraints: { video: { facingMode: 'environment' } }
})

const startScan = async () => {
  error.value = null
  try {
    await startUserMedia()
    if (stream.value) {
      video.value.srcObject = stream.value
      const barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] })
      const checkBarcode = async () => {
        if (video.value) {
          const barcodes = await barcodeDetector.detect(video.value)
          if (barcodes.length > 0) {
            emit('decode', barcodes[0].rawValue)
            stopUserMedia()
          } else {
            requestAnimationFrame(checkBarcode)
          }
        }
      }
      requestAnimationFrame(checkBarcode)
    }
  } catch (err) {
    error.value = 'Tidak dapat memulai kamera. Pastikan Anda memberikan izin.'
    console.error(err)
  }
}

onMounted(startScan)

onUnmounted(() => {
  stopUserMedia()
})
</script>

<style scoped>
.scanner-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scanner-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: red;
}
</style>
