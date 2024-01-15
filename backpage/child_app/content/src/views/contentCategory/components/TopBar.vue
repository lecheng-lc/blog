<template>
  <div class="dr-toolbar">
    <div class="option-button el-col-6">
      <a-button size="small" type="primary" plain @click="addTopCates" round>
        添加
      </a-button>
    </div>
    <div class="el-col-18">&nbsp;</div>
  </div>
</template>
<script lang="ts" setup>
import { categoryStore } from '@/stores/contentCategory'
const categoryStoreIns = categoryStore()

const addTopCates = () => {
  categoryStoreIns.showContentCategoryForm({
    type: "root",
    formData: {
      parentId: "0"
    }
  })
}
</script>
<style lang="scss"></style>
