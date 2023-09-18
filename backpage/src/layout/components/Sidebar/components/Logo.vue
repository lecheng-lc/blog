<template>
	<div class="logo-box" @click="goHome">
		<img  class="logo-img" src="../../../../assets/imgs/logo.png" alt="">
		<h2 class="logo-text" v-if="!isCollapse">LC Admin</h2>
	</div>
</template>
<script setup lang="ts">
import { navbarStore } from '@/stores/navbar'
import { computed } from 'vue'
import { useRouter } from 'vue-router';
const Router  = useRouter()
const navbarStoreIns = navbarStore()
const isCollapse = computed(()=>{
  return navbarStoreIns.sidebar.opened
})
const goHome = ()=>{
	if(location.pathname === '/admin/dashbord') return
	Router.push('/admin/dashbord')
}
</script>
<style lang="scss">
	.logo-box {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 55px;
		.logo-img {
			width: 30px;
			margin: 0;
		}
		.logo-text {
			margin: 0 0 0 10px;
			font-size: 24px;
			font-weight: bold;
			color: #dadada;
			white-space: nowrap;
		}
	}
</style>