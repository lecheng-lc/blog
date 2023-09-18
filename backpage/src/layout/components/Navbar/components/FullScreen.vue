<template>
  <div @click="handleFullScreen">
    <i class="iconfont icon-quanping" v-show="!fullScreen" />
		<i class="iconfont icon-tuichuquanping" v-show="fullScreen"/>
  </div>
</template>
<script lang="ts" setup>
import screenfull from 'screenfull'
import {ref, onMounted} from 'vue'
import { message } from 'ant-design-vue';
const [messageApi] = message.useMessage();
const fullScreen = ref(screenfull.isFullscreen)
onMounted(()=> {
  screenfull.on("change", () => {
    if (screenfull.isFullscreen) fullScreen.value = true
    else fullScreen.value = false
    return () => screenfull.off("change", () => {});
  });
})
const handleFullScreen = () => {
		if (!screenfull.isEnabled) messageApi.warning("当前您的浏览器不支持全屏 ❌");
		screenfull.toggle()
	};
</script>


<!-- import screenfull from "screenfull";
import { message } from "antd";
import { useEffect, useState } from "react";

const Fullscreen = () => {
	const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen);

	useEffect(() => {
		screenfull.on("change", () => {
			if (screenfull.isFullscreen) setFullScreen(true);
			else setFullScreen(false);
			return () => screenfull.off("change", () => {});
		});
	}, []);

	const handleFullScreen = () => {
		if (!screenfull.isEnabled) message.warning("当前您的浏览器不支持全屏 ❌");
		screenfull.toggle();
	};
	return (
		<i className={["icon-style iconfont", fullScreen ? "icon-suoxiao" : "icon-fangda"].join(" ")} onClick={handleFullScreen}></i>
	);
};
export default Fullscreen; -->
