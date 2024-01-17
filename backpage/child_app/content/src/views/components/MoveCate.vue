<template>
  <div class="dr-moveCateForm">
    <a-modal :xs="20" :sm="20" :md="4" :lg="4" :xl="4" title="选择分类" width="30%" :visible.sync="dialogState.show"
      :close-on-click-modal="false">
      <a-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <p class="notice-tip">
          您当前选择了
          <span style="color:red;font-weight:bold">{{ ids.length }}</span> 篇文章
        </p>
        <a-form-item :label="$t('contents.categories')" prop="categories">
          <el-cascader size="small" expandTrigger="hover" :options="contentCategoryList.docs"
            v-model="dialogState.formData.categories" @change="handleChangeCategory" :props="categoryProps"></el-cascader>
        </a-form-item>
        <a-form-item>
          <el-button size="medium" type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { moveContentCate } from "@/api/content"
import _ from "lodash"
import { ref, computed, onMounted } from 'vue'
import { contentStore } from "@/stores/content"
import type { FormInstance } from 'ant-design-vue'
import { useI18n } from "vue-i18n"
import { categoryStore } from "@/stores/contentCategory"
import { message } from 'ant-design-vue'
const { t } = useI18n()
const categoryStoreIns = categoryStore()
const contentStoreIns = contentStore()
const [messageApi] = message.useMessage()
const props = defineProps<{
  dialogState: any
  groups: any
  ids: any
  targetEditor: any
}>()
const categoryProps = ref({
  value: "_id",
  label: "name",
  children: "children"
})
const modalFormRef = ref<FormInstance>()
const categories = ref([])
const selectUserList = ref([])
const loading = ref(false)
const rules = ref([
  {
    required: true,
    message: "指定分类不能为空",
    trigger: "blur"
  }
])
const handleChangeCategory = (value: string) => {
  console.log(value)
}
const confirm = () => {
  contentStoreIns.hideDirectUserForm()
}
const contentCategoryList = computed(() => {
  return categoryStoreIns.categoryList
})
onMounted(() => {
  categoryStoreIns.getContentCategoryList()
})
const submit = () => {
  modalFormRef.value?.validateFields().then(async () => {
    let params = props.dialogState.formData;
    let currentParams = {
      ids: props.ids ? props.ids.join() : "",
      categories: params.categories
    };

    if (!props.ids || _.isEmpty(props.ids)) {
      messageApi.warning('请选择至少一篇文章！')
      return
    }
    moveContentCate(currentParams)
      .then(result => {
        if (result) {
          messageApi.success(t("main.addSuccess"))
          contentStoreIns.hideMoveCateForm()
          contentStoreIns.getContentList()
        } else {
          messageApi.error((result as any).message)
        }
      })
  })
}
</script>
<style lang="scss" scoped>
.notice-tip {
  padding: 8px 16px;
  background-color: #ecf8ff;
  border-radius: 4px;
  border-left: 5px solid #50bfff;
  margin: 0 0 25px;
}
</style>
