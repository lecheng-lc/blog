<template>
	<div v-show="showFooter" className="footer">
		<span>
			2023 © LC-Admin By LC.
		</span>
	</div>
</template>
<script lang="ts" setup>
import { settingsStore } from '@/stores/setting'
import { computed } from 'vue'
const settingsStoreIns = settingsStore()
const showFooter = computed(() => {
	return settingsStoreIns.themeConfig.footer
})
</script>
<style lang="scss" scoped>
.footer {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 30px;
	border-top: 1px solid #e4e7ed;

	a {
		font-size: 14px;
		color: #858585;
		text-decoration: none;
		letter-spacing: 0.5px;
		white-space: nowrap;
	}
}
</style>