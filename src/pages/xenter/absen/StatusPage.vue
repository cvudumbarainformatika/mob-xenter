<template>
  <q-page class="page fit bg-grey-4 shadow-4">
    <div
      v-if="bisaLogin.includes(auth.user.email)"
      class="absolute-top full-height page-effect column shadow-4"
      :class="{ 'effect-left': hasLeaveFromHere }"
    >
      <div class="col-auto">
        <HeaderMain />
      </div>
      <!-- content -->
      <div class="col full-height relative-position">
        <div class="column full-height full-width absolute">
          <div class="col full-height">
            <div class="column flex-center text-center q-gutter-md">
              <div v-if="scheduleStorrage?.statusStorrage !== '1'">
                <!-- Waktu Saat Ini -->
                <div class="text-h4 text-weight-bold">{{ currentTime }}</div>
                <div class="text-h6 text-grey-7">{{ tanggalAbsen }}</div>

                <div v-if="cond === 'masuk'">
                  <q-icon
                    :name="hasAbsen === 'checkIn' ? 'verified' : 'notifications_active'"
                    :color="hasAbsen === 'checkIn' ? 'primary' : 'negative'"
                    :class="{ 'anim-shake': shouldAnimateBell }"
                    size="60px"
                  />
                  <div
                    class="f-12 text-weight-bold q-mt-md"
                    :class="hasAbsen === 'checkIn' ? 'text-primary' : 'text-negative'"
                  >
                    {{ hasAbsen === 'checkIn' ? 'Absensi Masuk Valid' : 'Saatnya Absen Masuk' }}
                  </div>
                  <div v-if="lateTimeMessage && hasAbsen !== 'checkIn'" class="text-negative q-mt-sm">
                    {{ lateTimeMessage }}
                  </div>
                </div>
                <div v-else-if="cond === 'pulang'">
                  <q-icon
                    :name="hasAbsen === 'checkOut' ? 'verified' : 'circle_notifications'"
                    :color="hasAbsen === 'checkOut' ? 'primary' : 'negative'"
                    :class="{ 'anim-shake': shouldAnimateBell }"
                    size="60px"
                  />
                  <div
                    class="f-12 text-weight-bold q-mt-md"
                    :class="hasAbsen === 'checkOut' ? 'text-primary' : 'text-negative'"
                  >
                    {{ hasAbsen === 'checkOut' ? 'Absensi Pulang Valid' : 'Saatnya Absen Pulang' }}
                  </div>
                  <div v-if="lateTimeMessage && hasAbsen !== 'checkOut'" class="text-negative q-mt-sm">
                    {{ lateTimeMessage }}
                  </div>
                </div>
                <div v-else>
                  <q-icon name="verified" color="teal" size="60px" />
                  <div class="f-12 text-weight-bold text-teal q-mt-md">Belum Ada Jadwal</div>
                </div>

                <!-- Informasi Jam Absen -->
                <div v-if="scheduleStorrage?.jamMasuk || scheduleStorrage?.jamPulang" class="q-mt-lg text-grey-8">
                  <div v-if="scheduleStorrage.jamMasuk">Jam Masuk: {{ scheduleStorrage.jamMasuk }}</div>
                  <div v-if="scheduleStorrage.jamPulang">Jam Pulang: {{ scheduleStorrage.jamPulang }}</div>
                </div>
              </div>
              <div v-else class="column flex-center">
                <q-icon name="local_cafe" color="primary" size="60px" />
                <div class="f-12 text-weight-bold text-primary q-mt-md">Tidak Ada Jadwal</div>
              </div>
            </div>
          </div>

          <div class="col-auto full-width">
            <q-card v-if="cond === 'masuk'" flat>
              <div v-if="hasAbsen !== 'checkIn'" class="row full-width">
                <q-btn class="col-6 q-py-md" color="dark" label="Scan Qr" square size="md" to="/absen/lihat-lokasi" />
                <q-btn class="col-6" color="teal" label="Scan Wajah" square size="md" />
              </div>
            </q-card>
            <q-card v-if="cond === 'pulang'" flat>
              <div v-if="hasAbsen !== 'checkOut'" class="row full-width">
                <q-btn class="col-6 q-py-md" color="dark" label="Scan Qr" square size="md" to="/absen/lihat-lokasi" />
                <q-btn class="col-6" color="teal" label="Scan Wajah" square size="md" />
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <router-view v-slot="{ Component }">
      <transition appear enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
        <component :is="Component" :key="cond" :kondisi="cond" :tanggal="tanggalAbsen" :jam="jam"
          :kategory="scheduleStorrage?.kategoryStorrage" />
      </transition>
    </router-view>
  </q-page>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import HeaderMain from './HeaderMain.vue'
import { useAbsenContext } from './absenContext'
import { useRoute } from 'vue-router'
import { useLoginXenterStore } from 'src/stores/xenter/auth/login'
import dayjs from 'dayjs'

const { cond, condAbsen, scheduleStorrage, start, tanggalAbsen, jam, setCondAbsen, $q } = useAbsenContext()

const hasLeaveFromHere = ref(false)
const route = useRoute()
const auth = useLoginXenterStore()

