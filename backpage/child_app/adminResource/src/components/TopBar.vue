<template>
  <div class="dr-toolbar">
    <div class="option-button el-col-6">
      <a-button size="small" type="primary" shape="round" @click="addRole">
       <SvgIcon iconClass="piliangbeifen"/>
      </a-button>
    </div>
    <div class="el-col-18">&nbsp;</div>
  </div>
</template>
<script lang="ts" setup>
import { resourceStore } from '@/stores/adminResource'
import SvgIcon from './SvgIcon.vue';
const resourceStoreIns = resourceStore()
const addRole = ()=>{
  resourceStoreIns.showAdminResourceForm({
    type: "root",
    formData: {
      parentId: "0"
    }
  })
}
</script>