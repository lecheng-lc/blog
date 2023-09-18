<template>
  <div class="container">
    <a-layout>
      <!-- 应该是antd的bug，必须得加一个默认theme -->
      <a-layout-sider theme="light" v-model:collapsed="isCollapse" :trigger="null" collapsible>
        <LayoutMenu />
      </a-layout-sider>
      <a-layout>
        <LayoutHeader />
        <LayoutTabs/>
        <a-layout-content>
        <router-view/>
        </a-layout-content>
        <LayoutFooter/>
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue'
import LayoutHeader from './components/Navbar/index.vue'
import LayoutMenu from './components/Sidebar/index.vue'
import LayoutTabs from './components/Tabs/index.vue'
import LayoutFooter from './components/Footer/index.vue'

import { ref, computed,  onMounted} from 'vue'
import { navbarStore } from '@/stores/navbar'
import { singleUserStore } from '@/stores/singleUser'
import { settingsStore } from '@/stores/setting'
import { userStore } from '@/stores/user'
// import ResizeMixin from './mixin/ResizeHandler'
import { initEvent } from '@root/publicMethods/events'
const device = ref('desktop')
const singleUserStoreIns = singleUserStore()
const navbarStoreIns = navbarStore()
const isCollapse = computed(() => {
  return navbarStoreIns.sidebar.opened
})
const settingsStoreIns = settingsStore()
const userStoreIns = userStore()

onMounted(() => {
  singleUserStoreIns.getUserInfo()
})
// @todo http2 消息推送
// onMounted(() => {
//   initEvent(this)
//   if (vueIns?.root.appName == "doracms-egg") {
//       this.$store.dispatch("singleUser/getUserInfo");
//     }
//     this.$root.eventBus.$on("toggleVipLogin", (message) => {
//       this.$store.dispatch("singleUser/showSingleUserForm", {
//         messageInfo: message,
//         formData: {},
//         regFormData: {},
//       });
//     });
//     // 添加消息订阅
//     this.subscribeSocketMessage();
// })
// @todo
// const subscribeSocketMessage = ()=>{
//   this.sockets.subscribe("message", (data) => {
//         let { plugin, msg } = data;
//         if (plugin && msg) {
//           this.$notify({
//             title: "消息",
//             dangerouslyUseHTMLString: true,
//             message: msg,
//           });
//         }
//   });
// }

// export default {
// mixins: [ResizeMixin],
// };
</script>
<style>
.container {
  min-width: 950px;
  height: 100%;
  display: flex;

  .ant-layout-sider {
    box-sizing: border-box;

    .ant-layout-sider-children {
      height: 100%;
    }
  }

  .ant-layout {
    /* 防止 tabs 超出不收缩 */
    overflow-x: hidden;

    .ant-layout-content {
      box-sizing: border-box;
      flex: 1;
      background: #fff;
      margin: 24px 16px;
      padding: 10px 12px;
      overflow-x: hidden;
    }
  }
}
</style>
