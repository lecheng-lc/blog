<template>
  <div>
    <a-modal
      width="30%"
      :title="$t('adminUser.lb_form_title')"
      v-model:open="dialogState.show"
      :close-on-click-modal="false"
      :okText="dialogState.edit ? $t('main.form_btnText_update') : $t('main.form_btnText_save')"
      @Ok="submitForm"
    >
      <a-form
        ref="modalFormRef"
        :model="dialogState.formData"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :label-position="device == 'mobile' ? 'top' : 'right'"
      >
        <a-form-item :label="$t('adminUser.lb_userName')" name="userName">
          <!-- 必须为v-model:value这样的形式，不然validator收不到value值 -->
          <a-input size="small" v-model:value="props.dialogState.formData.userName"></a-input>
        </a-form-item>
        <a-form-item :label="$t('adminUser.lb_name')" name="name">
          <a-input size="small" v-model:value="props.dialogState.formData.name"></a-input>
        </a-form-item>
        <a-form-item label="头像" prop="logo">
          <a-upload
            class="avatar-uploader"
            :action="uploadFile"
            :show-file-list="false"
            list-type="picture-card"
            @change="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="{ action: 'uploadimage' }"
          >
            {{ dialogState.formData.logo }}
            <img
              v-if="props.dialogState.formData.logo"
              :src="props.dialogState.formData.logo"
              class="avatar"
            />
            <div v-else>
              <plus-outlined></plus-outlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item :label="$t('adminUser.lb_password')" name="password">
          <a-input
            type="password"
            :placeholder="$t('main.noModifyPasswordTips')"
            v-model:value="props.dialogState.formData.password"
          ></a-input>
        </a-form-item>
        <a-form-item :label="$t('adminUser.lb_userGroup')" name="group">
          {{ props.dialogState.formData.group.name }}
          <a-select
            v-model:value="props.dialogState.formData.group"
            :placeholder="$t('main.ask_select_label')"
          >
            <a-select-option
              :key="index"
              v-for="(group, index) in props.groups"
              :label="group.name"
              :value="group._id"
              >{{ group.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('adminUser.lb_countryCode')" prop="countryCode">
          <a-select
            size="small"
            v-model:value="dialogState.formData.countryCode"
            placeholder="国家代码"
          >
            <a-option
              v-for="item in countryCode"
              :key="'kw_' + item.value"
              :label="item.label"
              :value="item.value"
            ></a-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('adminUser.lb_phoneNum')" prop="phoneNum">
          <a-input size="small" v-model:value="dialogState.formData.phoneNum"></a-input>
        </a-form-item>
        <a-form-item :label="$t('adminUser.lb_email')" prop="email">
          <a-input size="small" v-model:value="dialogState.formData.email"></a-input>
        </a-form-item>
        <a-form-item :label="$t('adminUser.lb_enable')" prop="enable">
          <a-switch
            :on-text="$t('main.radioOn')"
            :off-text="$t('main.radioOff')"
            v-model:checked="dialogState.formData.enable"
          ></a-switch>
        </a-form-item>
        <a-form-item :label="$t('adminUser.lb_comments')" prop="comments">
          <a-input
            size="small"
            type="textarea"
            v-model:value="dialogState.formData.comments"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { FormInstance } from 'ant-design-vue'
import { addAdminUser, updateAdminUser } from '@/api/adminUser'
import { checkUserName, checkEmail, checkName, checkPwd, checkPhoneNum } from '@/utils/validate'
import { groupStore } from '@/stores/adminGroup'
import { userStore } from '@/stores/adminUser'
import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
const [messageApi] = message.useMessage()
const groupStoreIns = groupStore()
const userStoreIns = userStore()
const { t } = useI18n()
const modalFormRef = ref<FormInstance>()
const props = defineProps<{
  dialogState: any
  device: string
  groups: any
}>()
const uploadFile = computed(() =>{
  return `http://127.0.0.1:8089/api/upload/files`
})
const countryCode = ref([{ value: '86', label: '中国 +86' }])
const rules = {
  userName: [
    {
      required: true,
      message: t('validate.inputNull', {
        label: t('adminUser.lb_userName')
      }),
      trigger: 'blur'
    },
    {
      validator: async (_rule: any, value: string) => {
        if (!checkUserName(value)) {
          Promise.reject(t('validate.rangelength', { min: 5, max: 12 }))
        } else {
          Promise.resolve()
        }
      },
      trigger: 'blur'
    }
  ],
  name: [
    {
      required: true,
      message: t('validate.inputNull', {
        label: t('adminUser.lb_name')
      }),
      trigger: 'blur'
    },
    {
      validator: async (_rule: any, value: string) => {
        if (!checkName(value)) {
          Promise.reject(t('validate.rangelength', { min: 2, max: 6 }))
        } else {
          Promise.resolve()
        }
      },
      trigger: 'blur'
    }
  ],
  password: [
    {
      validator: async (_rule: any, value: string) => {
        if (value && !checkPwd(value)) {
          Promise.reject(t('validate.ranglengthandnormal', { min: 6, max: 12 }))
        } else {
          Promise.resolve()
        }
      },
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    {
      validator: (_rule: any, value: string) => {
        if (props.dialogState.formData.password && value !== props.dialogState.formData.password) {
          Promise.reject(t('validate.passwordnotmatching'))
        } else {
          Promise.resolve()
        }
      },
      trigger: 'blur'
    }
  ],
  group: [
    {
      required: true,
      message: t('validate.selectNull', {
        label: t('adminUser.lb_userGroup')
      }),
      trigger: 'change'
    }
  ],
  countryCode: [
    {
      required: true,
      message: t('validate.inputNull', {
        label: t('adminUser.lb_countryCode')
      }),
      trigger: 'blur'
    }
  ],
  phoneNum: [
    {
      type: 'string',
      required: true,
      message: t('validate.inputNull', {
        label: t('adminUser.lb_phoneNum')
      }),
      trigger: 'blur'
    },
    {
      validator: async (_rule: any, value: string) => {
        if (!checkPhoneNum(value)) {
          Promise.reject(
            t('validate.inputCorrect', {
              label: t('adminUser.lb_phoneNum')
            })
          )
        } else {
          Promise.resolve()
        }
      },
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: t('validate.inputNull', {
        label: t('adminUser.lb_email')
      }),
      trigger: 'blur'
    },
    {
      validator: async (_rule: any, value: string) => {
        if (!checkEmail(value)) {
          Promise.reject(
            t('validate.inputCorrect', {
              label: t('adminUser.lb_email')
            })
          )
        } else {
          Promise.resolve()
        }
      },
      trigger: 'blur'
    }
  ],
  comments: [
    {
      required: true,
      message: t('validate.inputNull', {
        label: t('adminUser.lb_comments')
      }),
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
const handleAvatarSuccess = (res: any) => {
  if(res.file.status === 'donw') {
    let imageUrl = res.file.thumbUrl
    userStoreIns.showAdminUserForm({
    edit: props.dialogState.edit,
    formData: Object.assign({}, props.dialogState.formData, {
      logo: imageUrl
    })
  })
  } 
}
const beforeAvatarUpload = (file: any) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isGIF = file.type === 'image/gif'
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isJPG && !isPNG && !isGIF) {
    messageApi.error(t('validate.limitUploadImgType'))
  }
  if (!isLt2M) {
    messageApi.error(t('validate.limitUploadImgSize', { size: 2 }))
  }
  return (isJPG || isPNG || isGIF) && isLt2M
}
const confirm = () => {
  userStoreIns.hideAdminUserForm()
}
const resetForm = () => {
  props.dialogState.formData = {}
}

const submitForm = () => {
  modalFormRef.value
    ?.validateFields()
    .then(() => {
      const params = props.dialogState.formData
      if (props.dialogState.edit) {
        updateAdminUser(params).then((result) => {
          if (result.status === 200) {
            userStoreIns.hideAdminUserForm()
            userStoreIns.getAdminUserList()
            messageApi.success(t('main.updateSuccess'))
          } else {
            messageApi.error((result as any).message)
          }
        })
      } else {
        addAdminUser(params).then((result) => {
          if (result.status === 200) {
            userStoreIns.hideAdminUserForm()
            userStoreIns.getAdminUserList()
            messageApi.success(t('main.addSuccess'))
          } else {
            messageApi.error((result as any).message)
          }
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
<style lang="scss" scoped>
.avatar-uploader .a-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .a-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px !important;
  text-align: center;
}

.avatar {
  width: 150px;
  height: 158px;
}
</style>
