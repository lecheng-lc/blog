<template>
  <div class="dr-AdminResourceForm">
    <a-modal :title="$t('adminResource.lb_resourceForm_title')" v-model:open="dialogState.show">
      <template #footer>
        <div class="btn-wrapper">
          <a-button key="back" @click="resetForm">{{
            $t('main.reSetBtnText')
          }}</a-button>
          <a-button key="submit" type="primary" @click="submitForm">{{
            dialogState.edit ? $t('main.form_btnText_update') : $t('main.form_btnText_save')
          }}</a-button>
        </div>
      </template>
      <a-form :model="dialogState.formData" :rules="rules" ref="modalFormRef" label-width="120px" class="demo-ruleForm"
        :label-position="device == 'mobile' ? 'top' : 'right'">
        <a-form-item v-show="dialogState.type === 'children' && !dialogState.edit"
          :label="$t('adminResource.lb_parentType')" prop="label">
          <a-input size="small" :disabled="true" v-model:value="dialogState.formData.parent.label"></a-input>
        </a-form-item>
        <a-form-item :label="$t('adminResource.lb_resource_dis')" prop="comments">
          <a-input size="small" v-model:value="dialogState.formData.comments"></a-input>
        </a-form-item>

        <a-form-item :label="$t('adminResource.lb_type')" prop="type">
          <a-select size="small" v-model:value="dialogState.formData.type" :placeholder="$t('main.ask_select_label')"
            @change="changeType">
            <a-select-option v-for="item in options" :key="item.value" :label="item.label"
              :value="item.value"></a-select-option>
          </a-select>
        </a-form-item>
        <div v-if="dialogState.formData.type === '0'">
          <a-form-item label="Icon" prop="componentPath">
            <a-input size="small" v-model:value="dialogState.formData.icon"></a-input>
          </a-form-item>
          <a-form-item :label="$t('adminResource.lb_router')" prop="routePath">
            <a-input size="small" v-model:value="dialogState.formData.routePath"></a-input>
          </a-form-item>

          <div v-if="dialogState.formData.parentId !== '0'">
            <a-form-item :label="$t('adminResource.lb_showon_meun')" prop="enable">
              <a-switch :on-text="$t('main.radioOn')" :off-text="$t('main.radioOff')"
                v-model:checked="dialogState.formData.enable"></a-switch>
            </a-form-item>
          </div>
        </div>
        <div v-else>
          <a-form-item :label="$t('adminResource.lb_resource_file_path')" prop="api">
            <a-input size="small" v-model:value="dialogState.formData.api">
              <template #addonBefore>/manage/</template>
            </a-input>
          </a-form-item>
        </div>
        <a-form-item :label="$t('main.sort_label')" prop="sortId">
          <a-input size="small" v-model:value="dialogState.formData.sortId" @change="handleChange" :min="1"
            :max="50"></a-input>
        </a-form-item>
        <a-form-item> </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { updateAdminResource, addAdminResource } from '@/api/adminResource'
import { checkResourceName } from '@/utils/validate'
import { useI18n } from 'vue-i18n'
import type { FormInstance } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { resourceStore } from '@/stores/adminResource'
const resourceStoreIns = resourceStore()
const [messageApi] = message.useMessage()
const { t } = useI18n()
const props = defineProps<{
  dialogState: typeof resourceStoreIns.formState
  device: String
}>()
const rules = ref({
  type: [
    {
      required: true,
      message: t('validate.selectNull', {
        label: t('adminResource.lb_type')
      }),
      trigger: 'change'
    }
  ],
  comments: [
    {
      required: true,
      message: t('validate.inputNull', {
        label: t('main.comments_label')
      }),
      trigger: 'blur'
    },
    {
      min: 2,
      max: 30,
      message: t('validate.ranglengthandnormal', {
        min: 2,
        max: 30
      }),
      trigger: 'blur'
    }
  ]
})
const modalFormRef = ref<FormInstance>()
const options = ref([
  {
    value: '0',
    label: t('adminResource.lb_base_menu')
  },
  {
    value: '1',
    label: t('adminResource.lb_options')
  }
])

const handleChange = (value: string) => {
  console.log(value)
}
const changeType = () => { }
const submitForm = () => {
  modalFormRef.value?.validateFields().then(async () => {
    const params = props.dialogState.formData
    // 更新
    if (props.dialogState.edit) {
      const [err, res] = await updateAdminResource(params)
      if (res) {
        resourceStoreIns.hideAdminResourceForm()
        resourceStoreIns.getAdminResourceList()
        messageApi.success(t("main.updateSuccess"))
      } else {
        messageApi.error(err.message)
      }
    } else {
      const [err, res] = await addAdminResource(params)
      if (res) {
        resourceStoreIns.hideAdminResourceForm()
        resourceStoreIns.getAdminResourceList()
        messageApi.success(t("main.addSuccess"))
      } else {
        messageApi.error(err.message)
      }
    }
  }).catch(err => {
    console.log("error submit!!", err)
    return false;
  })
}
const resetForm = () => {
  modalFormRef.value?.resetFields()
}
</script>
