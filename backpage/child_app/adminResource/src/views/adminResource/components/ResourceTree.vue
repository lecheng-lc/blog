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
import { resourceStore, type FormState } from '@/stores/adminResource'
import { message, Modal, QRCode } from 'ant-design-vue'
import { createVNode, ref } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import type { TreeProps } from 'ant-design-vue'
const { t } = useI18n()
const [messageApi] = message.useMessage()
const resourceStoreIns = resourceStore()
const props = defineProps<{
  treeData: typeof resourceStoreIns.resourceList.docs
}>()
const append = (id: string, label: string) => {
  let formData = {
    parentId: '',
    parent: {
      label: ''
    }
  }
  formData.parentId = id
  formData.parent = {
    label: label
  }
  resourceStoreIns.showAdminResourceForm({
    edit: false,
    type: 'children',
    formData: formData
  } as FormState)
}
const fieldNames: TreeProps['fieldNames'] = {
  key: '_id'
}
const loading = ref(false)
const edit = async (id: string) => {
  const [err, res] = await getOneAdminResource({ id })
  if (res) {
    resourceStoreIns.showAdminResourceForm(<FormState>{
      edit: true,
      type: 'children',
      formData: res
    })
  } else {
    messageApi.error(err.message)
  }
}
const remove = (id: string) => {
  Modal.confirm({
    title: t('main.scr_modal_title'),
    content: t('main.del_notice'),
    cancelText: t('main.cancelBtnText'),
    okText: t('main.confirmBtnText'),
    icon: createVNode(ExclamationCircleOutlined),
    async onOk() {
      loading.value = true
      const [err, res] = await deleteAdminResource({
        ids: id
      })
      loading.value = false
      if (res) {
        resourceStoreIns.getAdminResourceList()
        messageApi.success(t('main.scr_modal_del_succes_info'))
      } else {
        messageApi.error(err.message)
      }
    },
    onCancel() {
      Modal.destroyAll()
    }
  })
}
const moveResource = async (_store: any, data: any) => {
  let rowData = data
  const [err, res] = await getOneAdminResource({ id: rowData._id })
  if (res) {
    resourceStoreIns.showAdminSelectResourceForm({
      edit: true,
      type: 'children',
      formData: res
    })
  }
  else {
    messageApi.error(err.message)
  }
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
