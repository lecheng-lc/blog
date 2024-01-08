<template>
  <div class="dr-contentTagForm">
    <a-dialog :xs="20" :sm="20" :md="6" :lg="6" :xl="6" :title="$t('contentTag.form_title')"
      :visible.sync="dialogState.show" :close-on-click-modal="false">
      <a-form :model="dialogState.formData" :rules="rules" ref="modalFormRef" label-width="120px" class="demo-ruleForm"
        :label-position="device == 'mobile' ? 'top' : 'right'">
        <a-form-item :label="$t('contentTag.name')" prop="name">
          <el-input size="small" v-model="dialogState.formData.name"></el-input>
        </a-form-item>
        <a-form-item :label="$t('contentTag.comments')" prop="comments">
          <el-input size="small" type="textarea" v-model="dialogState.formData.comments"></el-input>
        </a-form-item>
        <a-form-item>
          <el-button size="medium" type="primary" @click="submitForm">{{ dialogState.edit ?
            $t('main.form_btnText_update') : $t('main.form_btnText_save') }}</el-button>
        </a-form-item>
      </a-form>
    </a-dialog>
  </div>
</template>
<script lang="ts" setup>
import { addContentTag, updateContentTag } from "@/api/contentTag"
import _ from "lodash"
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { contentTagStore } from '@/stores/contentTag'
import type { FormInstance } from 'ant-design-vue'
import { message } from 'ant-design-vue'
const { t } = useI18n()
const modalFormRef = ref<FormInstance>()
const [messageApi] = message.useMessage()
const props = defineProps<{
  dialogState: any
  groups: any
  device: String
}>()
const contentTagStoreIns = contentTagStore()
const rules = ref({
  name: [
    {
      required: true,
      message: t("validate.inputNull", {
        label: t("contentTag.name")
      }),
      trigger: "blur"
    },
    {
      min: 1,
      max: 12,
      message: t("validate.rangelength", { min: 1, max: 12 }),
      trigger: "blur"
    }
  ],
  comments: [
    {
      required: true,
      message: t("validate.inputNull", {
        label: t("main.comments_label")
      }),
      trigger: "blur"
    },
    {
      min: 2,
      max: 30,
      message: t("validate.ranglengthandnormal", {
        min: 2,
        max: 30
      }),
      trigger: "blur"
    }
  ]
})
const submitForm = () => {
  modalFormRef.value?.validateFields().then(async () => {
    let params = props.dialogState.formData;
    // 更新
    if (props.dialogState.edit) {
      updateContentTag(params).then(result => {
        if (result.status === 200) {
          contentTagStoreIns.hideContentTagForm()
          contentTagStoreIns.getContentTagList({})
          messageApi.info(t("main.updateSuccess"));
        } else {
          messageApi.error((result as any).message)
        }
      });
    } else {
      // 新增
      addContentTag(params).then(result => {
        if (result.status === 200) {
          contentTagStoreIns.hideContentTagForm()
          contentTagStoreIns.getContentTagList({})
          messageApi.info(t("main.updateSuccess"))
        } else {
          messageApi.error((result as any).message)
        }
      });
    }
  }
  ).catch(err => {
    console.log("error submit!!", err)
    return false;
  });
}
</script>