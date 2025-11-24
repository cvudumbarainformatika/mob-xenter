<template>
  <q-page class="page fit bg-grey-4 shadow-4" >
    <div v-if="bisaLogin.includes(auth.user.email)" class="absolute-top full-height page-effect column shadow-4" :class="{'effect-left': hasLeaveFromHere}">
      <div class="col-auto">
        <HeaderMain />
      </div>
      <!-- content -->
      <div  class="col full-height relative-position">
        <div class="column full-height full-width absolute">
          <div class="col full-height">
            <div class="column full-height flex-center">
              <div v-if="scheduleStorrage?.statusStorrage !== '1'">
                <div v-if="cond==='masuk'" class="column flex-center">
                  <q-icon :name="hasAbsen==='checkIn'?'verified':'notifications_active' " :color="hasAbsen==='checkIn'?'primary':'negative'" size="60px" />
                  <div class="f-12 text-weight-bold q-mt-md"
                    :class="hasAbsen==='checkIn'?'primary':'negative'"
                  >{{ hasAbsen==='checkIn'?'Absensi Masuk Valid':'Saatnya Absen' }}</div>
                </div>
                <div v-else-if="cond==='pulang'" class="column flex-center">
                  <q-icon :name="hasAbsen==='checkOut'?'verified':'circle_notifications' " :color="hasAbsen==='checkOut'?'primary':'negative'" size="60px" />
                  <div class="f-12 text-weight-bold q-mt-md"
                  :class="hasAbsen==='checkOut'?'primary':'negative'"
                  >{{ hasAbsen==='checkOut'?'Absensi Pulang Valid':'Saatnya Pulang' }}</div>
                </div>
                <div v-else class="column flex-center">
                  <q-icon name="verified" color="teal" size="60px" />
                  <div class="f-12 text-weight-bold text-teal q-mt-md">Belum Ada Jadwal</div>
                </div>

                <!-- <q-btn @click="saveStore('idle')">hapus local</q-btn> -->
              </div>
              <div v-else class="column flex-center">
                <q-icon name="local_cafe" color="primary" size="60px" />
                  <div class="f-12 text-weight-bold text-primary q-mt-md">Tidak Ada Jadwal</div>
              </div>
              <!-- {{ tgl }} -->
            </div>
          </div>

          <div  class="col-auto full-width" >
            <q-card v-if="cond==='masuk'" flat>
              <div v-if="hasAbsen !== 'checkIn'" class="row full-width">
                <q-btn class="col-6 q-py-md" color="dark" label="Scan Qr" square size="md" to="/absen/lihat-lokasi"/>
                <q-btn class="col-6 " color="teal" label="Scan Wajah" square size="md"/>
              </div>
            </q-card>
            <q-card v-if="cond==='pulang'" flat>
              <div v-if="hasAbsen !== 'checkOut'" class="row full-width">
                <q-btn class="col-6 q-py-md" color="dark" label="Scan Qr" square size="md" to="/absen/lihat-lokasi"/>
                <q-btn class="col-6 " color="teal" label="Scan Wajah" square size="md"/>
              </div>
            </q-card>
            <!-- <q-card v-else flat>
              <div class="row full-width">
                <q-btn class="col-6 q-py-md" color="dark" label="Scan Qr" square size="md" to="/absen/lihat-lokasi"/>
                <q-btn class="col-6 " color="teal" label="Scan Wajah" square size="md"/>
              </div>
            </q-card> -->
          </div>
        </div>
      </div>
    </div>

    <router-view
      v-slot="{ Component }"
      >
      <transition
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
          <component
            :is="Component"
            :key="cond"
            :kondisi="cond"
            :tanggal="tanggalAbsen"
            :jam="jam"
            :kategory="scheduleStorrage?.kategoryStorrage"
          />
      </transition>
    </router-view>

  </q-page>

</template>

<script setup>
// import { useDater } from 'src/composable/dater'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import HeaderMain from './HeaderMain.vue'
// import { onUnmounted } from 'vue'

import { useAbsenContext } from './absenContext'
import { useRoute } from 'vue-router'
import { useLoginXenterStore } from 'src/stores/xenter/auth/login'

const { cond, condAbsen, scheduleStorrage, start, tanggalAbsen, jam, setCondAbsen, $q } = useAbsenContext()

const hasLeaveFromHere = ref(false)
const route = useRoute()

const auth = useLoginXenterStore()

// eslint-disable-next-line no-unused-vars
const bisaLogin = ref([
  '3574041305820002@app.com', 'sa@app.com', '3574031107840006@app.com', '3513176806880002@app.com'
])

onMounted(() => {
  hasLeaveFromHere.value = false
  // console.log('mounted local', condAbsen.value)
  console.log('mounted local', bisaLogin.value.includes(auth.user.email))
})

const setTimer = setInterval(start, 100)

onUnmounted(() => {
  console.log('unMounted')
  clearInterval(setTimer)
})

const hasAbsen = computed(() => {
  return condAbsen.value
})

watch(route, (nw) => {
  // console.log('n', nw.path)
  if (nw.path === '/absen') {
    setCondAbsen($q.localStorage.getItem('condAbsen'))
  }
})

// console.log(tgl.value)
// console.log(cond.value)
</script>
