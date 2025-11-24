<template>
  <div class="">
    <div ref="line" :style="`width:100%; height: ${height}px`"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers'
import { ref, onMounted } from 'vue'
import dark from 'src/assets/themecharts/dark2.json'
import { colors } from 'quasar'
// import { useAppStore } from 'src/stores/app'
const line = ref(null)
const { getPaletteColor } = colors

const props = defineProps({
  width: {
    type: Number,
    default: 100
  },
  height: {
    type: Number,
    default: 50
  },
  color1: {
    type: String,
    default: 'accent'
  },
  color2: {
    type: String,
    default: 'dark'
  },
  strokeColor: {
    type: String,
    default: 'accent'
  },
  strokeWidth: {
    type: Number,
    default: 3
  },
  dataX: {
    type: Array,
    default: () => [1, 2, 3, 4, 5, 6, 7]
  },
  dataY: {
    type: Array,
    default: () => [10, 9, 7, 2, 7, 6, 10]
  }
})

onMounted(() => {
  echarts.registerTheme('dark', dark)
  echarts.use([SVGRenderer, CanvasRenderer])
  const echart = echarts.init(line.value, 'dark', { renderer: 'svg' })

  echart.setOption({
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', getPaletteColor('primary')],
    title: {
      show: false,
      text: ''
    },
    tooltip: {
      trigger: 'axis',
      show: false
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      containLabel: false
    },
    xAxis: [
      {
        type: 'category',
        show: false,
        boundaryGap: false,
        data: props.dataX
      }
    ],
    yAxis: [
      {
        type: 'value',
        show: false
      }
    ],
    series: [
      {
        name: 'Line 5',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: props.strokeWidth,
          color: getPaletteColor(props.strokeColor)
        },
        showSymbol: false,
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: getPaletteColor(props.color1)
            },
            {
              offset: 1,
              color: getPaletteColor(props.color2)
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: props.dataY
      }
    ]
  })
})
</script>
