<template>
  <div>
      <a-switch class="dark" @change="onChange" v-model:checked="isDark">
        <template #checkedChildren>🌞</template>
        <template #unCheckedChildren>🌜</template>
      </a-switch>
  </div>
</template>
<script lang="ts" setup>
import { settingsStore } from '@/stores/setting'
import {computed} from 'vue'
const settingStoreIns = settingsStore()
const onChange = (checked: boolean)=> {
  settingStoreIns.updateThemeConfig({...settingStoreIns.themeConfig, isDark: checked})
}
const isDark = computed(()=>{
  return settingStoreIns.themeConfig.isDark
})
</script>

