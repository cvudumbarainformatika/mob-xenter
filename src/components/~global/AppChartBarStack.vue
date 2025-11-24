<template>
  <div class="q-pt-md q-px-md">
    <div ref="bar" :style="`width:100%; height: ${props.height}px;`"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import dark from 'src/assets/themecharts/dark2.json'
// import { useAppStore } from 'src/stores/app'
const bar = ref(null)

// const app = useAppStore()
// const legendPos = ref(height.value - 80)

const props = defineProps({
  height: {
    type: Number,
    default: 300
  }
})

onMounted(() => {
  echarts.registerTheme('dark', dark)
  const echart = echarts.init(bar.value, 'dark')

  echart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
      // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    series: [
      {
        name: 'Direct',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [320, 302, 301, 334, 390, 330, 320]
      },
      {
        name: 'Mail Ad',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Affiliate Ad',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ad',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [150, 212, 201, 154, 190, 330, 410]
      },
      {
        name: 'Search Engine',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320]
      }
    ]
  })
})
</script>
