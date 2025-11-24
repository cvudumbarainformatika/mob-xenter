<template>
  <app-page>
    <template #content>

      <q-card class="my-card" flat bordered>
      <q-img :src="user?.pegawai?.foto_pegawai" />

      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="verified"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ user?.nama }}
          </div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-icon name="place" />
          </div>
        </div>

        <q-rating v-model="stars" :max="5" size="32px" color="info" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          <q-icon name="place" /> 🏠・{{ user?.pegawai?.kecamatan }} {{ user?.pegawai?.kelurahan }} {{ user?.pegawai?.kota }}
        </div>
        <div class="text-caption text-grey">
          {{ user?.pegawai?.alamat_detil }}
        </div>
      </q-card-section>

      <q-separator />
      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          <q-icon name="phone" /> 📞 Telp : {{ user?.pegawai?.telp }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions class="q-pa-none">
        <q-btn flat icon="logout" class="bg-negative text-white fit"  @click="logout">
          <div class="q-pa-lg">LOGOUT</div>
        </q-btn>
      </q-card-actions>
    </q-card>

      <div style="margin-bottom: 200px;"></div>

    </template>
  </app-page>
</template>

<script setup>
import { useLoginXenterStore } from 'src/stores/xenter/auth/login'
// import HeaderMain from './HeaderMain.vue'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useXenterAppStore } from 'src/stores/xenter'
import { useQuasar } from 'quasar'

// eslint-disable-next-line no-unused-vars
const app = useXenterAppStore()
const $q = useQuasar()
const auth = useLoginXenterStore()
// eslint-disable-next-line no-unused-vars
const user = computed(() => {
  return auth?.user
})

const stars = ref(4.5)
const router = useRouter()
onMounted(() => {
  console.log('q', $q)
  console.log('user', user.value)
})

// eslint-disable-next-line no-unused-vars
function logout () {
  console.log('logout')
  auth.logout().then(() => {
    router.replace({ path: '/auth' })
  })
}
</script>
