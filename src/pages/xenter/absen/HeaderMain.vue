<template>
  <div class="row justify-between items-center bg-white text-dark q-px-sm q-py-sm">
    <div class="kiri">
      <div class="row items-center">
        <q-btn flat icon="close" dense round size="md" to="/" />
        <div class="column q-ml-sm">
          <div class="f-12 text-weight-bold">Status Absen</div>
        </div>
      </div>
    </div>
    <div class="kanan">
      <q-icon name="info_outline" size="md"/>
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
