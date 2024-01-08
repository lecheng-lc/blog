
<template>
  <div :class="classObj" class="backUpData">
    <div class="main-container">
      <a-row class="dr-datatable">
        <a-col :span="24">
          <!-- <TopBar type="contentTag" :pageInfo="contentTagList.pageInfo"></TopBar> -->
          <DataTable @change="renderPageList" :dataList="contentTagList.docs" :pageInfo="contentTagList.pageInfo">
          </DataTable>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import DataTable from './components/DataTable.vue'
import TagForm from './components/TagForm.vue';
import TopBar from '@/components/TopBar.vue';
// import Pagination from '@/components/Pagination.vue'
import { initEvent } from "@root/publicMethods/events";
import { computed, ref, onMounted } from 'vue'
import { contentTagStore } from '@/stores/contentTag';
const contentTagStoreIns = contentTagStore()
const contentTagList = computed(() => {
  return contentTagStoreIns.tagList
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
  let searchkey = contentTagList.value.pageInfo ? contentTagList.value.pageInfo.searchkey : ''
  let targetCurrent = current
  contentTagStoreIns.getContentTagList({
    current: targetCurrent,
    pageSize,
    searchkey
  })
}
onMounted(() => {
  // @todo initEvent(this)
  contentTagStoreIns.getContentTagList({})
})
</script>@/stores/contenttag