<template>
  <div v-for="(item, n) in items" :key="n">
    <q-card v-if="item?.status" class="q-mb-xs" flat>
      <q-card-section class="q-pa-sm">
        <div class="row justify-between items-center">
          <div class="row items-center">
            <div class="text-weight-thin text-h4 text-grey">{{ item?.tanggal?.slice(-2) }}</div>
            <div class="q-ml-xs">
              <div>{{ dayjs(item?.tanggal + ' 07:00').locale("id").format("dddd") }}</div>
              <div class="f-10">{{ dayjs(item?.tanggal + ' 07:00').locale("id").format("MMMM YYYY") }}</div>
            </div>
          </div>
          <div class="row text-right">
            <div v-if="item?.status==='MSK'" class="">
              <div class="f-12">AM : {{ item?.masuk }}</div>
              <div class="f-12" :class="{'text-negative': !item?.pulang}">AP : {{ item?.pulang || 'TAP' }}</div>
            </div>
            <div v-if="item?.status==='CB'" class="text-primary">
              <div class="f-14">CB</div>
            </div>
            <div v-if="item?.status==='A'" class="text-negative">
              <div class="f-14">ALPHA</div>
            </div>
            <div v-if="item?.status==='LIBUR'" class="text-negative">
              <div class="f-14">LIBUR</div>
            </div>
            <div v-if="item?.status==='IJIN'" class="text-info">
              <div class="f-14">IJIN</div>
            </div>
            <div v-if="item?.status==='WAIT'" class="text-info">
              <div class="f-14">waiting ... </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/id'
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>
