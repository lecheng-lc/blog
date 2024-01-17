<template>
  <div :class="classObj" class="content">
    <div class="main-container">
      <!-- <DirectUser :targetEditor="adminUserInfo.targetEditor" :dialogState="directUserFormState" :ids="selectlist" />
      <DraftTable :dialogState="draftContentDialog" />
      <MoveCate :dialogState="moveCateFormState" :ids="selectlist" /> -->
      <a-row class="dr-datatable">
        <a-col :span="24">
          <!-- <TopBar :device="device" type="content" :ids="selectlist" :pageInfo="contentList.pageInfo"></TopBar> -->
          <DataTable :dataList="contentList.docs" :pageInfo="contentList.pageInfo"
            @changeContentSelectList="changeSelect"></DataTable>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import DataTable from "./DataTable.vue"
import DirectUser from "./DirectUser.vue"
import DraftTable from "./DraftTable.vue"
import MoveCate from "../components/MoveCate.vue"
import TopBar from "../components/TopBar.vue"
import { ref, computed, onMounted } from 'vue'
import { userStore } from "@/stores/adminUser"
import { contentStore } from "@/stores/content"
const userStoreIns = userStore()
const contentStoreIns = contentStore()
// import { initEvent } from "@root/publicMethods/events"
const selectlist = ref([])
const sidebarOpened = ref(true)
const device = ref('desktop')
const changeSelect = (ids: any) => {
  selectlist.value = ids;
}
const classObj = computed(() => {
  return {
    hideSidebar: !sidebarOpened.value,
    openSidebar: sidebarOpened.value,
    withoutAnimation: "false",
    mobile: device.value === "mobile"
  }
})
onMounted(() => {
  // initEvent(this);
  console.error(1122)
  contentStoreIns.getContentList()
  userStoreIns.getUserInfo()
})
const contentList = computed(() => {
  return contentStoreIns.contentList
})
const directUserFormState = computed(() => {
  return contentStoreIns.directUser.formState
})
const adminUserInfo = computed(() => {
  return userStoreIns.userInfo
})
const moveCateFormState = computed(() => {
  return contentStoreIns.moveCate.formState
})
const draftContentDialog = computed(() => {
  return contentStoreIns.draftContentDialog
})
</script>

<style lang="">
</style>