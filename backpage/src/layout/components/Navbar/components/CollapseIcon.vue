<template>
    <div class="collapsed" @click="toggleSideBar">
      <MenuUnfoldOutlined v-show="isCollapse" id="isCollapse" />
      <MenuFoldOutlined v-show="!isCollapse" id="isCollapse" /> 
  </div>
</template>
<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { navbarStore } from '@/stores/navbar'
import {computed} from 'vue'
const navbarStoreIns = navbarStore()
const toggleSideBar = () => {
  navbarStoreIns.TOGGLE_SIDEBAR()
}
const isCollapse = computed(() => {
  return navbarStoreIns.sidebar.opened
})
</script>