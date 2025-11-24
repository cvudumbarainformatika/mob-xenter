<template>
  <q-layout view="lHh Lpr lff">

    <!-- <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header> -->

    <left-draw v-model="leftDrawerOpen"  />

    <q-page-container  class="bg-grey-2">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import LeftDraw from './comp/LeftDraw.vue'

const leftDrawerOpen = ref(false)
// function toggleLeftDrawer () {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }
</script>
