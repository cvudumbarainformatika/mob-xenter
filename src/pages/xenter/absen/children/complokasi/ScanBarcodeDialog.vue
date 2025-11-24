<template>
  <q-dialog
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-dark text-white full-height full-width">
        <AppErrorXenter v-if="!app.loading && err !== null"
          :msg="err"
          :status="app.status"
          @ok="onErrorOk"
        />
        <div v-else-if="kirimQr" class="column fit flex-center">
          <div v-if="waiting">
            <q-spinner-dots
              color="white"
              size="2em"
            />
            <div>Harap tunggu</div>
          </div>

          <div v-else>

            <div v-if="err===null">Absensi Berhasil</div>
            <div v-else>{{ err }}</div>
            <q-btn label="Kembali" color="primary" size="lg" @click="backTo()" />

          </div>
        </div>
        <qrcode-stream v-else
          @init="onInit"
          @detect="onDetect"
          @decode="onDecodeString"
        >
        <div class="column fit flex-center">
          <!-- <div>{{ form }}</div> -->
        </div>
      </qrcode-stream>
      </q-card>
    </q-dialog>
</template>

<script setup>
import { QrcodeStream } from 'vue3-qrcode-reader'
import { useScanXenterStore } from 'src/stores/xenter/scanner/scan'
import { useRouter } from 'vue-router'
import { useXenterAppStore } from 'src/stores/xenter'
import { useLoginXenterStore } from 'src/stores/xenter/auth/login'
import { onUnmounted, ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import { useAbsenContext } from '../../absenContext'

const { saveStore } = useAbsenContext()

const router = useRouter()
const store = useScanXenterStore()
const app = useXenterAppStore()
// eslint-disable-next-line no-unused-vars
const auth = useLoginXenterStore()

// console.log(router)
const waiting = ref(false)
const kirimQr = ref(false)
const dataqr = ref(null)
const content = ref(null)
const location = ref(null)

const form = ref(null)

const err = ref(null)

const props = defineProps({
  kondisi: {
    type: String,
    default: null
  },
  tanggal: {
    type: String,
    default: null
  },
  jam: {
    type: String,
    default: null
  },
  kategory: {
    type: [Number, String],
    default: null
  }
})

onMounted(() => {
  callFirst()
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

function onErrorOk () {
  app.setError(null)
  router.push({ path: '/absen' })
}

function backTo () {
  router.replace({ path: '/absen' })
  // window.location.reload()
}

// eslint-disable-next-line no-unused-vars
function onDecodeString (val) {
  // store.setCode(val)
  // if (val) {
  //   const form = {
  //     qr: val,
  //     token: auth.token
  //   }
  //   store.kirimQr(form).then(() => {
  //     router.replace({ path: '/' })
  //   })
  // }
  form.value = null
  dataqr.value = null
  dataqr.value = val
  const formData = {
    // id: id,
    qr: val,
    tanggal: props.tanggal,
    jam: props.jam,
    status: props.kondisi,
    kategory_id: props.kategory,
    lokasi: 'ok'
  }

  form.value = formData
  kirimQr.value = true
  waiting.value = true
  sendData(formData)
}

async function sendData (data) {
  await api.post('/v2/absensi/scan/qr', data)
    .then((resp) => {
      // console.log('ok')
      props.kondisi === 'masuk' ? saveStore('checkIn') : saveStore('checkOut')
      waiting.value = false
    }).catch((err) => {
      err.value = 'Ada Kesalahan Harap Ulangi'
      waiting.value = false
    })
}

async function onDetect (promise) {
  try {
    const {
      content, // decoded String
      location // QR code coordinates
    } = await promise

    // ...
    // console.log('content', content)
    // console.log('location', location)
    content.value = content
    location.value = location
  } catch (error) {
    // ...
    console.log(error)
  }
}
</script>