const bisaLogin = ref([
  '3574041305820002@app.com', 'sa@app.com', '3574031107840006@app.com', '3513176806880002@app.com'
])

const currentTime = ref(dayjs().format('HH:mm:ss'))
const lateTimeMessage = ref(null)
let timeInterval = null

onMounted(() => {
  hasLeaveFromHere.value = false
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  console.log('mounted local', bisaLogin.value.includes(auth.user.email))
  console.log('scheduleStorrage object:', scheduleStorrage) // Tambahan ini
})

onUnmounted(() => {
  console.log('unMounted')
  clearInterval(setTimer)
  clearInterval(timeInterval)
})

const setTimer = setInterval(start, 100) // Ini mungkin perlu diganti atau dipindahkan jika `start` tidak lagi membarui `jam`

const hasAbsen = computed(() => {
  return condAbsen.value
})

const shouldAnimateBell = computed(() => {
  console.log('--- shouldAnimateBell Debug ---')
  console.log('scheduleStorrage?.statusStorrage:', scheduleStorrage?.statusStorrage)
  console.log('cond.value:', cond.value)
  console.log('hasAbsen.value:', hasAbsen.value)
  console.log('scheduleStorrage?.jamMasuk:', scheduleStorrage?.jamMasuk)
  console.log('scheduleStorrage?.jamPulang:', scheduleStorrage?.jamPulang)

  if (scheduleStorrage?.statusStorrage === '1') {
    console.log('shouldAnimateBell: Tidak ada jadwal (statusStorrage === 1)')
    return false // Tidak ada jadwal
  }
  const now = dayjs()
  let targetTime = null

  if (cond.value === 'masuk' && hasAbsen.value !== 'checkIn' && scheduleStorrage?.jamMasuk) {
    targetTime = dayjs(tanggalAbsen.value + ' ' + scheduleStorrage.jamMasuk)
  } else if (cond.value === 'pulang' && hasAbsen.value !== 'checkOut' && scheduleStorrage?.jamPulang) {
    targetTime = dayjs(tanggalAbsen.value + ' ' + scheduleStorrage.jamPulang)
  }

  console.log('shouldAnimateBell: targetTime:', targetTime ? targetTime.format('HH:mm:ss') : 'null')
  console.log('shouldAnimateBell: now:', now.format('HH:mm:ss'))
  console.log('shouldAnimateBell: now.isAfter(targetTime):', targetTime ? now.isAfter(targetTime) : 'N/A')

  return targetTime && now.isAfter(targetTime)
})

const updateTime = () => {
  currentTime.value = dayjs().format('HH:mm:ss')
  calculateLateTime()
}

const calculateLateTime = () => {
  if (scheduleStorrage?.statusStorrage === '1') {
    lateTimeMessage.value = null
    return
  }

  const now = dayjs()
  let targetTime = null
  let absenType = null

  if (cond.value === 'masuk' && hasAbsen.value !== 'checkIn' && scheduleStorrage?.jamMasuk) {
    targetTime = dayjs(tanggalAbsen.value + ' ' + scheduleStorrage.jamMasuk)
    absenType = 'masuk'
  } else if (cond.value === 'pulang' && hasAbsen.value !== 'checkOut' && scheduleStorrage?.jamPulang) {
    targetTime = dayjs(tanggalAbsen.value + ' ' + scheduleStorrage.jamPulang)
    absenType = 'pulang'
  }
  console.log('calculateLateTime: targetTime:', targetTime ? targetTime.format('HH:mm:ss') : 'null')
  console.log('calculateLateTime: now:', now.format('HH:mm:ss'))
  console.log('calculateLateTime: now.isAfter(targetTime):', targetTime ? now.isAfter(targetTime) : 'N/A')

  if (targetTime && now.isAfter(targetTime)) {
    const diffSeconds = now.diff(targetTime, 'second')
    const hours = Math.floor(diffSeconds / 3600)
    const minutes = Math.floor((diffSeconds % 3600) / 60)
    const seconds = diffSeconds % 60

    let message = ''
    if (hours > 0) message += `${hours} jam `
    if (minutes > 0) message += `${minutes} menit `
    message += `${seconds} detik`

    lateTimeMessage.value = `Terlambat ${absenType} ${message}`
  } else if (targetTime && now.isBefore(targetTime)) {
    const diffSeconds = targetTime.diff(now, 'second')
    const hours = Math.floor(diffSeconds / 3600)
    const minutes = Math.floor((diffSeconds % 3600) / 60)
    const seconds = diffSeconds % 60

    let message = ''
    if (hours > 0) message += `${hours} jam `
    if (minutes > 0) message += `${minutes} menit `
    message += `${seconds} detik`

    lateTimeMessage.value = `${absenType} dalam ${message}`
  } else {
    lateTimeMessage.value = null
  }
}

watch(route, (nw) => {
  if (nw.path === '/absen') {
    setCondAbsen($q.localStorage.getItem('condAbsen'))
  }
})
</script>

<style scoped>
.page {
  background-image: url('src/assets/images/background.jpg');
  background-size: cover;
  background-position: center;
}

.f-12 {
  font-size: 0.75rem;
}

/* Animasi Shake */
.anim-shake {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both infinite;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
