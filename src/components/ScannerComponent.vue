<template>
  <div class="scanner-container">
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="resetScanner">Coba Lagi</button>
    </div>
    <qrcode-stream v-else @decode="onDecode" @init="onInit" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { QrcodeStream } from 'qrcode-reader-vue3'

const error = ref(null)
const emit = defineEmits(['decode'])

const onDecode = (decodedString) => {
  console.log('ScannerComponent: QR Code berhasil didekode:', decodedString)
  emit('decode', decodedString)
}

const onInit = async (promise) => {
  console.log('ScannerComponent: Inisialisasi kamera dimulai...')
  try {
    await promise
    console.log('ScannerComponent: Inisialisasi kamera berhasil.')
  } catch (err) {
    console.error('ScannerComponent: Error saat inisialisasi kamera:', err)
    if (err.name === 'NotAllowedError') {
      error.value = 'Izin kamera tidak diberikan.'
    } else if (err.name === 'NotFoundError') {
      error.value = 'Tidak ada kamera yang ditemukan.'
    } else if (err.name === 'NotSupportedError') {
      error.value = 'Konteks aman (HTTPS, localhost) diperlukan.'
    } else if (err.name === 'NotReadableError') {
      error.value = 'Kamera sedang digunakan oleh aplikasi lain.'
    } else if (err.name === 'OverconstrainedError') {
      error.value = 'Kamera yang terpasang tidak sesuai.'
    } else if (err.name === 'StreamApiNotSupportedError') {
      error.value = 'Stream API tidak didukung di browser ini.'
    } else if (err.name === 'InsecureContextError') {
      error.value = 'Akses kamera hanya untuk konteks aman (HTTPS atau localhost).'
    } else {
      error.value = `Error: ${err.message}`
    }
  }
}

const resetScanner = () => {
  console.log('ScannerComponent: Resetting scanner.')
  error.value = null
}
</script>

<style scoped>
.scanner-container {
  position: relative;
  width: 100%;
  height: 100%;
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
