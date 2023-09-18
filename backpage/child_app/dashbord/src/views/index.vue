<template>
  <div :class="classObj" class="dashboard-container">
    <div class="main-container">
      <component :is="adminDashboard" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import adminDashboard from "./admin/index.vue"
import { ref, computed } from 'vue'
let sidebarOpened = ref(true)
let device = ref('desktop')
const  classObj = computed(()=>{
  return {
    hideSidebar: !sidebarOpened.value,
    openSidebar: sidebarOpened.value,
    withoutAnimation: "false",
    mobile: device.value === "mobile"
  }
})
</script>
