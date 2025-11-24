<template>
  <q-page>
    <app-loadingxenter v-if="app.loading" />
    <AppErrorXenter v-if="!app.loading && app.error !== null"
      :msg="app.error"
      :status="app.status"
      @ok="onErrorOk"
    />
    <QrcodeStream @init="onInit" @decode="onDecodeString"></QrcodeStream>

    <!-- <div class="absolute-bottom">{{ store.code }}</div> -->
  </q-page>
</template>

<script setup>
import { useLoginXenterStore } from 'src/stores/xenter/auth/login'
import { useScanXenterStore } from 'src/stores/xenter/scanner/scan'
import { QrcodeStream } from 'vue3-qrcode-reader'
import { useXenterAppStore } from 'src/stores/xenter'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
// console.log('ok')
const app = useXenterAppStore()
const auth = useLoginXenterStore()
const router = useRouter()

const store = useScanXenterStore()

// const onError = (error) => {

// }

onMounted(() => {
  store.setCode(null)
  // console.log('cek state', auth)
})

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
    if (err.name === 'NotAllowedError') {
      app.setError('you need to grant camera access permission')
    } else if (err.name === 'NotFoundError') {
      app.setError('no camera on this device')
    } else if (err.name === 'NotSupportedError') {
      app.setError('secure context required (HTTPS, localhost)')
    } else if (err.name === 'NotReadableError') {
      app.setError('is the camera already in use?')
    } else if (err.name === 'OverconstrainedError') {
      app.setError('installed cameras are not suitable')
    } else if (err.name === 'StreamApiNotSupportedError') {
      app.setError('Stream API is not supported in this browser')
    } else if (err.name === 'InsecureContextError') {
      app.setError('Camera access hanya untuk secure context. Pakai HTTPS atau localhost tidak boleh mode http.')
    } else {
      app.setError(err.message)
    }

    setTimeout(() => {
      app.setLoading(false)
    }, 1000)
  }
}

function onErrorOk () {
  router.replace({ path: '/' })
  app.setError(null)
}

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
</script>
