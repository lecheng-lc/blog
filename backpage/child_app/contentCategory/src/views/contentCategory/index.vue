<template>
  <div :class="classObj" class="admincategory">
    <div class="main-container">
      <CategoryForm :dialogState="formState" :forderlist="getDefaultTempItems"></CategoryForm>
      <el-row class="dr-datatable">
        <el-col :span="24">
          <TopBar type="contentCategory"></TopBar>
          <CategoryTree :treeData="contentCategoryList.docs"></CategoryTree>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import CategoryForm from "./components/categoryForm.vue"
import CategoryTree from "./components/categoryTree.vue";
import TopBar from "./components/TopBar.vue";
import { ref, computed, onMounted } from 'vue'
import _ from "lodash";
import { categoryStore } from "@/stores/contentCategory";
import { templateStore } from '@/stores/contentTemplate'
import { initEvent } from "@root/publicMethods/events"
const sidebarOpened = ref(true)
const device = ref('desktop')
const categoryStoreIns = categoryStore()
const templateStoreIns = templateStore()
const contentCategoryList = computed(() => {
  return categoryStoreIns.categoryList
})
const templateConfigList = computed(() => {
  return templateStoreIns.templateList
})
const formState = computed(() => {
  return categoryStoreIns.formState
})
const getDefaultTempItems = computed(() => {
  let myTemps = templateConfigList.value
  let currentTemp: any = _.filter(myTemps, (temp: any) => {
    return temp.using
  })
  console.error(currentTemp, '77888')
  return currentTemp.length > 0 ? currentTemp[0].items : [];
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
  // initEvent(this)
  categoryStoreIns.getContentCategoryList()
  templateStoreIns.getMyTemplateList()
})
</script>

<style lang="">
</style>