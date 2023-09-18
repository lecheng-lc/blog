
<template>
  <div>
    <a-table :columns="columns" rowKey="_id"
      :pagination="{ total: props.pageInfo?.totalItems, pageSize: props.pageInfo?.pageSize, onChange: onChangePage, showSizeChanger: false }"
      :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" :data-source="props.dataList"
      :loading="loading">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operate'">
          <field-time-outlined class="recovery" @click="editUserInfo(record)" />
          <delete-outlined @click="deleteUser(record)" class="delete" />
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { getOneAdminUser, deleteAdminUser } from '@/api/adminUser'
import { Modal, message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { ref, createVNode, reactive } from 'vue'
import { DeleteOutlined, FieldTimeOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { groupStore } from '@/stores/adminGroup'
import { userStore } from '@/stores/adminUser'
const groupStoreIns = groupStore()
const userStoreIns = userStore()
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
const green = ref({
  color: "#13CE66"
})
const red = ref({
  color: "#FF4949"
})

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
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '用户类型',
    dataIndex: ['group', 'name'],
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '手机号',
    dataIndex: 'phoneNum',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '是否有效',
    dataIndex: 'enable',
  },
  {
    title: '操作',
    dataIndex: 'operate',
  },
]
const editUserInfo = (params: any) => {
  getOneAdminUser({ id: params._id }).then(result => {
    if (result.status === 200) {
      console.log(8881111)
      userStoreIns.showAdminUserForm({
        edit: true,
        formData: result.data
      })
    } else {
      messageApi.error((result as any).message)
    }
  }).catch(()=>{
    messageApi.info(t('main.scr_modal_del_error_info'))
  })
}
const deleteUser = (params: any) => {
  Modal.confirm(
    {
      title: t("main.scr_modal_title"),
      content: t('adminUser.scr_del_ask'),
      cancelText: t('main.cancelBtnText'),
      okText: t('main.confirmBtnText'),
      icon: createVNode(ExclamationCircleOutlined),
      onOk() {
        loading.value = true
        return deleteAdminUser({
          ids: params._id
        }).then((res) => {
          loading.value = false
          if (res.status === 200) {
            userStoreIns.getAdminUserList(props.pageInfo)
          } else {
            messageApi.error((res as any).message)
          }
        }).catch(() => {
          messageApi.error(t("main.scr_modal_del_succes_info"))
        })
      },
      onCancel() {
        Modal.destroyAll()
      },
    }
  )
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