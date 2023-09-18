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
import { userStore } from '@/stores/adminUser';
import SvgIcon from './SvgIcon.vue';
const userStoreIns = userStore()
const addRole = ()=>{
  userStoreIns.showAdminUserForm()
}
</script>