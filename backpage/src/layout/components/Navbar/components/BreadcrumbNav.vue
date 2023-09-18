<template>
  <div v-show="showBread">
    <a-breadcrumb :routes="breadRoutes">
      <template #itemRender="{ route }">
        <span v-if="!route.path">{{ route.breadcrumbName }}</span>
        <router-link v-else :to="route.path">{{ route.breadcrumbName }}</router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, } from 'vue-router'
import { watch, ref, computed } from 'vue'
import { userStore } from '@/stores/user'
import { settingsStore } from '@/stores/setting'
interface BreadRoutes {
  breadcrumbName: string | undefined
  children?: BreadRoutes[]
  path?: string
  name?: string
}
const settingsStoreIns = settingsStore()
const userStoreIns = userStore()
const Route = useRoute()
const routes = userStoreIns.routes as unknown as BreadRoutes[]
const breadRoutes = ref<BreadRoutes[]>([])
const showBread = computed(() => {
  return settingsStoreIns.themeConfig.breadcrumb
})

const matchArr = (urlRoutes: BreadRoutes[], name: string = '') => {
  const targetUrl = Route.path
  for (let i = 0; i < urlRoutes.length; i++) {
    if (urlRoutes[i].path === targetUrl) {
      if (name) {
        breadRoutes.value.push(
          {
            breadcrumbName: name,
          },
        )
      }
      breadRoutes.value.push({
        breadcrumbName: urlRoutes[i].name,
        path: urlRoutes[i].path
      })
    }
    if (urlRoutes[i]?.children) {
      matchArr(urlRoutes[i].children!, urlRoutes[i].name)
    }
  }
}

let matchedArr = Route.matched.filter((item) => {
  return item.meta.showInbreadcrumb
}
)
watch(() => Route.path,
  () => {
    breadRoutes.value = [{
      breadcrumbName: '首页',
      path: '/admin/dashbord'
    }]
    if (Route.path === '/admin/dashbord') return
    matchArr(routes)
  }, { immediate: true })

console.log(matchedArr)
</script>