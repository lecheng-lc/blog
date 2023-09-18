
<template>
  <div  :class="classObj" class="backUpData">
    <div class="main-container">
      <RoleForm :device="device" :dialogState="formState"/>
      <PowerForm  :roleState="roleState"  :treeData="adminResourceList.docs"/>
      <a-row class="dr-datatable">
        <a-col :span="24">
          <TopBar></TopBar>
          <DataTable @change="renderPageList" :dataList="adminGroupList.docs" :pageInfo="adminGroupList.pageInfo"></DataTable>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import  DataTable from './components/DataTable.vue'
import TopBar from '@/components/TopBar.vue'
import RoleForm from './components/RoleForm.vue'
import PowerForm from './components/PowerForm.vue'
import { initEvent } from "@root/publicMethods/events"
import { computed , ref, onMounted} from 'vue'
import  { resourceStore } from '@/stores/adminResource'
import {groupStore} from '@/stores/adminGroup'
const groupStoreIns = groupStore()
const resourceStoreIns = resourceStore()
const adminGroupList = computed(()=>{
  return groupStoreIns.roleList
})
const adminResourceList = computed(()=>{
  return resourceStoreIns.resourceList
})
const  formState = computed(()=>{
  console.log('重新进了么', formState)
  return groupStoreIns.formState
})
const roleState = computed(()=>{
  return groupStoreIns.roleFormState
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
  groupStoreIns.getAdminGroupList()
  resourceStoreIns.getAdminResourceList()
})
</script>