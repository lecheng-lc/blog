<template>
  <div>
    <!-- Form.useForm 合并展示表单校验信息。 -->
    <a-modal
      width="30%"
      :title="$t('adminGroup.lb_roleForm_title')"
      :open="dialogState.show"
      :close-on-click-modal="false"
      :okText="dialogState.edit ? $t('main.form_btnText_update') : $t('main.form_btnText_save')"
      @Ok="submitForm"
      @Cancel="hideRolePanel"
      
    >
      <a-form
        ref="modalFormRef"
        :model="dialogState.formData"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :label-position="device == 'mobile' ? 'top' : 'right'"
      >
        <a-form-item :label="$t('adminGroup.lb_group_name')" name="name">
          <!-- 必须为v-model:value这样的形式，不然validator收不到value值 -->
          <a-input size="small" v-model:value="props.dialogState.formData.name"></a-input>
        </a-form-item>
        <a-form-item :label="$t('adminGroup.lb_group_dis')" name="comments">
          <a-input size="small" v-model:value="props.dialogState.formData.comments"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { checkName } from '@/utils/validate'
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import type { FormInstance } from 'ant-design-vue'
import { updateAdminGroup, addAdminGroup } from '@/api/adminGroup'
import { groupStore } from '@/stores/adminGroup'
import { resourceStore } from '@/stores/adminResource'
import { message } from 'ant-design-vue'
const [messageApi] = message.useMessage()
const groupStoreIns = groupStore()
const resourceStoreIns = resourceStore()
const { t } = useI18n()
const modalFormRef = ref<FormInstance>()
const props = defineProps<{
  dialogState: any
  device: string
}>()
const rules = {
  name: [
    {
      message: t('validate.inputNull',{
        label: t("adminGroup.lb_group_name")
      }),
      trigger: 'blur'
    },
    {
      trigger: 'blur',
      validator: async (_rule: any, value: string)=>{
        if (!checkName(value, 2, 10)) {
          return Promise.reject(t('validate.rangelength',{ min: 2, max: 10 }))
        } else {
          return Promise.resolve()
        }
      }
    }
  ],
  comments: [
    {
      message: t('validate.inputNull'),
      trigger: 'blur'
    },
    {
      min: 5,
      max: 30,
      message: t('validate.ranglengthandnormal', {
        min: 5,
        max: 30
      }),
      trigger: 'blur'
    }
  ]
}
const hideRolePanel = () => {
  groupStoreIns.hideAdminGroupForm()
}

const submitForm = () => {
  modalFormRef.value?.validateFields().then(() => {
    const params = props.dialogState.formData
    if (props.dialogState.edit) {
      updateAdminGroup(params).then((result) => {
        if (result.status === 200) {
          groupStoreIns.hideAdminGroupForm()
          groupStoreIns.getAdminGroupList()
          messageApi.success(t('main.updateSuccess'))
        } else {
          messageApi.error((result as any).message)
        }
      })
    } else {
      addAdminGroup(params).then((result) => {
        if (result.status === 200) {
          groupStoreIns.hideAdminGroupForm()
          groupStoreIns.getAdminGroupList()
          messageApi.success(t('main.addSuccess'))
        } else {
          messageApi.error((result as any).message)
        }
      })
    }
  }).catch(err=>{
    console.log(err)
  })
}
</script>