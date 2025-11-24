<template>
  <div class="echart-container">
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { computed } from 'vue'

// Register ECharts components
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

const props = defineProps({
  title: {
    type: String,
    default: 'ECharts Demo'
  },
  xAxisData: {
    type: Array,
    default: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  series: {
    type: Array,
    default: () => [
      { name: 'Forest', data: [320, 332, 301, 334, 390] },
      { name: 'Steppe', data: [220, 182, 191, 234, 290] },
      { name: 'Desert', data: [150, 232, 201, 154, 190] },
      { name: 'Wetland', data: [98, 77, 101, 99, 40] }
    ]
  },
  horizontal: {
    type: Boolean,
    default: false
  },
  show: {
    type: Boolean,
    default: false
  },
  fontSize: {
    type: Number,
    default: 16
  }

})
// Label config seperti di koding awal
const labelOption = {
  show: props.show,
  position: 'insideBottom',
  distance: 15,
  align: 'left',
  verticalAlign: 'middle',
  rotate: 90,
  formatter: '{c}  {name|{a}}',
  fontSize: props.fontSize,
  rich: {
    name: {}
  }
}

const chartOption = computed(() => {
  const baseConfig = {
    title: {
      text: props.title,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: props.series.map(s => s.name),
      top: '30px'
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  }
  // Horizontal?
  const xAxis = props.horizontal
    ? { type: 'value' }
    : { type: 'category', data: props.xAxisData }

  const yAxis = props.horizontal
    ? {
        type: 'category',
        data: props.xAxisData,
        axisLabel: {
          width: 120,
          overflow: 'truncate',
          interval: 0
        }
      }
    : { type: 'value' }

  return {
    ...baseConfig,
    xAxis,
    yAxis,
    series: props.series.map((s, idx) => ({
      name: s.name,
      type: 'bar',
      data: s.data,
      barGap: idx === 0 ? 0 : undefined,
      label: labelOption,
      emphasis: { focus: 'series' }
    }))
  }
})

// Determine if we're using a pie chart
// const isPieChart = computed(() => {
//   return props.series.length > 0 && props.series[0].type === 'pie'
// })

// Chart options
// const chartOption = computed(() => {
//   // Base configuration
//   const baseConfig = {
//     title: {
//       text: props.title,
//       left: 'center'
//     },
//     tooltip: {
//       trigger: isPieChart.value ? 'item' : 'axis'
//     },
//     legend: {
//       top: '30px'
//     }
//   }

//   // For pie charts
//   if (isPieChart.value) {
//     return {
//       ...baseConfig,
//       series: props.series
//     }
//   }

//   // For horizontal bar charts
//   if (props.horizontal && !isPieChart.value) {
//     return {
//       ...baseConfig,
//       grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '3%',
//         containLabel: true
//       },
//       yAxis: {
//         type: 'category',
//         data: props.xAxisData,
//         axisLabel: {
//           width: 120,
//           overflow: 'truncate',
//           interval: 0
//         }
//       },
//       xAxis: {
//         type: 'value'
//       },
//       series: props.series.map((item) => ({
//         ...item,
//         type: 'bar'
//       }))
//     }
//   }

//   // For regular bar/line charts
//   return {
//     ...baseConfig,
//     grid: {
//       left: '3%',
//       right: '4%',
//       bottom: '3%',
//       containLabel: true
//     },
//     xAxis: {
//       type: 'category',
//       data: props.xAxisData
//     },
//     yAxis: {
//       type: 'value'
//     },
//     series: props.series
//   }
// })
</script>

<style scoped>
.echart-container {
  height: 350px;
  width: 100%;
}
.chart {
  height: 100%;
  width: 100%;
}
</style>
