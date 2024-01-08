
<template>
  <div :class="classObj" class="backUpData">
    <div class="main-container">
      <a-row class="dr-datatable">
        <a-col :span="24">
          <TopBar type="backUpData"></TopBar>
          <DataTable @change="renderPageList" :dataList="bakDataList.docs" :pageInfo="bakDataList.pageInfo"></DataTable>
          <!-- <Pagination :device="device" :pageInfo="bakDataList.pageInfo" pageType="backUpData"></Pagination> -->
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import DataTable from './components/DataTable.vue'
import TopBar from '@/components/TopBar.vue'
// import Pagination from '@/components/Pagination.vue'
import { initEvent } from "@root/publicMethods/events";
import { computed, ref, onMounted } from 'vue'
import { backupStore } from '@/stores/backup'
const backupStoreIns = backupStore()
const bakDataList = computed(() => {
  return backupStoreIns.bakDataList
})
const sidebarOpened = ref(true)
const device = ref('desktop')
const classObj = computed(() => {
  return {
    hideSidebar: !sidebarOpened.value,
    openSidebar: sidebarOpened.value,
    withoutAnimation: "false",
    mobile: device.value === "mobile"
  }
})
const renderPageList = (current: number = 1, pageSize: number = 10) => {
  let searchkey = bakDataList.value.pageInfo ? bakDataList.value.pageInfo.searchkey : ''
  let targetCurrent = current
  backupStoreIns.getBakDateList({
    current: targetCurrent,
    pageSize,
    searchkey
  })
}
onMounted(() => {
  // @todo initEvent(this)
  backupStoreIns.getBakDateList()
})
</script>