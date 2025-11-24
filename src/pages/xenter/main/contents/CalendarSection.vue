<template>
  <q-card flat square class="q-pa-md">
    <div class="f-12">Kalender Bulan ini ⏰</div>
  </q-card>
  <div class="row q-pa-sm bg-grey-4">
    <q-date
      v-model="tgl"
      flat
      bordered
      minimal
      mask="YYYY-MM-DD"
    />
  </div>
</template>

<script setup>
import useDate from 'src/utility/useDate'
import { onMounted, ref } from 'vue'

const { dateDbFormat } = useDate()

const tgl = ref('2019-02-01')
onMounted(() => {
  const d = new Date()
  tgl.value = dateDbFormat(d)
  // tgl.value = new Date()
})
</script>

<style lang="scss" scoped>
.q-date{
  width: 100% !important;
}
</style>
