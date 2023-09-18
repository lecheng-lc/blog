<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted,  onUpdated} from 'vue'
onMounted(()=>{
  console.log(888811)
})
onUpdated(() => {
  console.log(11233888811)
})
</script>

<template>
  <header>
    <div class="wrapper">
      我是文档管理
      <input type="text">
      <router-link to="/about">关于</router-link>
    </div>
  </header>
  <RouterView />
</template>
<style scoped>
</style>
