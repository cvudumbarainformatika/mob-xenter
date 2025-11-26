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
      <ScannerComponent @decode="onDecodeString" @close="onErrorOk" />
      <!-- </div> -->

    </template>
  </app-page>
</template>

<script setup>
import ScannerComponent from '../../../../components/ScannerComponent.vue'
import { useScanXenterStore } from 'src/stores/xenter/scanner/scan'
import { useRouter } from 'vue-router'
import { useXenterAppStore } from 'src/stores/xenter'
import { useLoginXenterStore } from 'src/stores/xenter/auth/login'
import { onUnmounted } from 'vue'

const router = useRouter()
const store = useScanXenterStore()
const app = useXenterAppStore()
const auth = useLoginXenterStore()

function callFirst () {
  console.log('scan page')
  store.setCode(null)
}

onUnmounted(() => {
  app.setError(null)
})

function onErrorOk () {
  app.setError(null)
  router.push({ path: '/' })
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
