<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6 q-mb-md">{{ title }} {{ namabulan(bulan) }} {{ tahun }}</div>
      <v-chart
        class="chart"
        :option="chartOption"
        autoresize
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'
import VChart from 'vue-echarts'

// props biar bisa dipakai ulang di tempat lain
const props = defineProps({
  title: {
    type: String,
    default: 'Statistik Penunjang Bulan'
  },
  bulan: {
    type: String,
    default: '01'
  },
  tahun: {
    type: String,
    default: '2021'
  },
  data: {
    type: Object,
    default: () => ({
      laborat: 20,
      radiologi: 10,
      hemodialisa: 5
    })
  }
})

const chartOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'horizontal',
    bottom: 10
  },
  series: [
    {
      name: 'Penunjang',
      type: 'pie',
      radius: '60%',
      data: [
        { value: props.data.laborat, name: 'Laborat' },
        { value: props.data.radiologi, name: 'Radiologi' },
        { value: props.data.hemodialisa, name: 'Hemodialisa' }
      ],
      label: {
        formatter: '{b}\n{c} ({d}%)'
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))

function namabulan (bulan) {
  const bulans = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  return bulans[bulan - 1]
}
</script>

<style scoped>
.chart {
  height: 400px;
  width: 100%;
}
</style>
