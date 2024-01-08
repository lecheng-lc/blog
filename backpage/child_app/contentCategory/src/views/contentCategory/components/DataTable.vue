<template>
  <div>
    <a-table :columns="columns" rowKey="_id" align="center" :loading="loading" :data-source="props.dataList"
      style="width: 100%">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operate'">
          <a-button size="mini" type="primary" plain round @click="editContentTag(record)">
            <svg-icon icon-class="edit" />
            编辑
          </a-button>
          <a-button size="mini" type="danger" plain round @click="deleteContentTagTable(record)">
            <svg-icon icon-class="icon_delete" />
            删除
          </a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { deleteContentTag, getOneContentTag } from "@/api/contentTag";
import { ref, reactive, createVNode } from 'vue'
import { Modal, message } from 'ant-design-vue'
import { contentTagStore } from "@/stores/contentTag";
import { useI18n } from 'vue-i18n'
const emits = defineEmits<{
  change: [page: number]
}>()
const contentTagStoreIns = contentTagStore()
const [messageApi] = message.useMessage()
const { t } = useI18n()
const props = defineProps<{
  dataList: any
  pageInfo: any
}>()

type Key = string | number
const state = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
});
const onSelectChange = (selectedRowKeys: Key[]) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
}
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '备注',
    dataIndex: 'comments',
  },
  {
    title: '操作',
    dataIndex: 'operate',
  },
];
const loading = ref(false)
const multipleSelection = ref([])
const editContentTag = (itemData: any) => {
  let rowData = itemData;
  getOneContentTag({ id: rowData._id })
    .then(result => {
      if (result.status === 200) {
        contentTagStoreIns.showContentTagForm({
          edit: true,
          formData: result.data
        })
      } else {
        messageApi.error((result as any).message)
      }
    })
    .catch(() => {
      messageApi.info(t("main.scr_modal_del_error_info"))
    });
}
const deleteContentTagTable = (itemData: any) => {
  Modal.confirm({
    title: t("main.del_notice"),
    content: t("main.scr_modal_title"),
    okText: t("main.confirmBtnText"),
    cancelText: t("main.cancelBtnText"),
    async onOk() {
      loading.value = false
      deleteContentTag({
        ids: itemData._id
      }).then(() => {
        contentTagStoreIns.getContentTagList({})
        messageApi.success(t("main.scr_modal_del_succes_info"))
      })
    }
  })

}
</script>
<style lang="scss" scoped>
.delete {
  font-size: 20px;
  color: #F56C6C;
  margin-right: 20px;
  cursor: pointer;
}

.recovery {
  font-size: 20px;
  cursor: pointer;
  color: #409EFF;
}
</style>@/stores/contenttag@/api/contentCategory