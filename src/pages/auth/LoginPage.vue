<template>
  <q-page class="column full-height bg-white cutter">
    <app-loadingxenter v-if="app.loading" />
    <AppErrorXenter v-if="!app.loading && app.error !== null"
      :msg="app.error"
      :status="app.status"
      @ok="app.setError(null)"
    />
    <div class="col bg-primary relative-position col-atas">
      <div class="column full-height full-width flex-center absolute">
        <img :src="getLogo()" style="width:50px; transform:scaleY(1.5) ;" />
        <div class="q-mt-lg text-center  text-white">
          <div class="f-20 q-mb-sm">XENTER</div>
          <div class="f-10" style="transform:scaleY(1.5);">UOBK RSUD MOHAMAD SALEH</div>
        </div>
      </div>
    </div>
    <div class="col full-height full-width relative-position">
      <div class="column full-height full-width flex-center absolute">
        <div class="f-10 text-weight-bold q-mb-lg text-primary">Login Xenter</div>
        <q-form @submit="onSubmit" class="full-width" style="padding: 0 40px 0 40px">
          <q-input v-model="username" outlined standout="bg-yellow-3" dense class="full-width q-mb-xs" @focus="focused = true" @blur="focused=false" placeholder="Username" :rules="[val => !!val || 'Harap diisi']" hide-bottom-space >
            <template v-slot:prepend>
              <q-icon class="f-14" name="person" :class="focused? 'text-primary': ''" />
            </template>

          </q-input>
          <q-input v-model="password" outlined standout="bg-yellow-3" dense class="full-width" @focus="focused = true" @blur="focused=false" placeholder="Password" type="password"
          :rules="[val => !!val || 'Harap diisi']">
            <template v-slot:prepend>
              <q-icon class="f-14" name="key" :class="focused? 'text-primary': ''" />
            </template>
            <template v-slot:append>
              <q-icon name="eva-eye-outline" :class="focused? 'text-primary': ''" class="cursor-pointer" />
            </template>
          </q-input>

          <div class="mt-lg">
            <q-btn label="Login" no-caps class="full-width bg-primary text-white" rounded uneleveted type="submit"></q-btn>
          </div>
        </q-form>

        <div class="q-mt-lg f-10">
            Belum Register ? <q-btn dense class="q-pa-none" flat color="primary" no-caps @click="keRegister">Register disini</q-btn>
          </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginXenterStore } from 'src/stores/xenter/auth/login'
import { useXenterAppStore } from 'src/stores/xenter'
import { useQuasar } from 'quasar'
// import { setLocalToken } from 'src/utility/storrage'

const router = useRouter()
const store = useLoginXenterStore()
const app = useXenterAppStore()
const auth = useLoginXenterStore()

// eslint-disable-next-line no-unused-vars
const $q = useQuasar()

// console.log('q', $q)

const focused = ref(false)
const username = ref('')
const password = ref('')

function getLogo () {
  return new URL('../../assets/images/logo-rsud.png', import.meta.url).href
}

function onSubmit () {
  // console.log('ok', store)
  const form = {
    username: username.value,
    email: username.value + '@app.com',
    password: password.value,
    device: 'ios'
  }
  store.login(form).then(() => {
    console.log('cek state', auth.token)
    setTimeout(() => {
      window.location.reload()
    }, 100)
  })

  // console.log('')
  // .then(() => {
  //   setTimeout(() => {
  //     router.replace({ path: '/' })
  //   }, 500)
  // })
}

const token = computed(() => {
  return auth.token
})

const keRegister = () => {
  // console.log('lll', router)
  // route
  router.push({ path: '/auth/register' })
}

watch(token, (n, o) => {
  // console.log('new', n)
  // console.log('old', o)
  if (n !== null) {
    // setLocalToken(n)
    // setTimeout(() => {
    //   router.push({ path: '/' })
    // }, 1000)
    // router.push({ path: '/' })
  }
}, { deep: true })
</script>

<style lang="scss" scoped>
.col-atas {
   border-radius:0 0 50% 50%/0 0 50% 50%;
   transform:scaleX(1.5);
}

.cutter {

   overflow: hidden;
}
</style>
