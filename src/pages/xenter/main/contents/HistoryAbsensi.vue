<template>
  <q-card flat square class="q-pa-md">
    <div class="f-12">Absensi Bulan Ini 📅</div>
  </q-card>
  <div class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-4">
        <card-rekap txt="Hadir" icon="launch" :qty="rekap.HADIR" />
      </div>
      <div class="col-4">
        <card-rekap txt="Sakit" icon="medical_services" :qty="rekap.SAKIT" />
      </div>
      <div class="col-4">
        <card-rekap txt="Izin" icon="delivery_dining" :qty="rekap.IJIN" />
      </div>
      <div class="col-4">
        <card-rekap txt="Cuti" icon="send_time_extension" :qty="rekap.CUTI" />
      </div>
      <div class="col-4">
        <card-rekap txt="DL" icon="delivery_dining" :qty="rekap.DL" />
      </div>
      <div class="col-4">
        <card-rekap txt="Dspen" icon="earbuds" :qty="rekap.DISPEN" />
      </div>
      <div class="col-4">
        <card-rekap txt="Alpha" icon="spellcheck" :qty="rekap.A" />
      </div>
      <div class="col-8">
        <card-rekap txt="Terlambat" icon="sensor_occupied" :qty="rekap.TERLAMBAT" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CardRekap from './comphistory/CardRekap.vue'
import { useRekapAbsen } from 'src/stores/xenter/absensi/rekap'

const rekap = useRekapAbsen()
</script>

<style lang="scss" scoped>
</style>
