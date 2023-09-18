<template>
  <div>
    <a-tree :tree-data="props.treeData" :field-names="fieldNames" v-if="props.treeData.length" default-expand-all>
      <template #title="{ comments, _id, label }">
        <div>
          <span class="title">
            {{ comments }}
          </span>
          <span class="icon-wrapper">
            <i class="add" @click="append(_id, label)">增加</i>
            <i class="edit" @click="edit(_id)">编辑</i>
            <i class="delete" @click="remove(_id)">删除</i>
          </span>
        </div>
      </template>
    </a-tree>
  </div>
</template>
<script lang="ts" setup>
import { getOneAdminResource, deleteAdminResource } from '@/api/adminResource'
import { resourceStore } from '@/stores/adminResource'
import { message, Modal } from 'ant-design-vue'
import { createVNode, ref } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import type { TreeProps } from 'ant-design-vue'
const { t } = useI18n()
const [messageApi] = message.useMessage()
const resourceStoreIns = resourceStore()
const props = defineProps<{
  treeData: any
}>()
const append = ( id:string, label: string) => {
  let formData: any = {}
  formData.parentId = id
  formData.parent = {
    label: label
  }
  resourceStoreIns.showAdminResourceForm({
    edit: false,
    type: 'children',
    formData: formData
  })
}
const fieldNames: TreeProps['fieldNames'] = {
  key: '_id'
}
const loading = ref(false)
const edit = (id:string) => {
  getOneAdminResource({ id })
    .then((result) => {
      if (result.status === 200) {
        resourceStoreIns.showAdminResourceForm({
          edit: true,
          type: 'children',
          formData: result.data
        })
      } else {
        messageApi.error((result as any).message)
      }
    })
    .catch(() => {
      messageApi.info(t('main.scr_modal_del_error_info'))
    })
}
const remove = (id: string) => {
  Modal.confirm({
    title: t('main.scr_modal_title'),
    content: t('main.del_notice'),
    cancelText: t('main.cancelBtnText'),
    okText: t('main.confirmBtnText'),
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      loading.value = true
      return deleteAdminResource({
        ids: id
      })
        .then((res) => {
          loading.value = false
          if (res.status === 200) {
            resourceStoreIns.getAdminResourceList()
            messageApi.success(t('main.scr_modal_del_succes_info'))
          } else {
            messageApi.error((res as any).message)
          }
        })
        .catch(() => {
          messageApi.error(t('main.scr_modal_del_error_info'))
        })
    },
    onCancel() {
      Modal.destroyAll()
    }
  })
}
const moveResource = (_store: any, data: any) => {
  let rowData = data
  getOneAdminResource({ id: rowData._id })
    .then((result) => {
      if (result.status === 200) {
        resourceStoreIns.showAdminSelectResourceForm({
          edit: true,
          type: 'children',
          formData: result.data
        })
      } else {
        messageApi.error((result as any).message)
      }
    })
    .catch(() => {
      messageApi.info(t('main.scr_modal_del_error_info'))
    })
}
const renderContent = () => { }
</script>
<style lang="scss" scoped>
.icon-wrapper {
  .add {
    color: blue;
  }

  .edit {
    color: green;
  }

  .delete {
    color: red;
  }
}
</style>
