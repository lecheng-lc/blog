<template>
  <div class="dr-toolbar">
    <a-col :xs="8" :md="6" class="option-button">
      <a-button size="small" type="primary" plain @click="reserveContent()" round>
        <svg-icon icon-class="icon_reserve" />
      </a-button>
      <a-button size="small" type="danger" plain round @click="branchDelete()">
        <svg-icon icon-class="icon_delete" />
      </a-button>
      <!-- TOPBARLEFT -->
    </a-col>
    <a-col :xs="16" :md="18">
      <div class="dr-toolbar-right">
        <div class="dr-select-box">
          <a-input class="dr-searchInput" style="width:180px" size="small" :placeholder="$t('topBar.keywords')"
            v-model:value="pageInfo.searchkey" suffix-icon="el-icon-search" @keyup.enter.native="searchResult"></a-input>
        </div>
      </div>
    </a-col>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import _ from 'lodash'
import { deleteContentApi, updateManyContent } from "@/api/content"
import { message, Modal } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { contentStore } from '@/stores/content'
import { categoryStore } from '@/stores/contentCategory'
const { t } = useI18n()
const [messageApi] = message.useMessage()
const contentStoreIns = contentStore()
const categoryStoreIns = categoryStore()

const props = defineProps<{
  device: string
  pageInfo: any
  type: string
  ids: any
}>()
const loading = ref(false)
const selectUserList = ref<any>([])
const searchkey = ref("")
const reserveContent = () => {
  if (_.isEmpty(props.ids)) {
    messageApi.info(t("validate.selectNull", {
      label: t("main.target_Item")
    }))
    return false;
  }
  Modal.confirm({
    title: t('main.scr_modal_title'),
    content: '确认要恢复该文档吗？',
    cancelText: t('main.cancelBtnText'),
    okText: t('main.confirmBtnText'),
    onOk() {
      updateManyContent({
        ids: props.ids.join(),
        updates: { draft: "0" }
      }).then(res => {
        Object.assign(props.pageInfo);
        contentStoreIns.getDraftContentList(props.pageInfo)
        contentStoreIns.getContentList()
        messageApi.success('恢复成功')
      })
    }
  })
}
const branchDelete = () => {
  if (_.isEmpty(props.ids)) {
    messageApi.info(t("validate.selectNull", {
      label: t("main.target_Item")
    }))
    return false;
  }
  Modal.confirm({
    title: t("main.scr_modal_title"),
    content: t("main.just_del_notice"),
    cancelText: t("main.cancelBtnText"),
    okText: t("main.cancelBtnText"),
    onOk() {
      let ids = props.ids.join();
      deleteContentApi({
        ids
      }).then((result: any) => {
        if (result) {
          contentStoreIns.getDraftContentList(props.pageInfo)
          contentStoreIns.getContentList()
          messageApi.success(t("main.scr_modal_del_succes_info"))
        } else {
          messageApi.error(result.message)
        }
      })
    }
  })
}
const searchResult = () => {
  contentStoreIns.getDraftContentList(props.pageInfo)
}
</script>
<style lang="scss"></style>
