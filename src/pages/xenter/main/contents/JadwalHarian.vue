<template>
  <q-card flat square class="q-pa-md">
    <div class="f-12">Jadwal Hari ini ⏰</div>
  </q-card>
  <div class="bg-grey-4 q-pa-sm">
    <div v-if="currentJadwal?.status === '2'" class="row q-col-gutter-sm ">
      <div class="col-6">
        <q-card flat bordered>
          <div class="column flex-center q-pa-md">
            <div class="f-14">🕘 {{currentJadwal?.masuk}} </div>
            <div class="f-12 q-mt-sm">Jam Masuk</div>
          </div>
        </q-card>
      </div>
      <div class="col-6">
        <q-card flat bordered>
          <div class="column flex-center q-pa-md">
            <div class="f-14">🕘 {{ currentJadwal?.pulang }} </div>
            <div class="f-12 q-mt-sm">Jam Pulang</div>
          </div>
        </q-card>
      </div>
    </div>
    <div v-else>
      <q-card flat bordered class="text-red" style="border: 1px solid red;">
        <div class="column flex-center q-pa-md">
          <div class="f-14">☕ Libur </div>
          <div class="f-12 q-mt-sm">Tidak Ada Jadwal</div>
        </div>
      </q-card>

    </div>
  </div>
</template>

<script setup>
defineProps({
  currentJadwal: {
    type: Object,
    default: null
  }
})
</script>

<style lang="scss" scoped>
</style>
