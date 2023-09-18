<template>
  <div ref="macarons" :class="props.className" :style="{ height:props.height, width: props.width }" />
</template>

<script setup lang="ts">
import echarts from 'echarts'
import { ref, onMounted } from 'vue'
import 'echarts/theme/macarons'
const props = defineProps({
  className: {
    type: String,
    default: 'chart'
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '300px'
  }
})
let chart = ref(null)
let macarons = ref(null)
const animationDuration = 6000
const initChart = () => {
  chart.value = echarts.init(macarons.value, 'macarons') as any
    (chart as any).value.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: 10,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        }
      }],
      series: [{
        name: 'pageA',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [79, 52, 200, 334, 390, 330, 220],
        animationDuration
      }, {
        name: 'pageB',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [80, 52, 200, 334, 390, 330, 220],
        animationDuration
      }, {
        name: 'pageC',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [30, 52, 200, 334, 390, 330, 220],
        animationDuration
      }]
    })
}
onMounted(()=>{
  initChart()
})
</script>
