
<template>
  <div>
    <i class="iconfont icon-pifu" @click="changeVisible"> </i>
    <a-drawer :visible="visible" title="布局设置" width="320" @close="changeVisible">
      <a-divider class="divider">
        <FireOutlined />
        全局主题
      </a-divider>
      <div className="theme-item">
        <span>暗黑模式</span>
        <SwitchDark />
      </div>
      <div className="theme-item">
        <span>灰色模式</span>
        <a-switch @change="setWeakOrGray($event, 'gray')" :checked='themeConfig.weakOrGray === "gray"' />
      </div>
      <div className="theme-item">
        <span>色弱模式</span>
        <a-switch :checked='themeConfig.weakOrGray === "weak"' @change="setWeakOrGray($event, 'weak')" />
      </div>
      <br />
      <a-divider className="divider">
        <SettingOutlined />
        界面设置
      </a-divider>
      <div className="theme-item">
        <span>折叠菜单</span>
        <a-switch :checked="isCollapse" @change="updateCollapse" />
      </div>
      <div className="theme-item">
					<span>面包屑导航</span>
					<a-switch
						:checked="themeConfig.breadcrumb"
						@change="onChange($event, 'breadcrumb')"
					/>
				</div>
        <div className="theme-item">
					<span>标签栏</span>
					<a-switch
						:checked="themeConfig.tabs"
						@change="onChange($event, 'tabs')"
					/>
				</div>
        <div className="theme-item">
					<span>页脚</span>
					<a-switch
						:checked="themeConfig.footer"
						@change="onChange($event, 'footer')"
					/>
				</div>
    </a-drawer>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed} from 'vue'
import { FireOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { navbarStore } from '@/stores/navbar'
import { settingsStore } from '@/stores/setting'
import SwitchDark from '@/components/SwitchDark.vue'
import { type ThemeConfigProp } from '@root/types/store'
const navbarStoreIns = navbarStore()
const settingStoreIns = settingsStore()
const isCollapse = computed(() => {
  return navbarStoreIns.sidebar.opened
})
let visible = ref(false)
const changeVisible = () => {
  visible.value = !visible.value
}

const updateCollapse = () => {
  navbarStoreIns.TOGGLE_SIDEBAR()
}
const themeConfig = computed(() => {
  return settingStoreIns.themeConfig
})
const onChange = (checked:boolean, type: keyof ThemeConfigProp )=>{
  settingStoreIns.updateThemeConfig({...settingStoreIns.themeConfig, [type]: checked })
}

const setWeakOrGray = (checked: boolean, theme: string) => {
  if (checked) return settingStoreIns.updateThemeConfig({ ...themeConfig.value, weakOrGray: theme })
  settingStoreIns.updateThemeConfig({ ...themeConfig.value, weakOrGray: '' })
}
</script>
<style lang="scss" scoped>
.icon-pifu{
  font-size: 20px;
}
.theme-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 25px 0;
	span {
		font-size: 14px;
	}
	.ant-switch {
		width: 46px;
	}
}
.divider {
	margin: 0 0 22px !important;
	font-size: 15px !important;
	.anticon {
		margin-right: 10px;
	}
}
.ant-divider-with-text::before,
.ant-divider-with-text::after {
	border-top: 1px solid #dcdfe6 !important;
}

</style>