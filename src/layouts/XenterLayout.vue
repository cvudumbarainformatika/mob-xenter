<template>
  <q-layout view="hHr LpR fFr">

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile" bordered>
      <!-- drawer content -->
    </q-drawer>
    <q-page-container >
      <router-view
        v-slot="{ Component }"
        class="transition"
      >
        <!-- <transition
          :name="transitionName" v-on:before-enter="debug" v-on:before-leave="debug"
        > -->
        <!-- <transition
          appear
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutRight"
        > -->
        <!-- <keep-alive> -->
          <component :is="Component" />
        <!-- </keep-alive> -->
        <!-- </transition> -->
      </router-view>
    </q-page-container>

      <transition
        appear
        enter-active-class="animated slideInUp slow"
        leave-active-class="animated fadeOutDown fast"
      >
      <q-footer v-if="route.meta.page >= 4 && route.meta.page <= 8">
        <BottomMenu :route="route" />

      </q-footer>
      </transition>
    <!-- </q-footer> -->

  </q-layout>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { useQuasar } from 'quasar'
import BottomMenu from './xentercomp/BottomMenu.vue'

import { onMounted, ref, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
// import { useXenterAppStore } from 'src/stores/xenter/index'

const transitionName = ref('')
const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const route = useRoute()
// const app = useXenterAppStore()

const $q = useQuasar()

// console.log(route.name)
// function debug (data) {
//   // debugger
//   // console.log(data)
// }

onMounted(() => {
  const obj = route.name
  changeDark(obj)
})

function changeDark (obj) {
  const pathName = ['login', 'register', 'input-password']
  // console.log('watcher', obj.name)
  if (pathName.includes(obj.name)) {
    $q.dark.set(false)
  } else {
    $q.dark.set(false)
  }
}

onBeforeRouteUpdate((to, from) => {
  // console.log('to', to.meta.page)
  // console.log('from', from.meta.page)
  transitionName.value = to.meta.page > from.meta.page ? 'prev' : 'next'
})

watch(route, (obj) => {
  // console.log('watcher', obj.name)
  changeDark(obj)
}, { deep: true })
</script>

<style lang="scss">

/* Transitions */

//slide
.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
}

.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}

// scale-slide

.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.85s ease;
}

.scale-slide-enter-from {
  left: -100%;
}

.scale-slide-enter-to {
  left: 0%;
}

.scale-slide-leave-from {
  transform: scale(1);
}

.scale-slide-leave-to {
  transform: scale(0.8);
}

.next-leave-to {
  animation: leaveToLeft 300ms both cubic-bezier(0.65, 0.84, 0.44, 1);
  z-index: 0;
}

.next-enter-to {
  animation: enterFromRight 300ms both cubic-bezier(0.65, 0.84, 0.44, 1);
  z-index: 1;
}

.prev-leave-to {
  animation: leaveToRight 300ms both cubic-bezier(0.65, 0.84, 0.44, 1);
  z-index: 1;
}

.prev-enter-to {
  animation: enterFromLeft 300ms both cubic-bezier(0.65, 0.84, 0.44, 1);
  z-index: 0;
}

@keyframes leaveToLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
    filter: brightness(0.8);
  }
}

@keyframes enterFromLeft {
  from {
    transform: translateX(-100%);
    filter: brightness(0.8);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes leaveToRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

@keyframes enterFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
