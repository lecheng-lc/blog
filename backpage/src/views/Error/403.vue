<template>
  <div>
    <a-result title="403" status="403"   subTitle="Sorry, you are not authorized to access this page.">
    <template #extra>
      <a-button type="primary" @click="goHome">Back Home</a-button>
    </template>
    </a-result>
  </div>
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