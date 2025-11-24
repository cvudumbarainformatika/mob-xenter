<template>
  <app-page
    @page-activated="callFirst()"
    @on-error-click="onErrorOk()"
  >
    <!-- <template #header>
      opo
    </template> -->
    <template #content>
      <!-- <div class="column full-height"> -->
        <AppErrorXenter v-if="!app.loading && err !== null"
          :msg="err"
          :status="app.status"
          @ok="onErrorOk"
        />
        <qrcode-stream v-else
          @init="onInit"
          @detect="onDetect"
          @decode="onDecodeString"
        />
      <!-- </div> -->

    </template>
  </app-page>
</template>

<script setup>
import { QrcodeStream } from 'vue3-qrcode-reader'
import { useScanXenterStore } from 'src/stores/xenter/scanner/scan'
import { useRouter } from 'vue-router'
import { useXenterAppStore } from 'src/stores/xenter'
import { useLoginXenterStore } from 'src/stores/xenter/auth/login'
import { onUnmounted, ref } from 'vue'

const router = useRouter()
const store = useScanXenterStore()
const app = useXenterAppStore()
const auth = useLoginXenterStore()
console.log(router)

const err = ref(null)

function callFirst () {
  console.log('scan page')
  err.value = null
  store.setCode(null)
}

// eslint-disable-next-line no-unused-vars
function deactived () {
  app.setError(null)
}

onUnmounted(() => {
  app.setError(null)
})

// eslint-disable-next-line no-unused-vars
async function cameraReady (capabilities) {
  console.log('promise', capabilities)
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
    err.value = error.message
  }

  setTimeout(() => {
    app.setLoading(false)
  }, 1000)
}

// eslint-disable-next-line no-unused-vars
async function onInit (promise) {
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

function onErrorOk () {
  app.setError(null)
  router.push({ path: '/' })
}

// eslint-disable-next-line no-unused-vars
function onDecodeString (val) {
  store.setCode(val)
  if (val) {
    const form = {
      qr: val,
      token: auth.token
    }
    store.kirimQr(form).then(() => {
      router.replace({ path: '/' })
    })
  }
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
  } catch (error) {
    // ...
    console.log(error)
  }
}

</script>
