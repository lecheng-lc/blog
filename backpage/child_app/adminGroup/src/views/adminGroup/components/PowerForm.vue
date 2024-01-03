<template>
  <div>
    <a-modal width="40%" :open="roleState.show" :title="$t('adminGroup.lb_give_power')" :maskClosable="false"
      :cancelText="$t('main.cancelBtnText')" :okText="$t('main.confirmBtnText')" @cancel="closeTree" @ok="savePower">
      <a-tree :tree-data="props.treeData" v-model:checkedKeys="currentPowerKeys" v-model:selectedKeys="currentPowerKeys"
        selectable :checkable="true" :field-names="fieldNames" :render-content="renderContent"></a-tree>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { updateAdminGroup } from '@/api/adminGroup'
import { groupStore } from '@/stores/adminGroup'
import { resourceStore } from '@/stores/adminResource'
import type { TreeProps } from 'ant-design-vue'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
const { t } = useI18n()
const [messageApi] = message.useMessage()
const groupStoreIns = groupStore()
const resourceStoreIns = resourceStore()

import _ from 'lodash'
import { ref } from 'vue'
const props = defineProps<{
  roleState: typeof groupStoreIns.roleFormState,
  treeData: typeof resourceStoreIns.resourceList.docs
}>()
const fieldNames: TreeProps['fieldNames'] = {
  children: 'children',
  title: 'comments',
  key: '_id'
}

const power = computed(() => {
  return groupStoreIns.roleFormState.formData.power
})
const currentPowerKeys = ref([])
watch(power, (val) => {
  currentPowerKeys.value = val
})
const savePower = async () => {
  const ids = currentPowerKeys.value
  const params = props.roleState.formData
  params.power = ids
  const [err, res] = await updateAdminGroup(params)
  if (res) {
    groupStoreIns.hideAdminGroupRoleForm()
    groupStoreIns.getAdminGroupList()
    messageApi.success(t("adminGroup.lb_updatePower_success"))
  } else {
    messageApi.error(err.message)
  }
}
const closeTree = () => {
  groupStoreIns.hideAdminGroupRoleForm()
}
const renderContent = () => {

}

</script>