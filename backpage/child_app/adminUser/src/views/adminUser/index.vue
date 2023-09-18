
<template>
  <div  :class="classObj" class="backUpData">
    <div class="main-container">
      <UserForm :device="device" :groups="adminGroupList.docs" :dialogState="formState"/>
      <a-row class="dr-datatable">
        <a-col :span="24">
          <TopBar></TopBar>
          <DataTable @change="renderPageList" :dataList="adminUserList.docs" :pageInfo="adminUserList.pageInfo"></DataTable>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import UserForm from './components/UserForm.vue'
import  DataTable from './components/DataTable.vue'
import TopBar from '@/components/TopBar.vue'
import { initEvent } from "@root/publicMethods/events"
import { computed , ref, onMounted} from 'vue'
import  { groupStore } from '@/stores/adminGroup'
import { userStore } from '@/stores/adminUser'
const groupStoreIns = groupStore()
const userStoreIns = userStore()
const adminGroupList = computed(()=>{
  return groupStoreIns.roleList
})

const adminUserList = computed(()=>{
  return  userStoreIns.userList
})
const  formState = computed(()=>{
  console.log('重新进了么', formState)
  return userStoreIns.formState
})

const sidebarOpened = ref(true)
const device = ref('desktop')
const classObj = computed(()=>{
  return {
    hideSidebar: !sidebarOpened.value,
    openSidebar: sidebarOpened.value,
    withoutAnimation: "false",
    mobile: device.value === "mobile"
  }
})
const renderPageList = () =>{}
onMounted(()=>{
  // @todo initEvent(this)
  userStoreIns.getAdminUserList()
  groupStoreIns.getAdminGroupList()
})
</script>@/stores/adminUser