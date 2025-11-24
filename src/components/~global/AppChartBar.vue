<template>
  <div class="q-pt-md q-px-md">
    <div ref="bar" :style="`width:100%; height: ${props.height}px;`"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import dark from 'src/assets/themecharts/dark2.json'
import { useAppStore } from 'src/stores/app'
const bar = ref(null)

const app = useAppStore()
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
    title: {
      text: 'Pendapatan vs Belanja',
      subtext: 'Data Perbandingan antara Pendapatan dan Anggaran Dalam 1 tahun per bulan',
      padding: 3,
      textStyle: {
        fontSize: app.txtLg,
        fontFamily: 'Poppins',
        fontWeight: 'bold'
      },
      subtextStyle: {
        fontSize: app.txtMd,
        fontFamily: 'Poppins',
        fontWeight: 'normal'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#181C1F',
      textStyle: {
        fontSize: app.txtLg,
        fontFamily: 'Poppins',
        fontWeight: 'normal',
        color: '#f5f5f5'
      }
    },
    legend: {
      data: ['Pendapatan', 'Belanja'],
      // width: 350,
      left: 0,
      bottom: 10,
      itemWidth: 14,
      itemHeight: 14,
      borderRadius: 14,
      textStyle: {
        fontSize: app.txtLg,
        fontFamily: 'Poppins',
        fontWeight: 'normal'
      }
    },
    toolbox: {
      show: true,
      left: 'auto',
      top: 'auto',
      right: 0,
      bottom: 'auto',
      width: 'auto',
      height: 'auto',
      showTitle: false,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        // prettier-ignore
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Pendapatan',
        type: 'bar',
        itemStyle: {
          borderRadius: [10, 10, 0, 0]
        },
        barWidth: 8,
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
        ],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        }
        // markLine: {
        //   data: [{ type: 'average', name: 'Avg' }]
        // }
      },
      {
        name: 'Belanja',
        type: 'bar',
        itemStyle: {
          borderRadius: [10, 10, 0, 0]
        },
        barWidth: 8,
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        ],
        markPoint: {
          data: [
            { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
            { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
          ]
        }
        // markLine: {
        //   data: [{ type: 'average', name: 'Avg' }]
        // }
      }
    ]
  })
})
</script>
