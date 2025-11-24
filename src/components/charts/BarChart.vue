<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  title: String,
  categories: Array,
  seriesData: Array
})

const chartRef = ref()
let chartInstance = null

onMounted(() => {
  chartInstance = echarts.init(chartRef.value)

  chartInstance.setOption({
    title: { text: props.title },
    xAxis: { type: 'category', data: props.categories },
    yAxis: { type: 'value' },
    series: props.seriesData.map(item => ({
      name: item.name,
      type: 'bar',
      data: item.data
    }))
  })
})
</script>
