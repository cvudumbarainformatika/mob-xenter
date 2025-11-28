<template>
  <div class="scanner-component">
    <qrcode-stream @decode="onDecode" />
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
  </div>
</template>

<script setup>
import { QrcodeStream } from 'vue-qrcode-reader'
const emit = defineEmits(['decode', 'close'])

function onDecode (val) {
  emit('decode', val)
}

</script>

<style scoped>

.scanner-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000;
}
</style>
