<template>
  <div>
    <micro-app keep-alive :name="urlPath" :url="targetUrl"  iframe></micro-app>
  </div>
</template>
<script lang="ts" setup>
import {map} from '../../../../publicMethods/urlMap'
import { useRoute } from 'vue-router';
import { watch, ref, computed} from 'vue'
const Route = useRoute()
const urlPath = ref('dashbord')
const targetUrl = computed(() => {
  const url = urlPath.value
  console.log(map[url as keyof typeof  map])
  // console.log(8888)
  return map[url as keyof typeof  map] 
  // return ' http://localhost:8092'
  // return `http://127.0.0.1:8091/admin/dashbord`
  // return 'http://172.31.10.10:8091'
})
watch(() => Route.path, (newPath: string) => {
  urlPath.value = newPath
},
  { immediate: true }
)
</script>
<style>

</style>