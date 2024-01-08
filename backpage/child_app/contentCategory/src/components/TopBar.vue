<template>
  <div class="dr-toolbar">
    <a-col :xs="{ span: 12 }" :md="{ span: 18 }" class="option-button">
      <a-button size="small" type="primary" plain round @click="addTag">
        <svg-icon icon-class="icon_add" />
        新增
      </a-button>
    </a-col>
    <a-col :xs="{ span: 12 }" :md="{ span: 6 }">
      <div class="dr-toolbar-right">
        <a-input class="dr-searchInput" size="small" :placeholder="$t('topBar.tagName')"
          v-model:value="props.pageInfo.searchkey" @keyup.enter.native="searchResult"></a-input>
      </div>
    </a-col>
  </div>
</template>
<script lang="ts" setup>
import { contentTagStore } from "@/stores/contentTag"
import SvgIcon from './SvgIcon.vue';
const contentTagIns = contentTagStore()
const props = defineProps<{
  pageInfo: any,
  type: string
}>()
const addTag = () => {
  contentTagIns.showContentTagForm()
}
const searchResult = () => {
  let searchkey = props.pageInfo ? props.pageInfo.searchkey : ""
  contentTagIns.getContentTagList({
    searchkey
  })
}
</script>
<style lang="scss"></style>
