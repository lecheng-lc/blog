<template>
  <div :class="'dr-contentDraftDioalog ' + device">
    <a-modal :xs="20" :sm="20" :md="4" :lg="4" :xl="4" class="cover-dialog" title="回收站" width="60%"
      :visible.sync="dialogState.show" :close-on-click-modal="false">
      <DraftTopBar :device="device" :ids="selectDraftList" :pageInfo="draftContentList.pageInfo"></DraftTopBar>
      <a-table @selection-change="handleDraftSelectionChange" :data="draftContentList.docs" style="width: 100%">
        <a-table-column type="selection" width="55"></a-table-column>

        <a-table-column prop="title" :label="$t('contents.title')" width="350" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="scope.row.state == '2'">
              <a :href="'/details/' + scope.row._id + '.html'" target="_blank">{{ scope.row.title }}</a>
            </div>
            <div v-else>{{ scope.row.title }}</div>
          </template>
        </a-table-column>
        <a-table-column prop="state" :label="$t('contents.enable')" show-overflow-tooltip>
          <template slot-scope="scope">
            <svg-icon v-show="scope.row.state == '2'" :style="green" icon-class="check-circle-fill" />
            <svg-icon v-show="scope.row.state != '2'" :style="red" icon-class="minus-circle-fill" />
          </template>
        </a-table-column>
        <a-table-column prop="updateDate" :label="$t('contents.updateDate')" width="180">
          <template slot-scope="scope">{{ scope.row.updateDate }}</template>
        </a-table-column>
        <a-table-column :label="$t('main.dataTableOptions')" min-width="150" fixed="right">
          <template slot-scope="scope">
            <a-button size="mini" type="primary" plain round @click="reserveContent(scope.$index, draftContentList.docs)">
              <svg-icon icon-class="icon_reserve" />
            </a-button>
            <a-button size="mini" type="danger" plain round @click="justDelete(scope.$index, draftContentList.docs)">
              <svg-icon icon-class="icon_delete" />
            </a-button>
          </template>
        </a-table-column>
      </a-table>
      <!-- <DraftPagination :device="device" :pageInfo="draftContentList.pageInfo" pageType="content"></DraftPagination> -->
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { deleteContentApi, updateManyContent } from "@/api/content";
import _ from "lodash";
// import DraftPagination from "../common/DraftPagination";
import DraftTopBar from "../components/DraftTopBar.vue"
import { ref, computed } from 'vue'
import { contentStore } from "@/stores/content";
import { Modal, message } from "ant-design-vue";
import { useI18n } from "vue-i18n";
const [messageApi] = message.useMessage()
const contentStoreIns = contentStore()
const { t } = useI18n()
const props = defineProps<{
  dialogState: any,
  device: string
}>()
const selectDraftList = ref<any>([])
const green = ref({
  color: "#13CE66"
})
const red = ref({ color: "#FF4949" })
const draftContentList = computed(() => {
  return contentStoreIns.draftContentList
})
const handleDraftSelectionChange = (val: any[]) => {
  if (val && val.length > 0) {
    let ids = val.map((item: { _id: any; }, index: any) => {
      return item._id;
    });
    selectDraftList.value = ids
  } else {
    selectDraftList.value = ""
  }
}
const reserveContent = (index: string | number, rows: { [x: string]: { _id: any; }; }) => {
  Modal.confirm({
    title: t("main.scr_modal_title"),
    content: '确认要恢复该文档吗？',
    cancelText: t("main.cancelBtnText"),
    okText: t('main.confirmBtnText'),
    onOk() {
      updateManyContent({
        ids: rows[index]._id,
        updates: { draft: "0" }
      }).then(result => {
        if (result) {
          Object.assign(draftContentList.value.pageInfo)
          contentStoreIns.getDraftContentList(draftContentList.value.pageInfo)
          contentStoreIns.getContentList()
          messageApi.success('恢复成功')
        } else {
          messageApi.error((result as any).message)
        }
      })
    }
  })
}
const justDelete = (index: string | number, rows: { [x: string]: { _id: any; }; }) => {
  Modal.confirm({
    title: t("main.scr_modal_title"),
    content: t("main.just_del_notice"),
    okText: t("main.confirmBtnText"),
    cancelText: t("main.cancelBtnText"),
    onOk() {
      deleteContentApi({
        ids: rows[index]._id
      }).then(res => {
        Object.assign(draftContentList.value.pageInfo);
        contentStoreIns.getDraftContentList(draftContentList.value.pageInfo)
        contentStoreIns.getContentList()
        messageApi.success(t("main.scr_modal_del_succes_info"))
      })
    }
  })
}
</script>
<style lang="scss" >
.dr-contentDraftDioalog {
  .a-modal__body {
    padding-top: 0 !important;
  }
}
</style>
