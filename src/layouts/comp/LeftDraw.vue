<template>
  <q-drawer show-if-above side="left" bordered :width="280" :breakpoint="400" class="bg-dark text-grey-2">
      <!-- drawer content -->
      <!-- <div class="q-pa-lg">
        <div class="_judul_page text-weight-bold text-h6">Dashboard Executive</div>
        <div class="_judul_page text-caption text-grey">Dashboard Khusus Direktur</div>
        <div class="_judul_page text-caption">UOBK RSUD MOHAMAD SALEH KOTA PROBOLINGGO</div>
      </div> -->

      <!-- <q-separator></q-separator> -->

      <q-scroll-area
        :style="`height: calc(100% - ${height}px); margin-top:${height}px;` "

      >

        <q-separator />
        <!-- <div class="q-pa-md">
          <div class="text-caption">Per tanggal</div>
          <q-date
            v-model="date"
            mask="YYYY-MM-DD"
            color="dark"
          />
        </div> -->
        <q-list padding class="text-grey-7">
          <q-item v-for="(item, i) in menus"
            :to="item.url"
            exact
            :key="i" clickable v-ripple
            >
            <q-item-section avatar>
              <q-icon class="__icon" :name="item.icon" />
            </q-item-section>
            <q-item-section class="__label" >{{item.nama}}</q-item-section>
          </q-item>
        </q-list>

      </q-scroll-area>
      <div class="absolute-top bg-primary text-white" :style="`height: ${height}px;` ">
          <div class="absolute-bottom bg-transparent  q-pa-md">
            <div class="_judul_page text-weight-bold text-h6">Dashboard Executive</div>
            <!-- <div class="_judul_page text-caption text-grey">Dashboard Khusus Direktur</div> -->
            <div class="_judul_page f-12 text-grey-5  ">UOBK RSUD MOHAMAD SALEH KOTA PROBOLINGGO</div>
          </div>
      </div>
      <div class="absolute-bottom q-mb-sm" >
          <!-- <q-separator class="bg-grey-8" /> -->
          <div class="q-pa-md">
            <q-card class="my-card text-dark">
              <q-card-section>
                <div class="row items-center justify-between">
                  <q-btn @click="app.setCurrentYear(year - 1)" flat size="sm" round color="dark" icon="chevron_left" />
                  <div class="text-weight-bold" >{{year}}</div>
                  <q-btn @click="app.setCurrentYear(year + 1)" flat size="sm" round color="dark" icon="chevron_right" />
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="row items-center q-col-gutter-md">
                  <div v-for="(item, i) in bulans" :key="i" class="col-12 col-md-4 col-lg-4 col-xl-4 col-sm-4 col-xs-4">
                    <!-- {{ month }} -->
                    <q-btn @click="app.setCurrentMonth(i+1)" size="sm" class="glossy full-width" dense :color="(month-1) === i ? 'primary': 'dark'" :label="item.substring(0,3)" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
      </div>
    </q-drawer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import useDate from 'src/utility/useDate.js'
import { useRouter } from 'vue-router'
import { useAppStore } from 'src/stores/app'

const height = ref(110)
const { dateDbFormat } = useDate()
const date = ref(dateDbFormat(new Date()))
const menus = ref([
  { nama: 'Kepegawaian', url: '/kepegawaian', icon: 'people' },
  { nama: 'Layanan', url: '/layanan', icon: 'support_agent' },
  { nama: 'Rekam Medik', url: '/rekammedik', icon: 'report' },
  { nama: 'Keuangan', url: '/keuangan', icon: 'dvr' },
  { nama: 'Kinerja', url: '/kinerja', icon: 'assignment_ind' }
  // { nama: 'Sarpras', url: '/sarpras', icon: 'store' }
])

// const active = ref('Keuangan')
const month = computed(() => app.currentMonth)
const year = computed(() => app.currentYear)
const router = useRouter()
const bulans = computed(() => app.monts)

const app = useAppStore()
// const dateOpen = ref(true)

// function goTo (item) {
//   active.value = item.nama
//   router.push(item.url)
// }

console.log(date)
console.log(router)

onMounted(() => {
  // app.setCurrentMonth()
  // app.setCurrentYear()
})
</script>

<style lang="scss" scoped>
.url-active {
  color:black;
}

.q-item.q-router-link--active, .q-item--active {
  .__icon {
    color:$primary
  }
  .__label {
    color: white;
  }
}
</style>
