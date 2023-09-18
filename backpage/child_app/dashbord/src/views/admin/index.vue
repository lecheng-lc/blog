<template>
  <div class="dashboard-editor-container">
    <GithubCorner style="position: absolute; top: 0px; border: 0; right: 0;" />
    <!-- github fork角 -->
    <div class="notice-box">
      <div class="client-notice" v-html="noticeInfo"></div>
      <!-- <div class="update-notice" v-if="vNo.newVersion > vNo.oldVersion">
        发现新版本 {{ vNo.nv }}，
        <el-link
          v-if="versionInfo.description"
          style="font-size:12px;"
          type="primary"
          @click="showUpdateNotice()"
          >查看详情</el-link
        >
      </div> -->
    </div>
    <PanelGroup :basicInfo="basicInfo" />
    <a-modal width="55%" :cancelText="$t('main.cancelBtnText')" :okText="$t('main.confirmBtnText')" :title="$t('main.myPower')" v-model:open="resourceShow" :maskClosable="false">
      <ResourceView :resource="newSourceData" />
    </a-modal>
    <a-row :gutter="8">
      <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 24 }" :lg="{ span: 11 }" :xl="{ span: 12 }"
        style="padding-right:8px;margin-bottom:30px;">
        <TransactionTable :messages="basicInfo.messages" />
      </a-col>
      <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 12 }" :lg="{ span: 6 }" :xl="{ span: 6 }"
        style="margin-bottom:30px;">
        <UserList :regUsers="basicInfo.regUsers" />
      </a-col>
      <a-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 12 }" :lg="{ span: 7 }" :xl="{ span: 6 }"
        style="margin-bottom:30px;">
        <BoxCard :basicInfo="basicInfo" @showMyResourceBox="showMyResource" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import GithubCorner from "@/components/GithubCorner.vue"
import PanelGroup from "./components/PanelGroup.vue";
import ResourceView from "./components/ResourceView.vue";
import TransactionTable from "./components/TransactionTable.vue";
import UserList from "./components/UserList.vue"
import BoxCard from "./components/BoxCard.vue"
import { renderTreeData } from "@/utils";
import { ref, computed, onMounted } from 'vue'
import { dashbordStore } from "@/stores/dashbord";
const dashbordStoreIns = dashbordStore()

const resourceShow = ref(false)
const showMyResource = () => {
  resourceShow.value = true
}
const basicInfo = computed(() => {
  return dashbordStoreIns.basicInfo
})
const notice = computed(() => {
  return dashbordStoreIns.notice
})
// const versionInfo = computed(()=>{
//   return dashbordStoreIns.versionInfo
// })
const newSourceData = computed(() => {
  return renderTreeData({ docs: basicInfo.value.resources });
})
const noticeInfo = computed(() => {
  if (notice.value && notice.value.length > 0) {
    let firstStr = (notice.value[0] as any).content;
    return `${firstStr}`;
  } else {
    return ""
  }
})
onMounted(() => {
  dashbordStoreIns.getSiteBasicInfo()
  dashbordStoreIns.getNotice({ isPaging: "0" })
  dashbordStoreIns.getVersionMaintenanceInfo({ isPaging: "0" })
  localStorage.clear()
})
// const vNo = computed(()=>{
//   let cmsVersion = $root.appVersion;
//       let oldVersion = Number(cmsVersion.split(".").join(""));
//       let newVersion;
//       if (versionInfo && this.versionInfo.version) {
//         newVersion = Number(this.versionInfo.version.split(".").join(""));
//       }
//       return {
//         ov: cmsVersion,
//         oldVersion,
//         nv: versionInfo.version,
//         newVersion,
//       };
// })
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.update-dialog {
  .el-dialog__body {
    padding: 15px 20px !important;
  }

  ul {
    li {
      line-height: 28px;
    }
  }
}

.notice-box {
  color: #b4bccc;
  font-size: 12px;

  .client-notice {
    display: inline-block;
  }

  .update-notice {
    display: inline-block;
    margin-left: 10px;
  }
}

.dashboard-editor-container {
  padding: 15px;
  position: relative;

  // background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
