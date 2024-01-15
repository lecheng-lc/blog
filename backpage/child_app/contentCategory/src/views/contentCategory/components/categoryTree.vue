<template>
  <a-tree :tree-data="props.treeData" :field-names="fieldNames" default-expand-all>
    <template #title="{ name, _id, label }">
      <div>
        <span class="title">
          {{ name }}
        </span>
        <span class="icon-wrapper">
          <i class="add" @click="append(_id)">增加</i>
          <i class="edit" @click="edit(_id)">编辑</i>
          <i class="delete" @click="remove(_id)">删除</i>
        </span>
      </div>
    </template></a-tree>
</template>

<script lang="ts" setup>
import {
  deleteContentCategory,
  getOneContentCategory
} from "@/api/contentCategory"
import { categoryStore } from "@/stores/contentCategory"
import { message, Modal } from "ant-design-vue";
import _ from "lodash"
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TreeProps } from 'ant-design-vue'
const categoryStoreIns = categoryStore()
const props = defineProps<{
  treeData: any
}>()
const defaultProps = ref({
  children: "children",
  label: "name"
})
const { t } = useI18n()
const [messageApi] = message.useMessage()
const fieldNames: TreeProps['fieldNames'] = {
  key: '_id',
}
const append = (data: any) => {
  let formData: any = {};
  formData.parentId = data._id;
  formData.parentObj = data;
  categoryStoreIns.showContentCategoryForm({
    edit: false,
    type: "children",
    formData: formData
  })
}
const edit = (id: string) => {
  getOneContentCategory({ id })
    .then(result => {
      if (result) {
        let categoryInfo: any = result
        if (!_.isEmpty(categoryInfo)) {
          categoryStoreIns.showContentCategoryForm({
            edit: true,
            type: "children",
            formData: _.assign({}, categoryInfo, {
              contentTemp: !_.isEmpty(categoryInfo.contentTemp)
                ? categoryInfo.contentTemp._id
                : ''
            })
          });
        }
      } else {
        messageApi.error((result as any).message)
      }
    })
    .catch(() => {
      messageApi.info(t("main.scr_modal_del_error_info"))
    })
}
const remove = (id: string) => {
  Modal.confirm({
    title: '您确认要删除该类别吗？',
    content: t("main.scr_modal_title"),
    cancelText: t("main.cancelBtnText"),
    okText: t("main.confirmBtnText"),
    onOk() {
      deleteContentCategory({
        ids: id
      }).then((res) => {
        if (res) {
          categoryStoreIns.getContentCategoryList()
          messageApi.success(t("main.scr_modal_del_succes_info"))
        } else {
          messageApi.error((res as any).message)
        }
      }).catch(() => {
        messageApi.info(t("main.scr_modal_del_error_info"))
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel() { },
  })
}
</script>