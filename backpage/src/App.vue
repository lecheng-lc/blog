<template>
  <a-config-provider
    :theme="{
      algorithm: currentTheme,
    }"
  >
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</a-config-provider>
</template>
<script lang="ts" setup>
import { theme } from 'ant-design-vue';
 import { settingsStore } from './stores/setting'
 import useTheme from '@/hooks/useTheme'
 import { watchEffect, computed } from 'vue'
 const settingsStoreIns = settingsStore()
 const currentTheme = computed(()=> {
  return settingsStoreIns.themeConfig.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
 })
 watchEffect(()=>{
    useTheme(settingsStoreIns.themeConfig)
 })
</script>