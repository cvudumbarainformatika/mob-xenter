<template>
  <div class="q-pt-xs q-px-xs">
    <div ref="gauge" :style="`width:100%; height: ${props.height}px;`"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, computed } from 'vue'
import { colors } from 'quasar'
// import dark from 'src/assets/themecharts/dark2.json'
// import { useAppStore } from 'src/stores/app'
const gauge = ref(null)
const { getPaletteColor } = colors

const props = defineProps({
  height: {
    type: Number,
    default: 150
  },
  value: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: 'Pendapatan'
  },
  color: {
    type: String,
    default: 'primary'
  },
  titleColor: {
    type: String,
    default: 'white'
  }
})

const newValue = computed(() => isNaN(props.value) ? 0 : parseInt(props.value))

const opt = ref(
  {
    color: [getPaletteColor(props.color)],
    tooltip: {
      formatter: '{a} <br/>{b}  {c}%'
    },
    series: [
      {
        name: props.name,
        type: 'gauge',
        size: 8,
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: true,
          roundCap: false,
          clip: false,
          itemStyle: {
            borderWidth: 0
          }
        },
        detail: {
          valueAnimation: true,
          width: 40,
          height: 14,
          fontSize: 20,
          color: getPaletteColor(props.titleColor),
          borderRadius: 3,
          offsetCenter: ['0%', '10%'],
          formatter: '{value}%'
        },
        title: {
          fontSize: 10
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10
        },
        axisTick: {
          show: false

        },
        axisLabel: {
          show: false,
          distance: 50
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [[
              1, '#E6EBF8'
            ]]
          }
        },
        data: [
          {
            value: newValue
          }
        ]
      }
    ]
  }
)

onMounted(() => {
  // echarts.registerTheme('dark', dark)
  const echart = echarts.init(gauge.value)

  echart.setOption(opt.value)
})

</script>
