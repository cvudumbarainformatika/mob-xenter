<template>
  <q-page class="bg-grey-2">
    <app-loadingxenter v-if="app.loading" />
    <AppErrorXenter v-if="!app.loading && store.error !== null"
      :msg="store.error"
      :status="store.status"
      @ok="store.setErrorNull"
    />
    <div class="q-pa-lg">
      <div class="q-my-md"><b>Hallo, {{ store?.result?.nama }}</b></div>
      <div class="q-mt-lg row">
        <div class="col-5">
          <q-card flat bordered style="width:100%">
            <q-card-section>
              <div class="f-10">
                <b>Masukkan Password, </b> Harap diingat password anda...
                <br>
                <br>
                Jika Sudah berhasil input password?... silahkan Login ke aplikasi
                <br>
                <br>
                <b>TERIMAKASIH</b>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-img
          :src="getImage()"
          spinner-color="white"
          style="width: 100%;"
        />
        </div>
      </div>
    </div>

    <div class="q-mt-lg">
      <div class="q-pa-lg">
        <div class="f-10 q-mb-xs text-grey"><em>ini password default ... Silahkan diganti Sesuai keinginan Anda</em></div>
        <q-input placeholder="Masukkan Password Anda" dense outlined
          v-model="store.password"
          standout="bg-yellow-3"
          color="primary"
        ></q-input>
      </div>
    </div>

    <div class="absolute-bottom">
      <div class="row">
        <q-btn class="col fullwidth" color="dark" square @click="backToLogin"><div class="f-12">Kembali Ke Login</div></q-btn>
        <q-btn class="col fullwidth" color="primary" square @click="register"><div class="f-12">Register</div></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// import ResultPencarian from '../xenter/register/ResultPencarian.vue'
import { useXenterAppStore } from 'src/stores/xenter'
import { useRegisterXenter } from 'src/stores/xenter/auth/register'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useRegisterXenter()

const app = useXenterAppStore()
onMounted(() => {
  console.log('onMounted', store.result)
  // if (!store.result || store.result?.account_pass !== '' || store.result?.account_pass !== null) {
  //   backToLogin()
  // }
})

function backToLogin () {
  router.replace({ path: '/auth' })
}

function register () {
  store.registerUser()
}

function getImage () {
  return new URL('../../assets/images/mad_saleh_menunjuk.png', import.meta.url).href
}
</script>
