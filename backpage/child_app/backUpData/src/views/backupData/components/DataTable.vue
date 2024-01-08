
<template>
  <div>
    <a-table :columns="columns" rowKey="_id"
      :pagination="{ total: props.pageInfo?.totalItems, pageSize: props.pageInfo?.pageSize, onChange: onChangePage, showSizeChanger: false }"
      :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" :data-source="props.dataList"
      :loading="loading">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operate'">
          <delete-outlined @click="deleteDataItem(record)" class="delete" />
          <field-time-outlined class="recovery" @click="restoreData(record)" />
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { deletetBakDataItem, restoreCMSData } from '@/api/backup'
import { ref, reactive, createVNode } from 'vue'
import { Modal, message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { ConsoleSqlOutlined, DeleteOutlined, FieldTimeOutlined } from '@ant-design/icons-vue'
import ExclamationCircleOutlined from '@ant-design/icons-vue/lib/icons/ExclamationCircleFilled';
import { backupStore } from '@/stores/backup'
interface BackupInfo {
  date: string;
  fileName: string;
  id: string;
  logs: string;
  path: string;
  __v: number;
  _id: string;
}

const emits = defineEmits<{
  change: [page: number]
}>()
const backupStoreIns = backupStore()
const [messageApi] = message.useMessage()
const { t } = useI18n()
const props = defineProps({
  dataList: {
    type: Array
  },
  pageInfo: {
    type: Object
  }
})

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
    title: '文件名',
    dataIndex: 'fileName',
  },
  {
    title: '行为',
    dataIndex: 'logs',
  },
  {
    title: '操作时间',
    dataIndex: 'date',
  },
  {
    title: '操作',
    dataIndex: 'operate',
  },
];
const loading = ref(false)
const multipleSelection = ref([])
const deleteDataItem = (itemData: BackupInfo) => {
  Modal.confirm(
    {
      title: t("main.scr_modal_title"),
      content: t('main.del_notice'),
      cancelText: t('main.cancelBtnText'),
      okText: t('main.confirmBtnText'),
      icon: createVNode(ExclamationCircleOutlined),
      async onOk() {
        loading.value = true
        const [, res] = await deletetBakDataItem({ ids: itemData._id })
        if (res) {
          backupStoreIns.getBakDateList(props.pageInfo)
        } else {
          messageApi.error(t("main.scr_modal_del_error_info"))
        }
      },
      onCancel() {
        Modal.destroyAll()
      },
    }
  )
}
const onChangePage = (page: number) => {
  emits('change', page)
}
const restoreData = (itemData: BackupInfo) => {
  console.log(itemData)
  Modal.confirm({
    title: t("main.scr_modal_title"),
    content: t("backUpData.askRestore"),
    cancelText: t("main.cancelBtnText"),
    okText: t("main.confirmBtnText"),
    async onOk() {
      loading.value = true
      const [err, res] = await restoreCMSData({ id: itemData._id })
      loading.value = false
      if (res === 200) {
        backupStoreIns.getBakDateList()
        messageApi.success(t("backUpData.restoreSuccess"))
      } else {
        messageApi.error(err?.message)
      }
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
</style>