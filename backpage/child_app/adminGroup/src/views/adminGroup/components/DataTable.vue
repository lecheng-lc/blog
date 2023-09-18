
<template>
  <div>
    <a-table :columns="columns" rowKey="_id"
      :pagination="{ total: props.pageInfo?.totalItems, pageSize: props.pageInfo?.pageSize, onChange: onChangePage, showSizeChanger: false }"
      :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" :data-source="props.dataList"
      :loading="loading">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operate'">
          <delete-outlined @click="editRoleInfo(record)" class="delete" />
          <field-time-outlined class="recovery" @click="editPowerInfo(record)" />
          <delete-outlined @click="deleteRole(record)" class="delete" />
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { getOneAdminGroup, deleteAdminGroup } from '@/api/adminGroup'
import { Modal, message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { ref, createVNode, reactive } from 'vue'
import { DeleteOutlined, FieldTimeOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { groupStore } from '@/stores/adminGroup'
const groupStoreIns = groupStore()
type Key = string | number
const [messageApi] = message.useMessage()
const { t } = useI18n()
const props = defineProps<{
  dataList: any,
  pageInfo: any
}>()
const emits = defineEmits<{
  change: [page: number]
}>()
const loading = ref(false)
const multipleSelection = ref('')

const onSelectChange = (selectedRowKeys: Key[]) => {
  state.selectedRowKeys = selectedRowKeys
}
const state = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
});

const onChangePage = (page: number) => {
  emits('change', page)
}
const toggleSelection = () => {
  // rows
  // if (rows) {
  //       rows.forEach(row => {
  //         this.$refs.multipleTable.toggleRowSelection(row);
  //       });
  //     } else {
  //       this.$refs.multipleTable.clearSelection();
  //     }
}
const columns = [
  {
    title: '角色名',
    dataIndex: 'name',
  },
  {
    title: '角色描述',
    dataIndex: 'comments',
  },
  {
    title: '操作',
    dataIndex: 'operate',
  }
]
const editRoleInfo = (params: any) => {
  getOneAdminGroup({ id: params._id }).then(result => {
    if (result.status === 200) {
      console.log(8881111)
      groupStoreIns.showAdminGroupForm({
        edit: true,
        formData: result.data
      })
    } else {
      messageApi.error((result as any).message)
    }
  })
}
const deleteRole = (params: any) => {
  Modal.confirm(
    {
      title: t("main.scr_modal_title"),
      content: t('main.del_notice'),
      cancelText: t('main.cancelBtnText'),
      okText: t('main.confirmBtnText'),
      icon: createVNode(ExclamationCircleOutlined),
      onOk() {
        loading.value = true
        return deleteAdminGroup({
          ids: params._id
        }).then((res) => {
          loading.value = false
          if (res.status === 200) {
            groupStoreIns.getAdminGroupList(props.pageInfo)
          }
        }).catch(() => {
          messageApi.error(t("main.scr_modal_del_error_info"))
        })
      },
      onCancel() {
        Modal.destroyAll()
      },
    }
  )
}
const editPowerInfo = (params: any) => {
  getOneAdminGroup({ id: params._id }).then(result => {
    if (result.status === 200) {
      groupStoreIns.showAdminGroupRoleForm({
        edit: true,
        formData: result.data
      })
    } else {
      messageApi.error((result as any).message)
    }
  }).catch(()=>{
    messageApi.info(t("main.scr_modal_del_error_info"))
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