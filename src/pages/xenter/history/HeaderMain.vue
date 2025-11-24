<template>
  <div class="row justify-between items-center bg-primary text-white q-px-sm q-py-sm">
    <div class="kanan">
      <div class="row items-center">
        <q-btn flat round icon="close" size="sm"></q-btn>
        <div>
          <div>History Absensi</div>
          <div class="f-10">Bulan {{ date?.format('MMMM YYYY') }}</div>
        </div>
      </div>
    </div>
    <div class="kiri">
      <div class="row">
        <q-btn flat round icon="arrow_back_ios" size="sm" @click="emits('prevMonth')" />
        <q-btn flat round icon="arrow_forward_ios" size="sm" @click="emits('nextMonth')" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    default: null
  },
  date: {
    type: [Object, String, Function],
    default: null
  }
})

const emits = defineEmits(['prevMonth', 'nextMonth'])
</script>
