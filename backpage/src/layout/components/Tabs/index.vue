<template>
  <div class="tabs" v-show="showTab">
    <a-tabs
      animated
      @tabClick="clickTabs"
      type="editable-card"
      hide-add
      v-model:activeKey="activeKey"
      @edit="delTabs"
    >
      <a-tab-pane v-for="item in tabs" :key="item.path" :tab="item.name" :closable="item.path !== '/admin/dashbord'"></a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { filter } from 'lodash'
import { userStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import { settingsStore } from '@/stores/setting'
const settingsStoreIns = settingsStore()
const userStoreIns = userStore()
const Router = useRouter()
const Route = useRoute()
const showTab = computed(()=>{
  return settingsStoreIns.themeConfig.tabs
})
const tabs = computed(() => {
  return userStoreIns.tabs
})
const activeKey = computed(() => {
  return userStoreIns.activeTab.path
})
const delTabs = (path: string) => {
	if(path === '/admin/dashbord') return
  if (tabs.value.length == 1) {
    Router.push('/admin/dashbord')
  } else {
    if (Route.path == path) {
      let leftTabs = filter(tabs.value, (item) => {
        return item.path != path
      })
			console.log(leftTabs, '是什么类型的值')
      let nextTabs = leftTabs[leftTabs.length - 1].path
      if (nextTabs?.indexOf('admin/dashbord') > 0) {
        Router.push('/admin/dashbord')
      } else {
				console.log(nextTabs, '看一看')
        Router.push(nextTabs)
      }
    }
  }
  userStoreIns.setTabs({ to: { path: path }, action: 'remove' })
}
const clickTabs = (path: string) => {
  Router.push(path)
}
const onEdit = () => {}
</script>
<style>
.tabs {
  position: relative;
  border-bottom: 1px solid #e4e7ed;

  .ant-tabs {
    padding: 0 90px 0 13px;

    .ant-tabs-nav {
      margin: 0;

      &::before {
        border: none;
      }

      .ant-tabs-ink-bar {
        visibility: visible;
      }

      .ant-tabs-tab-with-remove.ant-tabs-tab-active {
        .ant-tabs-tab-remove {
          top: 1px;
          margin: 7px;
          color: #1890ff !important;
          opacity: 1 !important;
        }

        .ant-tabs-tab-btn {
          transform: translateX(-9px);
        }
      }

      .ant-tabs-tab {
        padding: 8px 22px;
        color: #cccccc;
        background: none;
        border: none;
        transition: none;

        .anticon-home {
          margin-right: 7px;
        }

        .ant-tabs-tab-remove {
          position: absolute;
          right: 0;
          color: #cccccc;
          opacity: 0;
          transition: 0.1s ease-in-out;

          &:hover {
            color: red;
          }
        }
      }

      .ant-tabs-tab.ant-tabs-tab-with-remove {
        &:hover {
          .ant-tabs-tab-remove {
            top: 1px;
            margin: 7px;
            opacity: 1;
            transition: 0.1s ease-in-out;
          }

          .ant-tabs-tab-btn {
            transform: translateX(-9px);
          }
        }
      }
    }
  }

  .more-button {
    position: absolute;
    top: 8px;
    right: 13px;
    padding-left: 10px;
    font-size: 12px;
  }
}

/* tabs 超出显示的样式 */
.ant-tabs-dropdown {
  .ant-tabs-dropdown-menu-item {
    .anticon-home {
      margin-right: 7px;
    }
  }
}

/* tabs 不受全局组件大小影响 */
.ant-tabs-small > .ant-tabs-nav .ant-tabs-tab,
.ant-tabs-large > .ant-tabs-nav .ant-tabs-tab {
  padding: 8px 22px !important;
  font-size: 14px !important;
}
</style>
