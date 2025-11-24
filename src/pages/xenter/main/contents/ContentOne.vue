<template>
  <q-card flat class="q-pa-md">
    <div class="f-12">All Apps 🚀</div>
  </q-card>
  <div class="row no-wrap x-scroll bg-grey-4">
    <div v-for="(item,n) in menus" :key="n" style="" class="q-my-md q-mx-sm">
      <q-card style="width: 70px; height: 70px;" class="bg-white text-dark " v-ripple @click="goTo(item.url)">
        <div class="column flex-center full-height full-width items-center">
          <q-icon :name="item.icon" size="30px" :color="item.color"/>
          <div class="f-10">{{item.name}}</div>
      </div>
    </q-card>
    </div>
    <!-- <q-dialog
      v-model="dialog"
      persistent
      :maximized="true"
      transition-show="slide-right"
      transition-hide="slide-left"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const menus = ref([
  { name: 'e-Xenter', icon: 'ion-flashlight', color: 'primary', url: '/main/scan-e-xenter' },
  { name: 'si-Teman', icon: 'health_and_safety', color: 'accent', url: '/main/scan-e-xenter' },
  { name: 'e-Nadi', icon: 'monitor_heart', color: 'negative', url: '/main/scan-e-xenter' },
  { name: 'e-Resep', icon: 'developer_board', color: 'teal', url: '/main/scan-e-xenter' },
  { name: 'e-Telem', icon: 'cast_connected', color: 'info', url: '/main/scan-e-xenter' },
  { name: 'e-Logbook', icon: 'note_alt', color: 'orange', url: '/main/scan-e-xenter' }
])

// eslint-disable-next-line no-unused-vars
const dialog = ref(false)

function goTo (path) {
  router.push({ path })
}
</script>

<style lang="scss" scoped>
.x-scroll {
  height: 100px;
  width: 100%;
  overflow-x: scroll; /* Add the ability to scroll */
}
/* Hide scrollbar for Chrome, Safari and Opera */
.x-scroll::-webkit-scrollbar {
    display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.x-scroll {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
