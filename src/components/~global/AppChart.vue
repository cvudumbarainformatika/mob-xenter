<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import useRandom from 'src/utility/useRandom.js'
import dark from 'src/assets/themecharts/dark2.json'

const line = ref(null)
const data = ref([])

const { initialData, randomData } = useRandom(data)

initialData()

onMounted(() => {
  echarts.registerTheme('dark', dark)
  if (line.value !== null) {
    const echart = echarts.init(line.value, 'dark')
    echart.setOption({
      title: {
        text: 'Realisasi Data Pasien'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          return `${params[0].value[0]} : ${params[0].value[1]}`
        },
        axisPointer: {
          animation: false
        }
      },
      // legend: {
      //   data: ['Email']
      // },

      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },

      // DATA CONTENT
      xAxis: {
        type: 'time'
      },
      yAxis: {
        type: 'value',
        boundaryGap: false // [0, 'persen 0 sampai 100'] || false
      },
      series: [
        {
          type: 'line',
          data: data.value,
          smooth: true,
          showSymbol: false
        }
      ]

    })

    setInterval(() => {
      for (let i = 0; i < 5; i++) {
        data.value.shift()
        data.value.push(randomData())
      }

      echart.setOption({
        series: [
          {
            data: data.value
          }
        ]
      })
    }, 1000)
  }
})

</script>

<template>
  <div class="q-pa-md">
    <div ref="line" style="width:100%; height: 500px;"></div>
  </div>
</template>
