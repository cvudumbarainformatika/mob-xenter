<template>
  <div class="full-width">
    <div v-for="(item, n) in items" :key="n">
      <q-card square class="q-my-xs" v-ripple.early @click="emits('clicked', item)">
        <q-card-section class="q-px-md q-py-sm">
          <div class="row items-center justify-between">
            <div class="col-auto column">
              <div class="text-weight-bold">{{item?.hari}}</div>
              <div class="f-10 q-pa-xs" :style="`border: 1px solid ${item?.kategory?.warna ?? 'red'}; border-radius: 20px;`">{{item?.kategory?.nama ?? 'LIBUR'}}</div>
            </div>
            <div v-if="item.kategory" class="col column text-right">
              <div class="f-10">Masuk : {{item?.masuk}}</div>
              <div class="f-10">Pulang : {{item?.pulang}}</div>
            </div>
            <div v-else class="col column text-right">
              <div class="f-12 text-weight-bold">LIBUR</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['clicked'])
</script>
