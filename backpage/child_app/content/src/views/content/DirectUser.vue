<template>
  <div class="dr-contentTagForm">
    <a-modal title="绑定编辑" @ok="submitForm" w v-model:open="dialogState.show" :close-on-click-modal="false">
      <a-form :model="dialogState.formData" :rules="rules" ref="modalFormRef" label-width="120px" class="demo-ruleForm">
        <p class="notice-tip">
          在添加文档之前，您需要绑定一个默认编辑
          <span v-if="targetEditor">
            （当前编辑：
            <span style="color:red;font-weight:bold">{{ targetEditor.userName }}</span>）
          </span>
        </p>
        {{ dialogState.formData }}
        <a-form-item label="绑定编辑" prop="targetUser">
          <a-select v-model:value="dialogState.formData.targetUser" show-search placeholder="搜索编辑的用户名" @select="hhh"
            @search="remoteMethod" :loading="loading">
            <a-select-option v-for="item in selectUserList" :key="item.value" :value="item.label"></a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { updateContentEditor, regUserList } from "@/api/content"
import { contentStore } from "@/stores/content"
import _ from "lodash"
import { ref } from 'vue'
import { useI18n } from "vue-i18n"
import type { FormInstance } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { userStore } from "@/stores/adminUser"
const userStoreIns = userStore()
const contentStoreIns = contentStore()
const [messageApi] = message.useMessage()
const { t } = useI18n()
const modalFormRef = ref<FormInstance>()

const seletKey = ref('')
const props = defineProps<{
  dialogState: any
  ids: any,
  targetEditor: any
}>()
const hhh = (arg: any, option: any) => {
  seletKey.value = option.key
}
const selectUserList = ref<any>([])
const loading = ref(false)
const rules = ref({
  targetUser: [
    {
      required: true,
      message: "指定用户不能为空",
      trigger: "blur"
    }
  ]
})
const queryUserListByParams = (params = {}) => {
  regUserList(params)
    .then((result: any) => {
      let specialList = result.docs
      if (specialList) {
        selectUserList.value = specialList.map((item: any) => {
          return {
            value: item._id,
            label: item.userName
          };
        });
        loading.value = false;
      } else {
        selectUserList.value = [];
      }
    })
    .catch(err => {
      selectUserList.value = [];
    })
}
const remoteMethod = (query: any) => {
  if (query !== '') {
    loading.value = true;
    queryUserListByParams({ searchkey: query });
  } else {
    selectUserList.value = [];
  }
}
const confirm = () => {
  contentStoreIns.hideDirectUserForm()
}
const submitForm = () => {
  modalFormRef.value?.validateFields().then(async () => {
    let params = props.dialogState.formData
    console.error(params, ' ==---')
    let currentParams = {
      ids: props.ids ? props.ids.join() : '',
      targetUser: seletKey.value
    };
    updateContentEditor(currentParams)
      .then(result => {
        if (result) {
          messageApi.success(t("main.addSuccess"))
          contentStoreIns.hideDirectUserForm()
          contentStoreIns.getContentList()
          userStoreIns.getUserInfo()
        } else {
          messageApi.error((result as any).message)
        }
      })
      .catch(err => {
        messageApi.error((err as any).message)
      })

  });
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
