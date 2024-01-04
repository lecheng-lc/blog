<template>
  <div :class="classObj" class="adminResource">
    <div class="main-container">
      <ResourceForm :device="device" :dialogState="formState"></ResourceForm>
      <!-- <SelectParentForm
        :device="device"
        :selectDialogState="selectFormState"
        :parentResource="parentResource"
      ></SelectParentForm> -->
      <a-row class="dr-datatable">
        <a-col :span="24">
          <!-- <TopBar type="adminResource"></TopBar> -->
          <ResourceTree :treeData="adminResourceList.docs" pageType="adminResource"></ResourceTree>
          <!-- <el-tooltip placement="top" content="tooltip">
            <back-to-top
              :custom-style="myBackToTopStyle"
              :visibility-height="300"
              :back-position="50"
              transition-name="fade"
            />
          </el-tooltip> -->
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import ResourceForm from "./components/ResourceForm.vue"
// import SelectParentForm from "./components/SelectParentForm.vue"
import ResourceTree from "./components/ResourceTree.vue"
import TopBar from "@/components/TopBar.vue"
// import BackToTop from "@/components/BackToTop";
import { initEvent } from "@root/publicMethods/events"
import { ref, computed, onMounted } from 'vue'
import { resourceStore, type FormState } from "@/stores/adminResource"
const resourceStoreIns = resourceStore()
const sidebarOpened = ref(true)
const device = ref('desktop')
const myBackToTopStyle = ref({
  right: "0px",
  bottom: "50px",
  width: "40px",
  height: "40px",
  "border-radius": "4px",
  "line-height": "45px", // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
  background: "#e7eaf1" // 按钮的背景颜色 The background color of the button
})
const adminResourceList = computed(() => {
  return resourceStoreIns.resourceList
})
const formState = computed(() => {
  return resourceStoreIns.formState
})

const parentResource = computed(() => {
  let parentResource = adminResourceList.value.docs.map((item) => {
    return {
      label: item.comments,
      value: item._id
    }
  })
  return parentResource
})
const classObj = computed(() => {
  return {
    hideSidebar: !sidebarOpened.value,
    openSidebar: sidebarOpened.value,
    withoutAnimation: "false",
    mobile: device.value === "mobile"
  }
})
onMounted(() => {
  // @todo
  // initEvent(this)
  resourceStoreIns.getAdminResourceList()
})
</script>

<style lang="">
</style>