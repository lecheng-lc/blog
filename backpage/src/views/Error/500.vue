<template>
    <a-result title="500" status="500"   subTitle="Sorry, something went wrong.">
    <template #extra>
      <a-button type="primary" @click="goHome">Back Home</a-button>
    </template>
    </a-result>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { HOME_URL } from '@/config/config';
const Router = useRouter()
const goHome = () => {
  Router.push(HOME_URL)
}

</script>
<style lang="scss">
.ant-result {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	.ant-result-image {
		margin: 0;
	}
}
</style>