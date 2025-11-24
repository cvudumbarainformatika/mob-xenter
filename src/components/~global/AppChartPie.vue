<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import dark from 'src/assets/themecharts/dark.json'
// import useRandom from 'src/utility/useRandom.js'

const pie = ref(null)
// const data = ref([])
onMounted(() => {
  // const theme = JSON.parse(dark)
  echarts.registerTheme('dark', dark)
  const echart = echarts.init(pie.value, 'dark')

  console.log('chart pie', echarts)
  echart.setOption({
    title: {
      text: 'Pendapatan',
      subtext: 'Fake Data',
      left: 'center',
      top: 'top',
      textStyle: {
        fontSize: 14
      },
      subtextStyle: {
        fontSize: 10
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      left: 'auto',
      itemWidth: 18,
      itemHeight: 12,
      padding: 5,
      bottom: 10,
      textStyle: {
        fontSize: 10
      }
    },
    series: [
      {
        name: 'Pendapatan',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
})

</script>

<template>
  <div class="q-pa-md">
    <div ref="pie" style="width:100%; height: 300px;"></div>
  </div>
</template>
