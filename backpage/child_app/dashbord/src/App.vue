<script setup lang="ts">
import { RouterView } from 'vue-router'
import { dashbordStore} from '@/stores/dashbord'
const dataListener = (data: any) => {
  if(data.type === 'layoutSize') {
    // dashabordIns.updateLayoutSize(data.size)
  }
  if(data.type === 'layoutTheme') {
    // dashabordIns.updateLayoutSize(data.theme)
  }
  console.log('全局数据,变大', data)
}
// 监听数据变化
(window as any).microApp.addGlobalDataListener(dataListener, false)
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
