<template>
  <div class="dr-AdminResourceForm">
    <a-modal :title="$t('contentCategory.form_title')" v-model:open="props.dialogState.show"
      :close-on-click-modal="false">
      <a-form @Ok="submitForm" :model="dialogState.formData" :rules="cateRules" ref="modalFormRef" label-width="120px"
        class="demo-ruleForm">
        <!-- 类别名称 -->
        <a-form-item v-show="dialogState.type === 'children' && !dialogState.edit"
          :label="$t('contentCategory.parentType')" prop="label">
          <a-input size="small" :disabled="true" v-model:value="props.dialogState.formData.parentObj.name"></a-input>
        </a-form-item>
        <a-form-item :label="$t('contentCategory.cate_name')" prop="name">
          <a-input size="small" v-model:value="props.dialogState.formData.name"></a-input>
        </a-form-item>
        <!-- 是否开启 -->
        <a-form-item :label="$t('contentCategory.enabel')" prop="enable">
          <a-switch :on-text="$t('main.radioOn')" :off-text="$t('main.radioOff')"
            v-model:checked="dialogState.formData.enable"></a-switch>
        </a-form-item>
        <a-form-item :label="$t('contentCategory.type')" prop="type">
          <a-radio-group v-model:value="dialogState.formData.type">
            <a-radio class="radio" value="1" label="1">{{
              $t('contentCategory.typeNormal')
            }}</a-radio>
            <a-radio class="radio" value="2" label="2">{{
              $t('contentCategory.typeSinger')
            }}</a-radio>
          </a-radio-group>

        </a-form-item>
        <a-form-item label="图标" prop="sImg" v-show="dialogState.formData.parentId == '0'">
          <a-upload class="avatar-uploader" action="/api/upload/files" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :data="{ action: 'uploadimage' }">
            <img v-if="dialogState.formData.sImg" :src="dialogState.formData.sImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </a-upload>
        </a-form-item>
        <a-form-item v-show="dialogState.formData.parentId == '0'" :label="$t('contentCategory.temp')">
          <a-select size="small" v-model:value="dialogState.formData.contentTemp" placeholder="请选择">
            <a-select-option v-for="item in forderlist" :key="item._id" :value="item._id"> {{ item.name
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('contentCategory.seoUrl')" prop="defaultUrl">
          <a-input size="small" v-model:value="dialogState.formData.defaultUrl"></a-input>
        </a-form-item>
        <a-form-item :label="$t('contentCategory.sort')" prop="sortId">
          <a-input size="small" v-model:value="dialogState.formData.sortId" :min="1" :max="50"></a-input>
        </a-form-item>
        <a-form-item :label="$t('contentCategory.keywords')" prop="keywords">
          <a-input type="textarea" :rows="2" v-model:value="dialogState.formData.keywords"></a-input>
        </a-form-item>
        <a-form-item :label="$t('contentCategory.comments')" prop="comments">
          <a-input size="small" type="texarea" v-model:value="dialogState.formData.comments"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import {
  addContentCategory,
  updateContentCategory
} from "@/api/contentCategory";
import _ from "lodash"
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { categoryStore } from "@/stores/contentCategory"
import { message } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
const { t } = useI18n()
const [messageApi] = message.useMessage()
const categoryStoreIns = categoryStore()
const props = defineProps<{
  dialogState: any
  forderlist: any
}>()
const modalFormRef = ref<FormInstance>()
const cateRules = ref({
  name: [
    {
      required: true,
      message: t("validate.inputNull", {
        label: t("contentCategory.cate_name")
      }),
      trigger: "blur"
    },
    {
      min: 2,
      max: 20,
      message: t("validate.rangelength", { min: 2, max: 20 }),
      trigger: "blur"
    }
  ],
  defaultUrl: [
    {
      required: true,
      message: t("validate.inputNull", {
        label: t("contentCategory.seoUrl")
      }),
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
      min: 4,
      max: 100,
      message: t("validate.ranglengthandnormal", {
        min: 4,
        max: 100
      }),
      trigger: "blur"
    }
  ]
})
const handleAvatarSuccess = (res: any) => {
  let imageUrl = res.data.path
  categoryStoreIns.showContentCategoryForm({
    edit: props.dialogState.edit,
    formData: Object.assign({}, props.dialogState.formData, {
      sImg: imageUrl
    })
  })
}
const beforeAvatarUpload = (file: any) => {
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";
  const isGIF = file.type === "image/gif";
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isJPG && !isPNG && !isGIF) {
    messageApi.error(t("validate.limitUploadImgType"))
  }
  if (!isLt2M) {
    messageApi.error(t("validate.limitUploadImgSize", { size: 2 }))
  }
  return (isJPG || isPNG || isGIF) && isLt2M
}
const submitForm = () => {
  modalFormRef.value?.validateFields().then(async () => {
    let params = props.dialogState.formData;
    if (props.dialogState.edit) {
      updateContentCategory(params).then(result => {
        if (result) {
          categoryStoreIns.hideContentCategoryForm()
          categoryStoreIns.getContentCategoryList()
          messageApi.success(t("main.updateSuccess"))
        } else {
          messageApi.error((result as any).message)
        }
      });
    } else {
      addContentCategory(params).then(result => {
        if (result) {
          categoryStoreIns.hideContentCategoryForm()
          categoryStoreIns.getContentCategoryList()
          messageApi.success(t("main.addSuccess"))
        } else {
          messageApi.error((result as any).message)
        }
      });
    }
  })
}
</script>
<style lang="scss">
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
  display: block;
}
</style>