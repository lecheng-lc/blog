<template>
  <div>
    <a-dropdown class="avatar-container" placement="bottom" arrow :trigger="['click']">
      <i class="iconfont icon-zhongyingwenyingwen-01" @click.prevent>
      </i>
      <template #overlay>
        <a-menu>
          <a-menu-item :disabled="language === 'zh'">
            <span @click="changeLanguage('zh')">
              简体中文
            </span>
          </a-menu-item>
          <a-menu-item :disabled="language === 'en'">
            <span @click="changeLanguage('en')">English</span>
          </a-menu-item>
          <a-menu-item :disabled="language === 'ja'">
            <span>日本語</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { settingsStore } from '@/stores/setting'
import { type LanguageType } from '@root/types/store';
const settingsStoreIns = settingsStore()
const changeLanguage = (type: LanguageType)=>{
  settingsStoreIns.updateLanguage(type)
}
const language = computed(()=>{
  return settingsStoreIns.language
})
</script>
<style lang="scss">
.icon-zhongyingwenyingwen-01{
  font-size: 20px;
}
</style>