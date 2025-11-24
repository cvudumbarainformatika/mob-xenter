<template>
  <div class="row justify-between items-center bg-primary text-white q-px-sm q-py-sm">
    <div class="kanan">
      <div class="row items-center">
        <!-- <q-avatar size="32px" color="white">
          <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar> -->
        <app-avatar :user="user" width="32px"></app-avatar>
        <div class="column q-ml-sm">
          <div class="f-10">Selamat Datang, 👋</div>
          <div class="f-12">{{user?.nama}}</div>
        </div>
      </div>
    </div>
    <div class="kiri">
      <q-icon name="eva-bell-outline" size="sm"></q-icon>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    default: null
  }
})
</script>
