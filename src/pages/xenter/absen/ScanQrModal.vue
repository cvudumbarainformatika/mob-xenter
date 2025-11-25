<template>
  <q-dialog
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
    <q-card class="fixed-full bg-dark column text-white">
      <AppErrorXenter v-if="!app.loading && err !== null"
        :msg="err"
        :status="app.status"
        @ok="onErrorOk"
      />

      <div v-else class="fit column relative-position">
        <qrcode-stream
          v-show="!scanned"
          class="absolute-full "
          @init="onInit"
          @decode="onDecode"
        >

        <!-- Overlay Fokus Tengah -->
         <div
          v-show="!scanned"
          class="absolute-full flex flex-center"
          style="pointer-events: none;"
        >
          <!-- Lapisan Gelap -->
          <!-- <div
            class="absolute-full"
            style="background: rgba(0,0,0,0.7);"
          ></div> -->

          <!-- Kotak Fokus -->
          <div
            class="relative rounded-borders overflow-hidden"
            style="
              width: 256px;
              height: 256px;
              border-radius: 16px;
              border: 1px solid rgba(255,255,255,0.2);
              box-shadow: 0 0 40px rgba(0, 255, 255, 0.2);
              z-index: 10;
            "
          >
            <!-- Corner Brackets -->
            <div class="corner top left"></div>
            <div class="corner top right"></div>
            <div class="corner bottom left"></div>
            <div class="corner bottom right"></div>

            <!-- Laser -->
            <div class="laser"></div>
          </div>

        </div>
      </qrcode-stream>

        <q-btn class="absolute-top-right" color="white" size="lg" icon="close" flat round @click="emit('close')" />

        <!-- Overlay Bawah -->
        <div
          v-if="!scanned"
          class="absolute-bottom full-width text-center text-white"
          style="
            padding: 24px;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          "
        >
          Arahkan kamera ke QR code kantor Anda
        </div>

        <!-- Animasi Sukses -->
        <transition name="scale">
          <div
            v-if="scanned"
            class="absolute-full flex flex-center column text-white"
            style="background: rgba(0,0,0,0.8);"
          >
            <svg
              class="success-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="4"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>

            <div class="q-mt-md text-h6 text-green">
              QR Berhasil Dibaca
            </div>
          </div>
        </transition>
      </div>
    </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScanXenterStore } from 'src/stores/xenter/scanner/scan'
import { useXenterAppStore } from 'src/stores/xenter'
import { useLoginXenterStore } from 'src/stores/xenter/auth/login'

import { QrcodeStream } from 'qrcode-reader-vue3'

// eslint-disable-next-line no-unused-vars
const router = useRouter()
// eslint-disable-next-line no-unused-vars
const store = useScanXenterStore()
const app = useXenterAppStore()
// eslint-disable-next-line no-unused-vars
const auth = useLoginXenterStore()

const err = ref(null)
const scanned = ref(false)
const beep = new Audio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg')

const waiting = ref(false)
const kirimQr = ref(false)
const dataqr = ref(null)
const content = ref(null)
const location = ref(null)

const emit = defineEmits(['close'])

function onErrorOk () {
  app.setError(null)
  emit('close')
}

onMounted(() => {
  callFirst()
})

onUnmounted(() => {
  app.setError(null)
})

function callFirst () {
  console.log('scan page')
  err.value = null
  store.setCode(null)
  dataqr.value = null
  content.value = null
  location.value = null
  kirimQr.value = false
  waiting.value = false
}

const onDecode = (result) => {
  // Efek suara
  beep.currentTime = 0
  beep.play().catch(() => {})

  // Efek vibrasi di mobile
  if (navigator.vibrate) navigator.vibrate(150)

  // Tampilkan animasi sukses
  scanned.value = true
  console.log('result', result)

  emit('success', result)

  // Auto-close setelah 1.5 detik
  setTimeout(() => {
    emit('close')
  }, 1500)
}

async function onInit (promise) {
  // kirimQr.value = false
  console.log('promise', promise)
  app.setLoading(true)
  try {
    const { capabilities } = await promise
    // success installed
    console.log('success', capabilities)
    app.setLoading(false)
  } catch (err) {
    console.log('error', err)
    onError(err)
  }
}

function onError (error) {
  app.setLoading(false)
  // console.log('error', error)
  if (error.name === 'NotAllowedError') {
    err.value = 'you need to grant camera access permission'
  } else if (error.name === 'NotFoundError') {
    err.value = 'no camera on this device'
  } else if (error.name === 'NotSupportedError') {
    err.value = 'secure context required (HTTPS, localhost)'
  } else if (error.name === 'NotReadableError') {
    err.value = 'is the camera already in use?'
  } else if (error.name === 'OverconstrainedError') {
    err.value = 'installed cameras are not suitable'
  } else if (error.name === 'StreamApiNotSupportedError') {
    err.value = 'Stream API is not supported in this browser'
  } else if (error.name === 'InsecureContextError') {
    err.value = 'Camera access hanya untuk secure context. Pakai HTTPS atau localhost tidak boleh mode http.'
  } else {
    err.value = error?.message || error
  }

  // err.value = error

  setTimeout(() => {
    app.setLoading(false)
  }, 1000)
}

async function onDetect (promise) {
  try {
    const {
      content, // decoded String
      location // QR code coordinates
    } = await promise

    // ...
    console.log('content', content)
    console.log('location', location)
    // content.value = content
    // location.value = location
  } catch (error) {
    // ...
    console.log(error)
  }
}

</script>

<style scoped>

.z--1 { z-index: -1; }

/* Corner Effects */
.corner {
  position: absolute;
  width: 24px;
  height: 24px;
  border-color: #22d3ee;
  filter: drop-shadow(0 0 10px #22d3ee);
}

.corner.top.left {
  top: 0;
  left: 0;
  border-top: 4px solid;
  border-left: 4px solid;
}

.corner.top.right {
  top: 0;
  right: 0;
  border-top: 4px solid;
  border-right: 4px solid;
}

.corner.bottom.left {
  bottom: 0;
  left: 0;
  border-bottom: 4px solid;
  border-left: 4px solid;
}

.corner.bottom.right {
  bottom: 0;
  right: 0;
  border-bottom: 4px solid;
  border-right: 4px solid;
}

/* Laser */
.laser {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: linear-gradient(to right, #22d3ee, #3b82f6);
  filter: drop-shadow(0 0 10px #22d3ee);
  animation: laserMove 2s infinite linear;
}

@keyframes laserMove {
  0% { top: 0; }
  100% { top: 100%; }
}

/* Success Icon Bounce */
.success-icon {
  width: 112px;
  height: 112px;
  color: #4ade80;
  animation: bounceSlow 1.8s infinite;
}

@keyframes bounceSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

/* Scale Transition */
.scale-enter-active, .scale-leave-active {
  transition: transform 0.3s ease;
}
.scale-enter-from, .scale-leave-to {
  transform: scale(0.8);
}

</style>
