<template>
	<div>
		<a-dropdown placement="bottom" arrow :trigger="['click']">
			<i class="iconfont icon-gonggepailie" @click.prevent>
			</i>
			<template #overlay>
				<a-menu>
					<a-menu-item :disabled="size === 'middle'">
						<span @click="changeSize('middle')">
							默认
						</span>
					</a-menu-item>
					<a-menu-item :disabled="size === 'large'">
						<span @click="changeSize('large')">大型</span>
					</a-menu-item>
					<a-menu-item :disabled="size === 'small'">
						<span @click="changeSize('small')">小型</span>
					</a-menu-item>
				</a-menu>
			</template>
		</a-dropdown>
	</div>
</template>
<script lang="ts" setup>
import { settingsStore } from '@/stores/setting'
import { type LayoutSize } from '@root/types/store';
import { computed } from 'vue'
const settingsStoreIns = settingsStore()
const changeSize = (type: LayoutSize) => {
	settingsStoreIns.updateLayoutSize(type)
}
const size = computed(() => {
	return settingsStoreIns.layoutSize
})

</script>
<style lang="scss" scoped>
.icon-gonggepailie {
	font-size: 24px;
}
</style>